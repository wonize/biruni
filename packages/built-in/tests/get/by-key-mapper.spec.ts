import { getByKeyMapper, isByKeyMapper, type GetByKeyMapper } from '@/get/by-key-mapper';
import { mockData, type MockData } from '@repo/mocks';

describe('isByKeyMapper', () => {
	it('should be a function', () => {
		expectTypeOf(isByKeyMapper).toBeFunction();
		expect(isByKeyMapper).toBeTypeOf('function');
	});

	it('should accept an <unknown> parameter type', () => {
		expectTypeOf(isByKeyMapper).parameter(0).toBeUnknown();
	});

	it('should return a boolean', () => {
		expectTypeOf(isByKeyMapper).returns.toBeBoolean();
	});

	it('should type-guard <function> values', () => {
		expectTypeOf(isByKeyMapper).guards.toBeFunction();
	});

	it('should return <true> for a valid function mapper', () => {
		const mapper = vi.fn();
		expect(isByKeyMapper(mapper)).toBe(true);
		expect(mapper).toBeCalledTimes(0);
	});

	it('should return <false> for non-function input', () => {
		expect(isByKeyMapper(mockData)).toBe(false);
		expect(isByKeyMapper('hello')).toBe(false);
		expect(isByKeyMapper(null)).toBe(false);
	});
});

describe('GetByKeyMapper (interface)', () => {
	it('should be a function interface', () => {
		expectTypeOf<GetByKeyMapper<MockData>>().toBeFunction();
		expectTypeOf<GetByKeyMapper<MockData>>().toBeObject();
	});

	it('should have the first parameter as <string>', () => {
		expectTypeOf<GetByKeyMapper<MockData>>().parameter(0).toBeString();
	});

	it('should have the second parameter as <function>', () => {
		const callback = expectTypeOf<GetByKeyMapper<MockData>>().parameter(1);
		callback.toBeFunction();
		callback.parameter(0).not.toBeNullable();
		callback.returns.toBeUnknown();
	});

	it('should return a <unknown>', () => {
		expectTypeOf<GetByKeyMapper<MockData>>().returns.toEqualTypeOf<unknown>();
	});
});

describe('getByKeyMapper', () => {
	it('should be a function', () => {
		expectTypeOf(getByKeyMapper<MockData>).toBeFunction();
		expect(getByKeyMapper<MockData>).toBeTypeOf('function');
	});

	it('should require the first parameter to be of type <base> object', () => {
		expectTypeOf(getByKeyMapper<MockData>)
			.parameter(0)
			.toEqualTypeOf<MockData>();
	});

	it('should require the second parameter to be a string <key>', () => {
		expectTypeOf(getByKeyMapper<MockData>)
			.parameter(1)
			.toBeString();
	});

	it('should require the third parameter to be a function <mapper>', () => {
		expectTypeOf(getByKeyMapper<MockData>)
			.parameter(2)
			.toBeFunction();
	});

	it('should return an <unknown> type', () => {
		expectTypeOf(getByKeyMapper<MockData>).returns.toEqualTypeOf<unknown>();
	});

	it('should return the correct value when using a simple <key> and <mapper>', () => {
		const mapper = vi.fn().mockImplementation((value) => value);
		const result = getByKeyMapper(mockData, 'lang', mapper);
		expect(mapper).toBeCalledTimes(1);
		expect(mapper).toBeCalledWith('EN');
		expect(mapper).toReturnWith('EN');
		expect(result).toStrictEqual('EN');
	});

	it('should return the correct value when using a formatted <mapper>', () => {
		const mapper = vi.fn().mockImplementation((value) => `LANG=${value}`);
		const result = getByKeyMapper(mockData, 'lang', mapper);
		expect(mapper).toBeCalledTimes(1);
		expect(mapper).toBeCalledWith('EN');
		expect(mapper).toReturnWith('LANG=EN');
		expect(result).toStrictEqual('LANG=EN');
	});

	it('should return the correct object when mapping nested <key>', () => {
		const mapper = vi.fn().mockImplementation((value) => value);
		const result = getByKeyMapper(mockData, 'currency', mapper);
		expect(mapper).toBeCalledTimes(1);
		expect(mapper).toBeCalledWith({ amount: 1000, code: 'USD' });
		expect(mapper).toReturnWith({ amount: 1000, code: 'USD' });
		expect(result).toMatchObject({ amount: 1000, code: 'USD' });
	});

	it('should return the correct value when mapping deep nested <key>', () => {
		const mapper = vi.fn().mockImplementation((value) => value);
		const result = getByKeyMapper(mockData, 'currency.amount', mapper);
		expect(mapper).toBeCalledTimes(1);
		expect(mapper).toBeCalledWith(1000);
		expect(mapper).toReturnWith(1000);
		expect(result).toStrictEqual(1000);
	});

	it('should return the default value for a non-function <mapper>', () => {
		// @ts-expect-error to test non-function mapper
		expect(getByKeyMapper(mockData, 'lang', 'non-function')).toStrictEqual('EN');
	});

	it('should return the <base> object when the <key> does not exist', () => {
		const mapper = vi.fn().mockImplementation((lang) => lang);
		// @ts-expect-error to test non-exists key in base
		const result = getByKeyMapper(mockData, 'nonexists', mapper);
		expect(mapper).toBeCalledTimes(0);
		expect(result).toStrictEqual(expect.objectContaining(mockData));
	});
});

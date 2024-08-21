import {
	getByEntire,
	isByEntire,
	type GetByEntire,
	type GetByEntireReturnType,
} from '@/get/by-entire';
import { mockData, type MockData } from '@repo/mocks';

describe('isByEntire', () => {
	it('should be a function', () => {
		expectTypeOf(isByEntire).toBeFunction();
		expect(isByEntire).toBeTypeOf('function');
	});

	it('should have the first parameter as <unknown>', () => {
		expectTypeOf(isByEntire).parameter(0).toBeUnknown();
	});

	it('should return a boolean', () => {
		expectTypeOf(isByEntire).returns.toBeBoolean();
	});

	it('should type-guard nullable values', () => {
		expectTypeOf(isByEntire).guards.toBeNullable();
	});

	it('should return <true> for <undefined> and <null>', () => {
		expect(isByEntire(undefined)).toBe(true);
		expect(isByEntire(null)).toBe(true);
	});

	it('should return <false> for a <string> and <mockData>', () => {
		expect(isByEntire('string')).toBe(false);
		expect(isByEntire(mockData)).toBe(false);
	});
});

describe('GetByEntire (interface)', () => {
	it('should be a function', () => {
		expectTypeOf<GetByEntire<MockData>>().toBeFunction();
	});

	it('should have the first parameter as void', () => {
		expectTypeOf<GetByEntire<MockData>>().parameter(0).toBeVoid();
	});

	it('should return an object type', () => {
		expectTypeOf<GetByEntire<MockData>>().returns.toBeObject();
		expectTypeOf<GetByEntireReturnType<MockData>>().toBeObject();
	});

	it('should return a Readonly<MockData>', () => {
		expectTypeOf<GetByEntire<MockData>>().returns.toEqualTypeOf<Readonly<MockData>>();
		expectTypeOf<GetByEntireReturnType<MockData>>().toEqualTypeOf<Readonly<MockData>>();
	});
});

describe('getByEntire', () => {
	it('should be a function', () => {
		expectTypeOf(getByEntire<MockData>).toBeFunction();
		expect(getByEntire<MockData>).toBeTypeOf('function');
	});

	it('should required a first parameter of type <MockData>', () => {
		expectTypeOf(getByEntire<MockData>).parameters.toEqualTypeOf<[base: MockData]>();
	});

	it('should return a <Readonly<MockData>>', () => {
		expectTypeOf(getByEntire<MockData>).returns.toEqualTypeOf<Readonly<MockData>>();
	});

	it('should return a cloned object when a valid <base> object is provided', () => {
		const result = getByEntire(mockData);
		expect(result).toMatchObject(mockData);
		expect(result, 'the <reference> not to be same').not.toBe(mockData);
		expect(JSON.stringify(result)).toHaveLength(JSON.stringify(mockData).length);
	});

	it('should return an empty object when an empty <base> object is provided', () => {
		const result = getByEntire({});
		expect(result).toMatchObject({});
		expect(result, 'the <reference> not to be same').not.toBe({});
		expect(JSON.stringify(result)).toHaveLength(2); // Length of "{}"
	});

	it('should return an empty object when a non-object argument is provided', () => {
		// @ts-expect-error to test non-object argument
		const result = getByEntire('hello world');
		expect(result).toMatchObject({});
		expect(JSON.stringify(result)).toHaveLength(2); // Length of "{}"
	});

	it('should return an empty object when <null> is provided', () => {
		// @ts-expect-error to test null argument
		const result = getByEntire(null);
		expect(result).toMatchObject({});
		expect(JSON.stringify(result)).toHaveLength(2); // Length of "{}"
	});

	it('should return an empty object when <undefined> is provided', () => {
		// @ts-expect-error to test undefined argument
		const result = getByEntire(undefined);
		expect(result).toMatchObject({});
		expect(JSON.stringify(result)).toHaveLength(2); // Length of "{}"
	});

	it('should return a cloned array when a valid array is provided', () => {
		const baseArray = [1, 2, 3];
		const result = getByEntire(baseArray);
		expect(result).toMatchObject(baseArray);
		expect(result, 'the <reference> not to be same').not.toBe(baseArray); // Ensure it's a clone
		expect(JSON.stringify(result)).toHaveLength(JSON.stringify(baseArray).length);
	});

	it('should return an empty object when an empty array is provided', () => {
		const result = getByEntire([]);
		expect(result).toMatchObject({});
		expect(JSON.stringify(result)).toHaveLength(2); // Length of "{}"
	});
});

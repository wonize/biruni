import has, { HasAccessor, hasOwn, hasOwnPropertyPath } from '@/has/mod.ts';
import type { Path } from '@/path/mod.ts';
import Core, { Plugin } from '@biruni/core';
import { MOCK_NAMESPACE, type MockData, mockData } from '@repo/mocks';

describe('hasOwnPropertyPath', () => {
	it('should be a function', () => {
		expectTypeOf(hasOwnPropertyPath<MockData>).toBeFunction();
		expect(hasOwnPropertyPath<MockData>).toBeTypeOf('function');
	});

	it('should be have the first arguement as a <base> object type', () => {
		expectTypeOf(hasOwnPropertyPath<MockData>)
			.parameter(0)
			.toEqualTypeOf<MockData>();
	});

	it('should be have the second argument as a <path> string type', () => {
		expectTypeOf(hasOwnPropertyPath<MockData>)
			.parameter(1)
			.toEqualTypeOf<Path.From<MockData>>();
	});

	it('should return a <boolean> or <never>', () => {
		expectTypeOf(hasOwnPropertyPath<MockData>).returns.toEqualTypeOf<boolean | never>();
	});

	it('should return <true> if no-deep <path> exists in <base> object', () => {
		expect(hasOwnPropertyPath(mockData, 'lang')).toBe(true);
	});

	it('should return <true> if nested-deep <path> exists in <base> object', () => {
		expect(hasOwnPropertyPath(mockData, 'currency.amount')).toBe(true);
	});

	it('should return <false> if <path> is non-exists in <base> object', () => {
		// @ts-expect-error the <hello> not exists in <mockData>
		expect(hasOwnPropertyPath(mockData, 'hello')).toBe(false);
	});

	it('should throw <BaseTypeError> when <base> is not an <object>', () => {
		// @ts-expect-error to test non-object base
		expect(() => hasOwnPropertyPath('non-object', 'key')).toThrowError();
	});
});

describe('hasOwn (and <has>)', () => {
	it('should be a <function>', () => {
		expectTypeOf(hasOwn).toBeFunction();
		expect(hasOwn).toBeTypeOf('function');
	});

	it('should have no argument', () => {
		expectTypeOf(hasOwn).parameters.toEqualTypeOf<[]>();
	});

	it('should return an instance match to <Plugin> interface', () => {
		expectTypeOf(hasOwn<MockData>).returns.toMatchTypeOf<Plugin<MockData>>();
		expect(hasOwn<MockData>()).toBeInstanceOf(Plugin<MockData>);
	});

	it('should return an instance match to <HasAccessor> class', () => {
		expectTypeOf(hasOwn<MockData>).returns.toMatchTypeOf<HasAccessor<MockData>>();
		expect(hasOwn<MockData>()).toBeInstanceOf(HasAccessor<MockData>);
	});

	it('should alaised to <has>', () => {
		expectTypeOf(hasOwn<MockData>).toEqualTypeOf<typeof has<MockData>>();
		assert.deepStrictEqual(hasOwn<MockData>, has<MockData>);
	});
});

describe('HasAccessor', () => {
	it('should be a constructor for HasAccessor', () => {
		expect(HasAccessor<MockData>).constructor();
	});

	it('should have no constructor arguments', () => {
		expectTypeOf(HasAccessor<MockData>).constructorParameters.toEqualTypeOf<[]>();
	});

	it('should create an instance of Plugin<MockData>', () => {
		expectTypeOf(HasAccessor<MockData>).instance.toMatchTypeOf<Plugin<MockData>>();
	});

	it('should bind the <has> method to the core instance <boundary>', () => {
		const core = new Core<MockData>(MOCK_NAMESPACE);
		const instance = new HasAccessor<MockData>();
		const boundSpy = vi.spyOn(core, 'bound');
		instance.setup(core);
		expect(boundSpy).toHaveBeenCalledWith('has', expect.any(Function));
	});

	it('should bind the <has> method to <store> instance', () => {
		const core = new Core<MockData>(MOCK_NAMESPACE);
		const instance = new HasAccessor<MockData>();
		instance.setup(core);
		const store: any = core.init(vi.fn().mockReturnValue(mockData));
		expect(store).toHaveProperty('has');
	});

	it('should return <true> when checking for existing keys in the <store>', () => {
		const core = new Core<MockData>(MOCK_NAMESPACE);
		const instance = new HasAccessor<MockData>();
		instance.setup(core);
		const store: any = core.init(vi.fn().mockReturnValue(mockData));
		expect(store.has('theme')).toBe(true);
	});
});

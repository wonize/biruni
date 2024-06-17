import type { StoreInterface } from '@/store.ts';
import { mockData, mockStore, type MockData } from '@repo/mocks';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

describe.todo('Biruni Getter Methods', () => {
	describe('Verify <mockStore>', () => {
		it('should match the type of StoreInterface<MockData>', async () => {
			expectTypeOf(mockStore).toMatchTypeOf<StoreInterface<MockData>>();
		});
	});

	describe('Method <ByEntire>', () => {
		const spy_getByEntire = vi.spyOn(mockStore, 'getByEntire');

		it('should have the <getByEntire> method and be a function', async () => {
			expect(mockStore).toHaveProperty('getByEntire');
			expect(mockStore.getByEntire).toBeTypeOf('function');
			expectTypeOf(mockStore.getByEntire).toBeFunction();
			expectTypeOf(mockStore.getByEntire).parameter(0).toBeNullable();
		});

		it('should return the correct data and call the method with the expected arguments', async () => {
			const result = await mockStore.getByEntire();
			expect(result).toBeTypeOf('object');
			expectTypeOf(result).toMatchTypeOf<MockData>();
			expect(result).toMatchObject(mockData);
			expect(result).toHaveProperty('lang');
			expectTypeOf(result).toHaveProperty('lang');
			expect(result.lang).toMatch(/FR|EN|ES/);
			expect(spy_getByEntire).toHaveBeenCalled();
			expect(spy_getByEntire).toHaveBeenCalledWith();
			expect(spy_getByEntire).toHaveReturned();
			expect(spy_getByEntire).toHaveReturnedWith(mockData);
		});
	});

	describe('Method <ByKey>', () => {
		const spy_getByKey = vi.spyOn(mockStore, 'getByKey');

		describe('Validation of <getByKey> Method', () => {
			it('should have the <getByKey> method and be a function', async () => {
				expect(mockStore).toHaveProperty('getByKey');
				expect(mockStore.getByKey).toBeTypeOf('function');
				expectTypeOf(mockStore.getByKey).toBeFunction();
				expectTypeOf(mockStore.getByKey).parameter(0).toBeString();
				expectTypeOf(mockStore.getByKey).parameter(0).toMatchTypeOf<keyof MockData>();
			});
		});

		describe('Testing getByKey Method for "lang" key', () => {
			const key = 'lang' as const;
			type Key = typeof key;

			it('should return the correct string value for "lang"', async () => {
				const result = await mockStore.getByKey(key);
				expect(result).toBeTypeOf('string');
				expectTypeOf(result).toMatchTypeOf<MockData[Key]>();
				expect(result).toMatch(/FR|EN|ES/);
				expect(result).toStrictEqual(mockData[key]);
				expect(spy_getByKey).toHaveBeenCalledWith(key);
				expect(spy_getByKey).toHaveReturnedWith(mockData[key]);
			});
		});

		describe('Testing getByKey Method for "currency" key', () => {
			const key = 'currency' as const;
			type Key = typeof key;

			it('should return the correct object value for "currency"', async () => {
				const result = await mockStore.getByKey(key);
				expect(result).toBeTypeOf('object');
				expectTypeOf(result).toMatchTypeOf<MockData[Key]>();
				expect(result).toMatchObject(mockData[key]);
				expect(result['code']).toStrictEqual(mockData[key]['code']);
				expect(spy_getByKey).toHaveBeenCalledWith(key);
				expect(spy_getByKey).toHaveReturnedWith(mockData[key]);
			});
		});
	});

	describe('Method <ByKeyMapper>', () => {
		const spy_getByKeyMapper = vi.spyOn(mockStore, 'getByKeyMapper');

		it('should have the <getByKeyMapper> method and be a function', async () => {
			expect(mockStore).toHaveProperty('getByKeyMapper');
			expect(mockStore.getByKeyMapper).toBeTypeOf('function');
			expectTypeOf(mockStore.getByKeyMapper).toBeFunction();
			expectTypeOf(mockStore.getByKeyMapper).parameter(0).toBeString();
			expectTypeOf(mockStore.getByKeyMapper).parameter(0).toMatchTypeOf<keyof MockData>();
			expectTypeOf(mockStore.getByKeyMapper).parameter(1).toBeFunction();
			expectTypeOf(mockStore.getByKeyMapper).parameter(1).toMatchTypeOf<MapperType>();
			type MapperType = (value: MockData[keyof MockData]) => unknown;
		});

		it('should return a string for "lang" mapping', async () => {
			const key = 'lang' as const;
			type Key = typeof key;

			const mapper = vi.fn((lang: MockData[Key]) => lang);
			const result = await mockStore.getByKeyMapper(key, mapper);
			expect(result).toBeTypeOf('string');

			// FIXME: find better type than unknown
			// @ts-expect-error should not be unknown
			expectTypeOf(result).toMatchTypeOf<MockData[Key]>();

			expect(result).toMatch(/FR|EN|ES/);
			expect(result).toStrictEqual(mockData[key]);
			expect(spy_getByKeyMapper).toHaveBeenCalledWith(key, mapper);
			expect(spy_getByKeyMapper).toHaveReturnedWith(mockData[key]);
			expect(mapper).toHaveBeenCalledWith(mockData[key]);
			expect(mapper).toHaveReturnedWith(mockData[key]);
		});

		it('should return an object for "currency" mapping', async () => {
			const mapper = vi.fn((currency: MockData['currency']) => currency);
			const result = await mockStore.getByKeyMapper('currency', mapper);
			expect(result).toBeTypeOf('object');
			expect(result).toMatchObject(mockData['currency']);

			// FIXME: replace unknown with better type annoncement
			// @ts-expect-error should not be unknown
			expectTypeOf(result).toMatchTypeOf<MockData['currency']>();
			// @ts-expect-error should not be unknown
			expect(result['amount']).toStrictEqual(mockData['currency']['amount']);

			expect(spy_getByKeyMapper).toHaveBeenCalledWith('currency', mapper);
			expect(spy_getByKeyMapper).toHaveReturnedWith(mockData['currency']);
			expect(mapper).toHaveBeenCalledWith(mockData['currency']);
			expect(mapper).toHaveReturnedWith(mockData['currency']);
		});

		it('should return a boolean for "currency" amount check', async () => {
			const mapper = vi.fn((currency: MockData['currency']) =>
				currency.amount > 500 ? true : false
			);
			const result = await mockStore.getByKeyMapper('currency', mapper);
			expect(result).toBeTypeOf('boolean');
			expect(result).toStrictEqual(mockData['currency']['amount'] > 500);
			expect(spy_getByKeyMapper).toHaveBeenCalledWith('currency', mapper);
			expect(spy_getByKeyMapper).toHaveReturnedWith(mockData['currency']['amount'] > 500);
			expect(mapper).toHaveBeenCalledWith(mockData['currency']);
			expect(mapper).toHaveReturnedWith(mockData['currency']['amount'] > 500);
		});
	});

	describe('Method <ByMapper>', () => {
		const spy_getByMapper = vi.spyOn(mockStore, 'getByMapper');

		it('should have the <getByMapper> method and be a function', async () => {
			expect(mockStore).toHaveProperty('getByMapper');
			expect(mockStore.getByMapper).toBeTypeOf('function');
			expectTypeOf(mockStore.getByMapper).toBeFunction();
			expectTypeOf(mockStore.getByMapper).parameter(0).toBeFunction();
			expectTypeOf(mockStore.getByMapper).parameter(0).toMatchTypeOf<MapperType>();
			type MapperType = (value: MockData) => unknown;
		});

		it('should return a string for "lang" mapping', async () => {
			const mapper = vi.fn((data: MockData) => data.lang);
			const result = await mockStore.getByMapper(mapper);
			expect(result).toBeTypeOf('string');

			// FIXME: find better type than unknown
			// @ts-expect-error should not be unknown
			expectTypeOf(result).toMatchTypeOf<MockData['lang']>();

			expect(result).toMatch(/FR|EN|ES/);
			expect(result).toStrictEqual(mockData['lang']);
			expect(spy_getByMapper).toHaveBeenCalledWith(mapper);
			expect(spy_getByMapper).toHaveReturnedWith(mockData['lang']);
			expect(mapper).toHaveBeenCalledWith(mockData);
			expect(mapper).toHaveReturnedWith(mockData['lang']);
		});

		it('should return a formatted string for "currency" mapping', async () => {
			const mapper = vi.fn(
				(data: MockData) => `${data.currency.amount} ${data.currency.code}`
			);
			const result = await mockStore.getByMapper(mapper);
			expect(result).toBeTypeOf('string');

			// FIXME: find better type than unknown
			expectTypeOf(
				result
				// @ts-expect-error should not be unknown
			).toMatchTypeOf<`${MockData['currency']['amount']} ${MockData['currency']['code']}`>();

			expect(result).toStrictEqual(
				`${mockData['currency']['amount']} ${mockData['currency']['code']}`
			);
			expect(spy_getByMapper).toHaveBeenCalledWith(mapper);
			expect(spy_getByMapper).toHaveReturnedWith(
				`${mockData['currency']['amount']} ${mockData['currency']['code']}`
			);
			expect(mapper).toHaveBeenCalledWith(mockData);
			expect(mapper).toHaveReturnedWith(
				`${mockData['currency']['amount']} ${mockData['currency']['code']}`
			);
		});
	});

	describe('Method <ByKeys>', () => {
		const spy_getByKeys = vi.spyOn(mockStore, 'getByKeys');

		it('should have the <getByKeys> method and be a function', async () => {
			expect(mockStore).toHaveProperty('getByKeys');
			expect(mockStore.getByKeys).toBeTypeOf('function');
			expectTypeOf(mockStore.getByKeys).toBeFunction();
			expectTypeOf(mockStore.getByKeys).parameter(0).toBeArray();
			expectTypeOf(mockStore.getByKeys).parameter(0).toMatchTypeOf<KeysType>();
			type KeysType = Partial<readonly (keyof MockData)[]>;
		});

		it('should return an object with "lang" key when provided with ["lang"]', async () => {
			const result = await mockStore.getByKeys(['lang']);
			expect(result).toBeTypeOf('object');
			expectTypeOf(result).toMatchTypeOf<{ lang: MockData['lang'] }>();
			expect(result).toMatchObject({ lang: mockData['lang'] });
			expect(result.lang).toBeTypeOf('string');
			expect(result.lang).toMatch(/FR|EN|ES/);
			expect(result.lang).toStrictEqual(mockData['lang']);
			expect(spy_getByKeys).toHaveBeenCalledWith(['lang']);
			expect(spy_getByKeys).toHaveReturnedWith({ lang: mockData['lang'] });
		});

		it('should return an object with "lang" and "currency" keys when provided with ["lang", "currency"]', async () => {
			const result = await mockStore.getByKeys(['lang', 'currency']);
			expect(result).toBeTypeOf('object');
			expectTypeOf(result).toEqualTypeOf<
				Readonly<{
					lang: MockData['lang'];
					currency: MockData['currency'];
				}>
			>();
			expect(result).toMatchObject({
				lang: mockData['lang'],
				currency: mockData['currency'],
			});
			expect(result.lang).toBeTypeOf('string');
			expectTypeOf(result.lang).toMatchTypeOf<MockData['lang']>();
			expect(result.lang).toMatch(/FR|EN|ES/);
			expect(result.lang).toStrictEqual(mockData['lang']);
			expect(result.currency).toBeTypeOf('object');
			expect(result.currency).toMatchObject(mockData['currency']);
			expect(spy_getByKeys).toHaveBeenCalledWith(['lang', 'currency']);
			expect(spy_getByKeys).toHaveReturnedWith({
				lang: mockData['lang'],
				currency: mockData['currency'],
			});
		});
	});

	describe('Method <ByTruthy>', () => {
		const spy_getByTruthy = vi.spyOn(mockStore, 'getByTruthy');

		it('should have the <getByTruthy> method and be a function', async () => {
			expect(mockStore).toHaveProperty('getByTruthy');
			expect(mockStore.getByTruthy).toBeTypeOf('function');
			expectTypeOf(mockStore.getByTruthy).toBeFunction();
			expectTypeOf(mockStore.getByTruthy).parameter(0).toBeObject();
			expectTypeOf(mockStore.getByTruthy).parameter(0).toMatchTypeOf<KeysType>();
			type KeysType = Partial<Record<keyof MockData, boolean>>;
		});

		it('should return an object with truthy lang key', async () => {
			const result = await mockStore.getByTruthy({ lang: true });
			expect(result).toBeTypeOf('object');
			expectTypeOf(result).toEqualTypeOf<Readonly<{ lang: MockData['lang'] }>>();
			expect(result).toMatchObject({ lang: mockData['lang'] });
			expect(result.lang).toBeTypeOf('string');
			expect(result.lang).toMatch(/FR|EN|ES/);
			expect(result.lang).toStrictEqual(mockData['lang']);
			expect(spy_getByTruthy).toHaveBeenCalledWith({ lang: true });
			expect(spy_getByTruthy).toHaveReturnedWith({ lang: mockData['lang'] });
		});

		it('should return an object with truthy lang and falsy currency keys', async () => {
			const result = await mockStore.getByTruthy({ lang: true, currency: false });
			expect(result).toBeTypeOf('object');
			expectTypeOf(result).toEqualTypeOf<Readonly<{ lang: MockData['lang'] }>>();
			expect(result).toMatchObject({ lang: mockData['lang'] });
			expect(result.lang).toBeTypeOf('string');
			expect(result.lang).toMatch(/FR|EN|ES/);
			expect(result.lang).toStrictEqual(mockData['lang']);
			expect(spy_getByTruthy).toHaveBeenCalledWith({ lang: true, currency: false });
			expect(spy_getByTruthy).toHaveReturnedWith({ lang: mockData['lang'] });
		});

		it('should return an object with truthy lang and currency keys', async () => {
			const result = await mockStore.getByTruthy({ lang: true, currency: true });
			expect(result).toBeTypeOf('object');
			expectTypeOf(result).toEqualTypeOf<
				Readonly<{
					lang: MockData['lang'];
					currency: MockData['currency'];
				}>
			>();
			expect(result).toMatchObject({
				lang: mockData['lang'],
				currency: mockData['currency'],
			});
			expect(result.lang).toBeTypeOf('string');
			expectTypeOf(result.lang).toMatchTypeOf<MockData['lang']>();
			expect(result.lang).toMatch(/FR|EN|ES/);
			expect(result.lang).toStrictEqual(mockData['lang']);
			expect(result.currency).toBeTypeOf('object');
			expect(result.currency).toMatchObject(mockData['currency']);
			expect(spy_getByTruthy).toHaveBeenCalledWith({ lang: true, currency: true });
			expect(spy_getByTruthy).toHaveReturnedWith({
				lang: mockData['lang'],
				currency: mockData['currency'],
			});
		});

		it('should return an empty object when no keys are provided', async () => {
			const result = await mockStore.getByTruthy({});
			expect(result).toBeTypeOf('object');
			expectTypeOf(result).toMatchTypeOf<Readonly<object>>();
			expect(result).toMatchObject({});
			expect(spy_getByTruthy).toHaveBeenCalledWith({});
			expect(spy_getByTruthy).toHaveReturnedWith({});
		});

		it('should return an empty object when all keys are falsy', async () => {
			const result = await mockStore.getByTruthy({
				currency: false,
				lang: false,
				theme: false,
				value: false,
			});
			expect(result).toBeTypeOf('object');
			expectTypeOf(result).toMatchTypeOf<Readonly<object>>();
			expect(result).toMatchObject({});
			expect(spy_getByTruthy).toHaveBeenCalledWith({});
			expect(spy_getByTruthy).toHaveReturnedWith({});
		});

		it('should return an empty object when a wrong key is provided', async () => {
			// @ts-expect-error the wrong key for edge cases
			const result = await mockStore.getByTruthy({ 'wrong-non-exists-key': true });
			expect(result).toBeTypeOf('object');
			expectTypeOf(result).toMatchTypeOf<Readonly<object>>();
			expect(result).toMatchObject({});
			expect(spy_getByTruthy).toHaveBeenCalledWith({});
			expect(spy_getByTruthy).toHaveReturnedWith({});
		});
	});
});

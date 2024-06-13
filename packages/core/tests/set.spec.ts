import type { StoreInterface } from '@/store.ts';
import type { Path } from '@/path/mod.ts';
import {
	MOCK_NAMESPACE,
	mockData,
	mockInMemoryStorage,
	mockStore,
	spyInMemoryStorage,
	type MockData,
} from '@repo/mocks';
import { beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

function cleanup() {
	return function cleanup_impl() {
		// for (const spy of spies) {
		// 	spy.mockReset();
		// 	spy.mockClear();
		// }
		vi.clearAllMocks();
		mockInMemoryStorage.set(MOCK_NAMESPACE, mockData);
	};
}

describe('Biruni Setter Methods', () => {
	describe('Verify <mockStore>', () => {
		it('should match the type of StoreInterface<MockData>', async () => {
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).not.toBeUndefined();
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(mockData);
			expectTypeOf(mockStore).toMatchTypeOf<StoreInterface<MockData>>();
		});
	});

	describe('Method <ByPair>', () => {
		const spy_setByPair = vi.spyOn(mockStore, 'setByPair');

		beforeEach(cleanup());

		it('should have the <setByPair> method and be a function', async () => {
			expect(mockStore).toHaveProperty('setByPair');
			expect(mockStore.setByPair).toBeTypeOf('function');
			expectTypeOf(mockStore.setByPair).toBeFunction();
			expectTypeOf(mockStore.setByPair).parameter(0).toBeObject();
			expectTypeOf(mockStore.setByPair).parameter(0).toEqualTypeOf<Partial<MockData>>();
		});

		it('should update mockStore with single key changes', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			const expected = { ...mockData, ...changes };
			await mockStore.setByPair(changes);
			expect(spy_setByPair).toBeCalledWith(expect.objectContaining(changes));
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
			expect(spyInMemoryStorage).toBeCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
		});

		it('should update mockStore with nested key changes', async () => {
			// @ts-expect-error to test, nested keys
			const changes: Partial<MockData> = { currency: { amount: 5000 } };
			const expected = {
				...mockData,
				currency: {
					...mockData['currency'],
					...changes['currency'],
				},
			};
			await mockStore.setByPair(changes);
			expect(spy_setByPair).toBeCalledWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should not update mockStore with empty changes', async () => {
			const changes: Partial<MockData> = {};
			const expected = { ...mockData };
			await mockStore.setByPair(changes);
			expect(spy_setByPair).toBeCalledWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should not update mockStore with empty arguments', async () => {
			const expected = { ...mockData };
			// @ts-expect-error to test, empty arguments
			await mockStore.setByPair();
			expect(spy_setByPair).toBeCalledWith();
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle non-existent key "nonexists: added"', async () => {
			// @ts-expect-error to test non-exists keys
			const changes: Partial<MockData> = { nonexists: 'added' };
			const expected = { ...mockData, ...changes };
			await mockStore.setByPair(changes);
			expect(spy_setByPair).toBeCalledWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});
	});

	describe.todo('Method <BySetter>', () => {
		type SetterType = (data: Readonly<MockData>) => Partial<MockData>;
		const spy_setBySetter = vi.spyOn(mockStore, 'setBySetter');

		beforeEach(cleanup());

		it('should have the <setBySetter> method and be a function', async () => {
			expect(mockStore).toHaveProperty('setBySetter');
			expect(mockStore.setBySetter).toBeTypeOf('function');
			expectTypeOf(mockStore.setBySetter).toBeFunction();
			expectTypeOf(mockStore.setBySetter).parameter(0).toBeFunction();
			expectTypeOf(mockStore.setBySetter).parameter(0).toEqualTypeOf<SetterType>();
		});

		it('should update data with changes to "lang: FR"', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_data) => changes);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toHaveBeenLastCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data with nested key "currency: { amount: 5000 }"', async () => {
			// @ts-expect-error to test, nested keys
			const changes: Partial<MockData> = { currency: { amount: 5000 } };
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_data) => changes);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toHaveBeenLastCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data with no changes', async () => {
			const changes: Partial<MockData> = {};
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_data) => changes);
			const expected = { ...mockData };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toHaveBeenLastCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data with empty setter', async () => {
			// @ts-expect-error to test empty setter
			// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
			const setter: SetterType = vi.fn((_data) => { });
			const expected = { ...mockData };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toHaveBeenLastCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(void 0);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle non-existent key "nonexists: added"', async () => {
			// @ts-expect-error to test non-exists keys
			const changes: Partial<MockData> = { nonexists: 'added' };
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_data) => changes);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toHaveBeenLastCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle async wrapped setter', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			// @ts-expect-error to test async wrapped setter
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn(async (_data) => changes);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toHaveBeenLastCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle promise.resolve wrapped return data from setter', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			// @ts-expect-error to test promise.resolve wrapped setter
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_data) => Promise.resolve(changes));
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toHaveBeenLastCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle promise.resolve wrapped setter itself', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			// @ts-expect-error to test promise.resolve wrapped setter
			const setter: SetterType = vi.fn(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				(_data) => new Promise((resolve, _reject) => resolve(changes))
			);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toHaveBeenLastCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle promise.reject wrapped setter', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			// @ts-expect-error to test promise.reject wrapped setter
			const setter: SetterType = vi.fn(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				(_data) => new Promise((_resolve, reject) => reject(changes))
			);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toHaveBeenLastCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data using an anonymous setter function statement', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			const setter: SetterType = vi.fn(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				function (_data) {
					return changes;
				}
			);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toHaveBeenLastCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data using a named setter function statement', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			const setter: SetterType = vi.fn(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				function named_setter(_data) {
					return changes;
				}
			);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toHaveBeenLastCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});
	});

	describe.todo('Method <ByKeySetter>', () => {
		type SetterType<K extends Path.From<MockData> = Path.From<MockData>> = (value: Readonly<Path.At<MockData, K>>) => Path.At<MockData, K>;
		const spy_setByKeySetter = vi.spyOn(mockStore, 'setByKeySetter');

		beforeEach(cleanup());

		it('should have the <setByKeySetter> method and be a function', async () => {
			expect(mockStore).toHaveProperty('setByKeySetter');
			expect(mockStore.setByKeySetter).toBeTypeOf('function');
			expectTypeOf(mockStore.setByKeySetter).toBeFunction();
			expectTypeOf(mockStore.setByKeySetter).parameter(0).toBeString();
			expectTypeOf(mockStore.setByKeySetter).parameter(0).toEqualTypeOf<Path.From<MockData>>();
			expectTypeOf(mockStore.setByKeySetter).parameter(1).toBeFunction();
			expectTypeOf(mockStore.setByKeySetter).parameter(1).toEqualTypeOf<SetterType>();
		});

		it('should set data to a single key', async () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType<'lang'> = vi.fn((_lang) => 'FR');
			const expected = { ...mockData, lang: 'FR' };
			await mockStore.setByKeySetter('lang', setter);
			expect(spy_setByKeySetter).toBeCalledWith('lang', setter);
			expect(setter).toHaveBeenLastCalledWith(mockData['lang']);
			expect(setter).toHaveReturnedWith('FR');
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data to a nested key', async () => {
			// @ts-expect-error to test nested keys
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType<'currency'> = vi.fn((_currency) => ({ amount: 5000 }));
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			await mockStore.setByKeySetter('currency', setter);
			expect(spy_setByKeySetter).toBeCalledWith('currency', setter);
			expect(setter).toHaveBeenLastCalledWith(mockData['currency']);
			expect(setter).toHaveReturnedWith({ amount: 5000 });
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data to a path key', async () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_currency_amount) => 5000);
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			// @ts-expect-error to test path keys
			await mockStore.setByKeySetter('currency.amount', setter);
			expect(spy_setByKeySetter).toBeCalledWith('currency.amount', setter);
			expect(setter).toHaveBeenLastCalledWith(mockData['currency']['amount']);
			expect(setter).toHaveReturnedWith(5000);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle untyped value when update data', async () => {
			// @ts-expect-error to test untyped value
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType<'lang'> = vi.fn((_lang) => 'RU');
			const expected = { ...mockData, lang: 'RU' };
			await mockStore.setByKeySetter('lang', setter);
			expect(spy_setByKeySetter).toBeCalledWith('lang', setter);
			expect(setter).toHaveBeenLastCalledWith(mockData['lang']);
			expect(setter).toHaveReturnedWith('RU');
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle empty setter when update data', async () => {
			// @ts-expect-error to test empty setter
			// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
			const setter: SetterType<'lang'> = vi.fn((_lang) => { });
			const expected = { ...mockData };
			await mockStore.setByKeySetter('lang', setter);
			expect(spy_setByKeySetter).toBeCalledWith('lang', setter);
			expect(setter).toHaveBeenLastCalledWith(mockData['lang']);
			expect(setter).toHaveReturnedWith(void 0);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle non-existent key when update data', async () => {
			// @ts-expect-error to test non-exists keys
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_nonexists) => 'added');
			const expected = { ...mockData };
			// @ts-expect-error to test non-exists keys
			await mockStore.setByKeySetter('nonexists', setter);
			expect(spy_setByKeySetter).toBeCalledWith('nonexists', setter);
			expect(setter).toHaveBeenLastCalledWith(void 0);
			expect(setter).toHaveReturnedWith('added');
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle non-related key/value pair when update data', async () => {
			// @ts-expect-error to test non-related key/value pair
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType<'currency'> = vi.fn((_currency) => 'FR');
			const expected = { ...mockData };
			await mockStore.setByKeySetter('currency', setter);
			expect(spy_setByKeySetter).toBeCalledWith('currency', setter);
			expect(setter).toHaveBeenLastCalledWith(mockData['currency']);
			expect(setter).toHaveReturnedWith('FR');
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});
	});

	describe.todo('Method <ByKeyValue>', () => {
		type ValueType<K extends Path.From<MockData> = Path.From<MockData>> = Path.At<MockData, K>;
		const spy_setByKeyValue = vi.spyOn(mockStore, 'setByKeyValue');

		beforeEach(cleanup());

		it('should have the <setByKeyValue> method and be a function', async () => {
			expect(mockStore).toHaveProperty('setByKeyValue');
			expect(mockStore.setByKeyValue).toBeTypeOf('function');
			expectTypeOf(mockStore.setByKeyValue).toBeFunction();
			expectTypeOf(mockStore.setByKeyValue).parameter(0).toBeString();
			expectTypeOf(mockStore.setByKeyValue).parameter(0).toEqualTypeOf<Path.From<MockData>>();
			expectTypeOf(mockStore.setByKeyValue).parameter(1).not.toBeNullable();
			expectTypeOf(mockStore.setByKeyValue).parameter(1).toEqualTypeOf<ValueType>();
		});

		it('should accept a string key and a non-nullable value', async () => {
			const changes: ValueType<'lang'> = 'FR';
			const expected = { ...mockData, lang: changes };
			await mockStore.setByKeyValue('lang', changes);
			expect(spy_setByKeyValue).toBeCalledWith('lang', changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should accept a nested key and a value with the correct type', async () => {
			// @ts-expect-error to test nested key
			const changes: ValueType<'currency'> = { amount: 5000 };
			const expected = { ...mockData, currency: { ...mockData['currency'], ...changes } };
			await mockStore.setByKeyValue('currency', changes);
			expect(spy_setByKeyValue).toBeCalledWith('currency', changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should accept a path key and a value with the correct type', async () => {
			const changes: ValueType<'currency.amount'> = 5000;
			const expected = {
				...mockData,
				currency: {
					...mockData['currency'],
					amount: changes,
				},
			};
			await mockStore.setByKeyValue('currency.amount', changes);
			expect(spy_setByKeyValue).toBeCalledWith('currency.amount', changes);
			expect(spyInMemoryStorage).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should throw an error when setting a value with a non-string key', async () => {
			// @ts-expect-error to test non-string key
			expect(mockStore.setByKeyValue(123, 'value')).toThrowError();
			// @ts-expect-error to test non-string key
			expect(mockStore.setByKeyValue({}, 'value')).toThrowError();
		});

		it('should throw an error when setting a value with a non-exists key', async () => {
			// @ts-expect-error to test non-exists key
			expect(mockStore.setByKeyValue('non-exists', 'value')).toThrowError();
		});
	});
});

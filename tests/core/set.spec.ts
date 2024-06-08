import type { StoreInterface } from '@biruni/core';
import {
	MOCK_NAMESPACE,
	mockData,
	mockInMemoryStorage,
	mockStore,
	type MockData,
} from '@repo/mocks';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

// FIXME: clear persisted data for each `it` block test case

describe('Biruni Setter Methods', () => {
	describe('Verify <mockStore>', () => {
		it('should match the type of StoreInterface<MockData>', async () => {
			expectTypeOf(mockStore).toMatchTypeOf<StoreInterface<MockData>>();
		});
	});

	describe('Method <ByPair>', () => {
		const spy_setByPair = vi.spyOn(mockStore, 'setByPair');
		const spy_storageSet = vi.spyOn(mockInMemoryStorage, 'set');

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
			expect(spy_setByPair).toHaveBeenCalledWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should update mockStore with nested key changes', async () => {
			// @ts-expect-error to test, nested keys
			const changes: Partial<MockData> = { currency: { amount: 5000 } };
			const expected = { ...mockData, ...changes };
			await mockStore.setByPair(changes);
			expect(spy_setByPair).toHaveBeenCalledWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should not update mockStore with empty changes', async () => {
			const changes: Partial<MockData> = {};
			const expected = { ...mockData };
			await mockStore.setByPair(changes);
			expect(spy_setByPair).toHaveBeenCalledWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should not update mockStore with empty arguments', async () => {
			const expected = { ...mockData };
			// @ts-expect-error to test, empty arguments
			await mockStore.setByPair();
			expect(spy_setByPair).toHaveBeenCalledWith();
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle non-existent key "nonexists: added"', async () => {
			// @ts-expect-error to test non-exists keys
			const changes: Partial<MockData> = { nonexists: 'added' };
			const expected = { ...mockData, ...changes };
			await mockStore.setByPair(changes);
			expect(spy_setByPair).toHaveBeenCalledWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});
	});

	describe('Method <BySetter>', () => {
		type SetterType = (data: Readonly<MockData>) => Partial<MockData>;
		const spy_setBySetter = vi.spyOn(mockStore, 'setBySetter');
		const spy_storageSet = vi.spyOn(mockInMemoryStorage, 'set');

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
			expect(spy_setBySetter).toHaveBeenCalledWith(setter);
			expect(setter).toHaveBeenCalledWith(mockData);
			expect(setter).toHaveReturnedWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data with nested key "currency: { amount: 5000 }"', async () => {
			// @ts-expect-error to test, nested keys
			const changes: Partial<MockData> = { currency: { amount: 5000 } };
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_data) => changes);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toHaveBeenCalledWith(setter);
			expect(setter).toHaveBeenCalledWith(mockData);
			expect(setter).toHaveReturnedWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data with no changes', async () => {
			const changes: Partial<MockData> = {};
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_data) => changes);
			const expected = { ...mockData };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toHaveBeenCalledWith(setter);
			expect(setter).toHaveBeenCalledWith(mockData);
			expect(setter).toHaveReturnedWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data with empty setter', async () => {
			// @ts-expect-error to test empty setter
			// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
			const setter: SetterType = vi.fn((_data) => {});
			const expected = { ...mockData };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toHaveBeenCalledWith(setter);
			expect(setter).toHaveBeenCalledWith(mockData);
			expect(setter).toHaveReturnedWith(void 0);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle non-existent key "nonexists: added"', async () => {
			// @ts-expect-error to test non-exists keys
			const changes: Partial<MockData> = { nonexists: 'added' };
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_data) => changes);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toHaveBeenCalledWith(setter);
			expect(setter).toHaveBeenCalledWith(mockData);
			expect(setter).toHaveReturnedWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle async wrapped setter', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			// @ts-expect-error to test async wrapped setter
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn(async (_data) => changes);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toHaveBeenCalledWith(setter);
			expect(setter).toHaveBeenCalledWith(mockData);
			expect(setter).toHaveReturnedWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle promise.resolve wrapped return data from setter', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			// @ts-expect-error to test promise.resolve wrapped setter
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_data) => Promise.resolve(changes));
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toHaveBeenCalledWith(setter);
			expect(setter).toHaveBeenCalledWith(mockData);
			expect(setter).toHaveReturnedWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
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
			expect(spy_setBySetter).toHaveBeenCalledWith(setter);
			expect(setter).toHaveBeenCalledWith(mockData);
			expect(setter).toHaveReturnedWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
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
			expect(spy_setBySetter).toHaveBeenCalledWith(setter);
			expect(setter).toHaveBeenCalledWith(mockData);
			expect(setter).toHaveReturnedWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
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
			expect(spy_setBySetter).toHaveBeenCalledWith(setter);
			expect(setter).toHaveBeenCalledWith(mockData);
			expect(setter).toHaveReturnedWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
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
			expect(spy_setBySetter).toHaveBeenCalledWith(setter);
			expect(setter).toHaveBeenCalledWith(mockData);
			expect(setter).toHaveReturnedWith(changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});
	});

	describe('Method <ByKeySetter>', () => {
		type SetterType<K extends keyof MockData = keyof MockData> = (
			value: Readonly<MockData[K]>
		) => MockData[K];
		const spy_setByKeySetter = vi.spyOn(mockStore, 'setByKeySetter');
		const spy_storageSet = vi.spyOn(mockInMemoryStorage, 'set');

		it('should have the <setByKeySetter> method and be a function', async () => {
			expect(mockStore).toHaveProperty('setByKeySetter');
			expect(mockStore.setByKeySetter).toBeTypeOf('function');
			expectTypeOf(mockStore.setByKeySetter).toBeFunction();
			expectTypeOf(mockStore.setByKeySetter).parameter(0).toBeString();
			expectTypeOf(mockStore.setByKeySetter).parameter(0).toEqualTypeOf<keyof MockData>();
			expectTypeOf(mockStore.setByKeySetter).parameter(1).toBeFunction();
			expectTypeOf(mockStore.setByKeySetter).parameter(1).toEqualTypeOf<SetterType>();
		});

		it('should set data to a single key', async () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType<'lang'> = vi.fn((_lang) => 'FR');
			const expected = { ...mockData, lang: 'FR' };
			await mockStore.setByKeySetter('lang', setter);
			expect(spy_setByKeySetter).toHaveBeenCalledWith('lang', setter);
			expect(setter).toHaveBeenCalledWith(mockData['lang']);
			expect(setter).toHaveReturnedWith('FR');
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data to a nested key', async () => {
			// @ts-expect-error to test nested keys
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType<'currency'> = vi.fn((_currency) => ({ amount: 5000 }));
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			await mockStore.setByKeySetter('currency', setter);
			expect(spy_setByKeySetter).toHaveBeenCalledWith('currency', setter);
			expect(setter).toHaveBeenCalledWith(mockData['currency']);
			expect(setter).toHaveReturnedWith({ amount: 5000 });
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should set data to a path key', async () => {
			// @ts-expect-error to test path keys
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_currency_amount) => 5000);
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			// FIXME: support path-keys type suggestion
			// @ts-expect-error to test path keys
			await mockStore.setByKeySetter('currency.amount', setter);
			expect(spy_setByKeySetter).toHaveBeenCalledWith('currency.amount', setter);
			expect(setter).toHaveBeenCalledWith(mockData['currency']['amount']);
			expect(setter).toHaveReturnedWith(5000);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle untyped value when update data', async () => {
			// @ts-expect-error to test untyped value
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType<'lang'> = vi.fn((_lang) => 'RU');
			const expected = { ...mockData, lang: 'RU' };
			await mockStore.setByKeySetter('lang', setter);
			expect(spy_setByKeySetter).toHaveBeenCalledWith('lang', setter);
			expect(setter).toHaveBeenCalledWith(mockData['lang']);
			expect(setter).toHaveReturnedWith('RU');
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle empty setter when update data', async () => {
			// @ts-expect-error to test empty setter
			// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
			const setter: SetterType<'lang'> = vi.fn((_lang) => {});
			const expected = { ...mockData };
			await mockStore.setByKeySetter('lang', setter);
			expect(spy_setByKeySetter).toHaveBeenCalledWith('lang', setter);
			expect(setter).toHaveBeenCalledWith(mockData['lang']);
			expect(setter).toHaveReturnedWith(void 0);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle non-existent key when update data', async () => {
			// @ts-expect-error to test non-exists keys
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType = vi.fn((_nonexists) => 'added');
			const expected = { ...mockData };
			// @ts-expect-error to test non-exists keys
			await mockStore.setByKeySetter('nonexists', setter);
			expect(spy_setByKeySetter).toHaveBeenCalledWith('nonexists', setter);
			expect(setter).toHaveBeenCalledWith(void 0);
			expect(setter).toHaveReturnedWith('added');
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('should handle non-related key/value pair when update data', async () => {
			// @ts-expect-error to test non-related key/value pair
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const setter: SetterType<'currency'> = vi.fn((_currency) => 'FR');
			const expected = { ...mockData };
			await mockStore.setByKeySetter('currency', setter);
			expect(spy_setByKeySetter).toHaveBeenCalledWith('currency', setter);
			expect(setter).toHaveBeenCalledWith(mockData['currency']);
			expect(setter).toHaveReturnedWith('FR');
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});
	});

	describe.todo('Method <ByKeyValue', () => {
		type ValueType<K extends keyof MockData = keyof MockData> = MockData[K];
		const spy_setByKeyValue = vi.spyOn(mockStore, 'setByKeyValue');
		const spy_storageSet = vi.spyOn(mockInMemoryStorage, 'set');

		it('should have the <setByKeyValue> method and be a function', async () => {
			expect(mockStore).toHaveProperty('setByKeyValue');
			expect(mockStore.setByKeyValue).toBeTypeOf('function');
			expectTypeOf(mockStore.setByKeyValue).toBeFunction();
			expectTypeOf(mockStore.setByKeyValue).parameter(0).toBeString();
			expectTypeOf(mockStore.setByKeyValue).parameter(0).toEqualTypeOf<keyof MockData>();
			expectTypeOf(mockStore.setByKeyValue).parameter(1).not.toBeNullable();
			expectTypeOf(mockStore.setByKeyValue).parameter(1).toEqualTypeOf<ValueType>();
		});

		it('', async () => {
			const changes: ValueType<'lang'> = 'FR';
			const expected = { ...mockData, lang: changes };
			await mockStore.setByKeyValue('lang', changes);
			expect(spy_setByKeyValue).toHaveBeenCalledWith('lang', changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('', async () => {
			// @ts-expect-error to test nested key
			const changes: ValueType<'currency'> = { amount: 5000 };
			const expected = { ...mockData, currency: { ...mockData['currency'], ...changes } };
			await mockStore.setByKeyValue('currency', changes);
			expect(spy_setByKeyValue).toHaveBeenCalledWith('currency', changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});

		it('', async () => {
			// @ts-expect-error to test path key
			const changes: ValueType<'currency.amount'> = 5000;
			const expected = {
				...mockData,
				currency: {
					...mockData['currency'],
					amount: changes,
				},
			};
			// @ts-expect-error to test path key
			await mockStore.setByKeyValue('currency.amount', changes);
			expect(spy_setByKeyValue).toHaveBeenCalledWith('currency.amount', changes);
			expect(spy_storageSet).toHaveBeenCalledWith(MOCK_NAMESPACE, expected);
			expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(expected);
		});
	});
});

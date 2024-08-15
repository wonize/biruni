import type { DeepPartial } from '@/helpers/deep-partial';
import type { Path } from '@/path/mod';
import {
	MOCK_NAMESPACE,
	clearMockStorage,
	mockData,
	mockSet,
	mockStore,
	type MockData,
} from '@repo/mocks';

describe.skip('Biruni Setter Methods', () => {
	beforeEach(() => clearMockStorage());
	afterEach(() => clearMockStorage());

	// describe('Verify <mockStore>', () => {
	// 	it('should match the type of StoreInterface<MockData>', async () => {
	// 		expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).not.toBeUndefined();
	// 		expect(mockInMemoryStorage.get(MOCK_NAMESPACE)).toMatchObject(mockData);
	// 		expectTypeOf(mockStore).toMatchTypeOf<StoreInterface<MockData>>();
	// 	});
	// });

	describe('Method <ByPair>', () => {
		const spy_setByPair = vi.spyOn(mockStore, 'setByPair');

		it('should have the <setByPair> method and be a function', async () => {
			expect(mockStore).toHaveProperty('setByPair');
			expect(mockStore.setByPair).toBeTypeOf('function');
			expectTypeOf(mockStore.setByPair).toBeFunction();
			expectTypeOf(mockStore.setByPair).parameter(0).toEqualTypeOf<DeepPartial<MockData>>();
		});

		it('should update mockStore with single key changes', async () => {
			const changes = { lang: 'FR' } as const;
			const expected = { ...mockData, ...changes };
			await mockStore.setByPair(changes);
			expect(spy_setByPair).toBeCalledWith(expect.objectContaining(changes));
			expect(mockSet).toHaveBeenLastCalledWith(
				MOCK_NAMESPACE,
				expect.objectContaining(expected)
			);
		});

		it('should update mockStore with nested key changes', async () => {
			const changes = { currency: { amount: 5000 } };
			const expected = {
				...mockData,
				currency: {
					...mockData['currency'],
					...changes['currency'],
				},
			};
			await mockStore.setByPair(changes);
			expect(spy_setByPair).toBeCalledWith(changes);
			expect(mockSet).toBeCalledWith(MOCK_NAMESPACE, expect.objectContaining(expected));
		});

		it('should not update mockStore with empty changes', async () => {
			const changes: Partial<MockData> = {};
			const expected = { ...mockData };
			await mockStore.setByPair(changes);
			expect(spy_setByPair).toBeCalledWith(changes);
			expect(mockSet).toBeCalledWith(MOCK_NAMESPACE, expect.objectContaining(expected));
		});

		it('should not update mockStore with empty arguments', async () => {
			const expected = { ...mockData };
			// @ts-expect-error to test empty argument
			await mockStore.setByPair();
			expect(spy_setByPair).toBeCalledWith();
			expect(mockSet).toBeCalledWith(MOCK_NAMESPACE, expect.objectContaining(expected));
		});

		it('should handle non-existent key "nonexists: added"', async () => {
			// @ts-expect-error to test non-exists keys
			const changes: Partial<MockData> = { nonexists: 'added' };
			const expected = { ...mockData, ...changes };
			await mockStore.setByPair(changes);
			expect(spy_setByPair).toBeCalledWith(changes);
		});
	});

	describe.todo('Method <BySetter>', () => {
		const spy_setBySetter = vi.spyOn(mockStore, 'setBySetter');

		it('should have the <setBySetter> method and be a function', async () => {
			expect(mockStore).toHaveProperty('setBySetter');
			expect(mockStore.setBySetter).toBeTypeOf('function');
			expectTypeOf(mockStore.setBySetter).toBeFunction();
			expectTypeOf(mockStore.setBySetter).parameter(0).toBeFunction();
		});

		it('should update data with changes to "lang: FR"', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };

			const setter = vi.fn((_data) => changes);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
		});

		it('should set data with nested key "currency: { amount: 5000 }"', async () => {
			// @ts-expect-error to test, nested keys
			const changes: Partial<MockData> = { currency: { amount: 5000 } };

			const setter = vi.fn().mockReturnValue(changes);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
		});

		it('should set data with no changes', async () => {
			const changes: Partial<MockData> = {};

			const setter = vi.fn().mockReturnValue(changes);
			const expected = { ...mockData };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
		});

		it('should set data with empty setter', async () => {
			const setter = vi.fn().mockImplementation(() => { });
			const expected = { ...mockData };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(void 0);
		});

		it('should handle non-existent key "nonexists: added"', async () => {
			const changes = { nonexists: 'added' };
			const setter = vi.fn().mockReturnValue(changes);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
		});

		it('should handle async wrapped setter', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			const setter = vi.fn().mockImplementation(async () => changes);
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
		});

		it('should handle promise.resolve wrapped return data from setter', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			const setter = vi.fn().mockImplementation(() => Promise.resolve(changes));
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
			expect(mockSet).toBeCalledWith(MOCK_NAMESPACE, expect.objectContaining(expected));
		});

		it('should handle promise.resolve wrapped setter itself', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			const setter = vi
				.fn()
				.mockImplementation(() => new Promise((resolve, _) => resolve(changes)));
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
		});

		it('should handle promise.reject wrapped setter', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			const setter = vi.fn((_data) => new Promise((_resolve, reject) => reject(changes)));
			const expected = { ...mockData, ...changes };
			// @ts-expect-error to test promise.reject wrapped setter
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
		});

		it('should set data using an anonymous setter function statement', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			const setter = vi.fn(function (_data) {
				return changes;
			});
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
		});

		it('should set data using a named setter function statement', async () => {
			const changes: Partial<MockData> = { lang: 'FR' };
			const setter = vi.fn(function named_setter(_data) {
				return changes;
			});
			const expected = { ...mockData, ...changes };
			await mockStore.setBySetter(setter);
			expect(spy_setBySetter).toBeCalledWith(setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toHaveReturnedWith(changes);
		});
	});

	describe.todo('Method <ByKeySetter>', () => {
		const spy_setByKeySetter = vi.spyOn(mockStore, 'setByKeySetter');

		it('should have the <setByKeySetter> method and be a function', async () => {
			expect(mockStore).toHaveProperty('setByKeySetter');
			expect(mockStore.setByKeySetter).toBeTypeOf('function');
			expectTypeOf(mockStore.setByKeySetter).toBeFunction();
			expectTypeOf(mockStore.setByKeySetter).parameter(0).toBeString();
			expectTypeOf(mockStore.setByKeySetter)
				.parameter(0)
				.toEqualTypeOf<Path.From<MockData>>();
			expectTypeOf(mockStore.setByKeySetter).parameter(1).toBeFunction();
		});

		it('should set data to a single key', async () => {
			const setter = vi.fn().mockReturnValue('FR');
			const expected = { ...mockData, lang: 'FR' };
			await mockStore.setByKeySetter('lang', setter);
			expect(spy_setByKeySetter).toBeCalledWith('lang', setter);
			expect(setter).toBeCalledWith(mockData['lang']);
			expect(setter).toHaveReturnedWith('FR');
		});

		it('should set data to a nested key', async () => {
			const setter = vi.fn().mockReturnValue({ amount: 5000 });
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			await mockStore.setByKeySetter('currency', setter);
			expect(spy_setByKeySetter).toBeCalledWith('currency', setter);
			expect(setter).toBeCalledWith(mockData['currency']);
			expect(setter).toHaveReturnedWith({ amount: 5000 });
		});

		it('should set data to a path key', async () => {
			const setter = vi.fn().mockReturnValue(5000);
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			await mockStore.setByKeySetter('currency.amount', setter);
			expect(spy_setByKeySetter).toBeCalledWith('currency.amount', setter);
			expect(setter).toBeCalledWith(mockData['currency']['amount']);
			expect(setter).toHaveReturnedWith(5000);
		});

		it('should handle untyped value when update data', async () => {
			const setter = vi.fn().mockReturnValue('RU');
			const expected = { ...mockData, lang: 'RU' };
			await mockStore.setByKeySetter('lang', setter);
			expect(spy_setByKeySetter).toBeCalledWith('lang', setter);
			expect(setter).toBeCalledWith(mockData['lang']);
			expect(setter).toHaveReturnedWith('RU');
		});

		it('should handle empty setter when update data', async () => {
			const setter = vi.fn().mockImplementation(() => { });
			const expected = { ...mockData };
			await mockStore.setByKeySetter('lang', setter);
			expect(spy_setByKeySetter).toBeCalledWith('lang', setter);
			expect(setter).toBeCalledWith(mockData['lang']);
			expect(setter).toHaveReturnedWith(void 0);
		});

		it('should handle non-existent key when update data', async () => {
			const setter = vi.fn().mockReturnValue('added');
			const expected = { ...mockData };
			// @ts-expect-error to test non-exists keys
			await mockStore.setByKeySetter('nonexists', setter);
			expect(spy_setByKeySetter).toBeCalledWith('nonexists', setter);
			expect(setter).toBeCalledWith(void 0);
			expect(setter).toHaveReturnedWith('added');
		});

		it('should handle non-related key/value pair when update data', async () => {
			const setter = vi.fn().mockReturnValue('FR');
			const expected = { ...mockData };
			await mockStore.setByKeySetter('currency', setter);
			expect(spy_setByKeySetter).toBeCalledWith('currency', setter);
			expect(setter).toBeCalledWith(mockData['currency']);
			expect(setter).toHaveReturnedWith('FR');
		});
	});

	describe.todo('Method <ByKeyValue>', () => {
		const spy_setByKeyValue = vi.spyOn(mockStore, 'setByKeyValue');

		it('should have the <setByKeyValue> method and be a function', async () => {
			expect(mockStore).toHaveProperty('setByKeyValue');
			expect(mockStore.setByKeyValue).toBeTypeOf('function');
			expectTypeOf(mockStore.setByKeyValue).toBeFunction();
			expectTypeOf(mockStore.setByKeyValue).parameter(0).toBeString();
			expectTypeOf(mockStore.setByKeyValue).parameter(0).toEqualTypeOf<Path.From<MockData>>();
			expectTypeOf(mockStore.setByKeyValue).parameter(1).not.toBeNullable();
		});

		it('should accept a string key and a non-nullable value', async () => {
			const changes = 'FR';
			const expected = { ...mockData, lang: changes };
			await mockStore.setByKeyValue('lang', changes);
			expect(spy_setByKeyValue).toBeCalledWith('lang', changes);
		});

		it('should accept a nested key and a value with the correct type', async () => {
			// @ts-expect-error to test nested key
			const changes: ValueType<'currency'> = { amount: 5000 };
			const expected = { ...mockData, currency: { ...mockData['currency'], ...changes } };
			await mockStore.setByKeyValue('currency', changes);
			expect(spy_setByKeyValue).toBeCalledWith('currency', changes);
		});

		it('should accept a path key and a value with the correct type', async () => {
			const changes = 5000;
			const expected = {
				...mockData,
				currency: {
					...mockData['currency'],
					amount: changes,
				},
			};
			await mockStore.setByKeyValue('currency.amount', changes);
			expect(spy_setByKeyValue).toBeCalledWith('currency.amount', changes);
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

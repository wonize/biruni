import { localstorage, LocalStoragePlugin } from '@/localstorage/mod'
import { BiruniPlugin } from '@biruni/core/plugin'
import { MOCK_NAMESPACE, mockData, type MockData } from '@repo/mocks'
import type { MockInstance } from 'vitest'

describe('Web localStorage API Plugin', () => {
	it('Verify Signature', () => {
		expect(localstorage).toBeTypeOf('function')
		expect(LocalStoragePlugin).toBeTypeOf('function')
		const plugin = localstorage<MockData>()
		expect(plugin).toHaveProperty('type')
		expect(plugin).toHaveProperty('name')
		expect(plugin).toHaveProperty('preprocess')
		expect(plugin).toHaveProperty('postprocess')
		expectTypeOf(plugin['type']).toEqualTypeOf<BiruniPlugin<MockData>['type']>()
		expectTypeOf(plugin['name']).toBeString()
	})

	let getItemSpy: MockInstance<Array<string>, string | null>;
	let setItemSpy: MockInstance<Array<string>, void>;
	const plugin = LocalStoragePlugin<MockData>();
	plugin.namespace = MOCK_NAMESPACE;
	beforeEach(() => {
		getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockData));
		setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
	})
	afterEach(() => {
		getItemSpy.mockReset();
		getItemSpy.mockClear();
		setItemSpy.mockReset();
		setItemSpy.mockClear();
		vi.clearAllMocks();
	})

	it('<postprocess> method should return same of input and should invoke <setItem> of Web Storage API', async () => {
		const input = JSON.stringify(mockData);
		// @ts-expect-error string input is accepted
		const result = await plugin.postprocess(input);
		expect(result).toBeTypeOf('string');
		expect(result).toStrictEqual(input);
		expect(setItemSpy).toBeCalledTimes(1);
		expect(setItemSpy).toBeCalledWith(MOCK_NAMESPACE, input);
	})

	it('<preprocess> method should return same of input and should invoke <getItem> of Web Storage API', async () => {
		const result = await plugin.preprocess(mockData);
		expect(result).toBeTypeOf('string');
		expect(result).toStrictEqual(JSON.stringify(mockData));
		expect(getItemSpy).toBeCalledTimes(1);
		expect(getItemSpy).toBeCalledWith(MOCK_NAMESPACE);
		expect(getItemSpy).toReturnWith(JSON.stringify(mockData));
	})

	describe('Edge Case', () => {
		it('<postprocess> method should throw error when input is not string', async () => {
			await expect(plugin.postprocess(mockData)).rejects.toThrow();
		})
	})
})

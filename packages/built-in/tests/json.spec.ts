import { json, JsonPlugin } from '@/json/mod'
import { BiruniPlugin } from '@biruni/core/plugin'
import { mockData, type MockData } from '@repo/mocks'

describe('Json Plugin', () => {
	it('Verify Signature', () => {
		expect(json).toBeTypeOf('function')
		expect(JsonPlugin).toBeTypeOf('function')
		const plugin = json<MockData>()
		expect(plugin).toHaveProperty('type')
		expect(plugin).toHaveProperty('name')
		expect(plugin).toHaveProperty('preprocess')
		expect(plugin).toHaveProperty('postprocess')
		expectTypeOf(plugin['type']).toEqualTypeOf<BiruniPlugin<MockData>['type']>()
		expectTypeOf(plugin['name']).toBeString()
	})

	it('<preprocess> method should return json object from string input', async () => {
		const plugin = JsonPlugin<MockData>();
		// @ts-expect-error the string type is ok
		const result = await plugin.preprocess(JSON.stringify(mockData));
		expect(result).toBeTypeOf('object');
		expect(result).toStrictEqual(expect.objectContaining(mockData))
	})

	it('<postprocess> method should return string from object input', async () => {
		const plugin = JsonPlugin<MockData>();
		const result = await plugin.postprocess(mockData);
		expect(result).toBeTypeOf('string');
		expect(result).toStrictEqual(JSON.stringify(mockData));
	})

	describe('Edge Case', () => {
		it('<ppreprocess> method should return same as input when input is falsy value', async () => {
			const plugin = JsonPlugin<MockData>();
			// @ts-expect-error to test falsy input
			await expect(plugin.preprocess(null)).resolves.toStrictEqual(null);

			// @ts-expect-error to test falsy input
			await expect(plugin.preprocess('')).resolves.toStrictEqual('');
		})

		it('<postprocess> method should return empty stringified object when input is nullable', async () => {
			const plugin = JsonPlugin<MockData>();
			// @ts-expect-error to test nullable input
			const result = await plugin.postprocess(null);
			expect(result).toBeTypeOf('string');
			expect(result).toStrictEqual(JSON.stringify({}));
		})
	})
})


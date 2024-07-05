import * as mod from '@/built-in/json'

describe('biruni/build-in/json.ts', () => {
	it('should export <json> plugin', () => {
		expect(mod).toHaveProperty('json')
	})

	it('should export <JsonPlugin> alias', () => {
		expect(mod).toHaveProperty('JsonPlugin')
	})
})

import * as mod from '@/factory'

describe('biruni/factory.ts', () => {
	it('should export <biruni>', () => {
		expect(mod).toHaveProperty('biruni')
	})

	it('should export <defineBiruni> alias', () => {
		expect(mod).toHaveProperty('defineBiruni')
	})

	it('should export <Biruni> alias', () => {
		expect(mod).toHaveProperty('Biruni')
	})

	it('should export <PluginFactory> alias', () => {
		expect(mod).toHaveProperty('PluginFactory')
	})

	it('should export <StoreFactory> alias', () => {
		expect(mod).toHaveProperty('StoreFactory')
	})
})

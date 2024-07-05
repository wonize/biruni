import * as mod from '@/mod'

describe('biruni/mod.ts', () => {
	it('should export <biruni>', () => {
		expect(mod).toHaveProperty('biruni')
	})

	it('should export <biruni> as <default>', () => {
		expect(mod).toHaveProperty('default')
		expect(mod['default']).toStrictEqual(mod['biruni'])
	})

	it('should export <defineBiruni>', () => {
		expect(mod).toHaveProperty('defineBiruni')
	})

	it('should export <Biruni>', () => {
		expect(mod).toHaveProperty('Biruni')
	})

	it('should export <Store>', () => {
		expect(mod).toHaveProperty('Store')
	})

	describe('built-in plugins', () => {
		it('should export <json>', () => {
			expect(mod).toHaveProperty('json')
			expect(mod).toHaveProperty('JsonPlugin')
		})

		it('should export <localstorage>', () => {
			expect(mod).toHaveProperty('localstorage')
			expect(mod).toHaveProperty('LocalStoragePlugin')
		})

		it('should export <event>', () => {
			expect(mod).toHaveProperty('event')
			expect(mod).toHaveProperty('EventEmitterPlugin')
		})
	})
})

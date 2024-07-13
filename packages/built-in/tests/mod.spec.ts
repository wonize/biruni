import * as mod from '@/mod'

describe('Module Barrel Export', () => {
	it('should re-export <localStorage> plugin and aliases', () => {
		expect(mod).toHaveProperty('localstorage')
		expect(mod).toHaveProperty('LocalStoragePlugin')
	})

	it('should re-export <JSON> plugin and aliases', () => {
		expect(mod).toHaveProperty('json')
		expect(mod).toHaveProperty('JsonPlugin')
	})

	it('should re-export <EventEmitter> plugin and aliases', () => {
		expect(mod).toHaveProperty('event')
		expect(mod).toHaveProperty('EventEmitterPlugin')
	})

	it('should re-export <recommended> plugin and aliases', () => {
		expect(mod).toHaveProperty('builtins')
		expect(mod).toHaveProperty('recommended')
		expect(mod).toHaveProperty('BuiltinPlugin')
		expect(mod).toHaveProperty('BasicLocalStorage')
		expect(mod).toHaveProperty('LocalStorageCollection')
		expect(mod).toHaveProperty('default')
	})
})

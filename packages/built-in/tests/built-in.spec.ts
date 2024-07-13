import * as mod from '@/built-in';
import type { BiruniPlugin } from '@biruni/core/plugin';
import type { MockData } from '@repo/mocks';

describe('Built-in Plugins', () => {
	it('should re-export aliases', () => {
		expect(mod).toHaveProperty('builtins')
		expect(mod).toHaveProperty('recommended')
		expect(mod).toHaveProperty('BuiltinPlugin')
		expect(mod).toHaveProperty('BasicLocalStorage')
		expect(mod).toHaveProperty('LocalStorageCollection')
		expect(mod).toHaveProperty('default')
	})

	it('should return Array type collection of basic plugins', () => {
		expectTypeOf(mod.builtins<MockData>).parameter(0).toBeUndefined()
		expectTypeOf(mod.builtins<MockData>).returns.toEqualTypeOf<Array<BiruniPlugin<MockData>>>()
		const plugins = mod.builtins<MockData>()
		expect(plugins).toBeTypeOf('object')
		expect(plugins).toBeInstanceOf(Array)
	})
})

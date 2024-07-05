import * as mod from '@/core/set'

describe('biruni/core/set.ts', () => {
	it('should export <Setter>', () => {
		expect(mod).toHaveProperty('Setter')
	})

	describe('Setter', () => {
		it('should export type-guards', () => {
			expect(mod.Setter).toHaveProperty('isByPair')
			expect(mod.Setter).toHaveProperty('isBySetter')
			expect(mod.Setter).toHaveProperty('isByKeyValue')
			expect(mod.Setter).toHaveProperty('isByKeySetter')
			expect(mod.Setter).toHaveProperty('isKeyOfData')
		})

		it('should export utilities', () => {
			expect(mod.Setter).toHaveProperty('setByPair')
			expect(mod.Setter).toHaveProperty('setBySetter')
			expect(mod.Setter).toHaveProperty('setByKeyValue')
			expect(mod.Setter).toHaveProperty('setByKeySetter')
		})
	})
})

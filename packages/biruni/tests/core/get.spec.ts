import * as mod from '@/core/get'

describe('biruni/core/get.ts', () => {
	it('should export <Getter>', () => {
		expect(mod).toHaveProperty('Getter')
	})

	describe('Getter', () => {
		it('should export type-guards', () => {
			expect(mod.Getter).toHaveProperty('isByEntire')
			expect(mod.Getter).toHaveProperty('isByMapper')
			expect(mod.Getter).toHaveProperty('isKeyOfData')
			expect(mod.Getter).toHaveProperty('isByKey')
			expect(mod.Getter).toHaveProperty('isByKeyMapper')
			expect(mod.Getter).toHaveProperty('isByKeys')
			expect(mod.Getter).toHaveProperty('isByTruthy')
		})

		it('should export utilities', () => {
			expect(mod.Getter).toHaveProperty('getByEntire')
			expect(mod.Getter).toHaveProperty('getByMapper')
			expect(mod.Getter).toHaveProperty('getByKey')
			expect(mod.Getter).toHaveProperty('getByKeyMapper')
			expect(mod.Getter).toHaveProperty('getByKeys')
			expect(mod.Getter).toHaveProperty('getByTruthy')
		})
	})
})

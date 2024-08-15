import * as SetBarrel from '@/set/mod.ts';

describe('set/mod.ts', () => {
	it('should re-export <setByPair> utility', () => {
		expect(SetBarrel).toHaveProperty('setByPair');
		expectTypeOf(SetBarrel['setByPair']).toBeFunction();
	})

	it('should re-export <setByKeyValue> utility', () => {
		expect(SetBarrel).toHaveProperty('setByKeyValue');
		expectTypeOf(SetBarrel['setByKeyValue']).toBeFunction();
	})

	it('should re-export <setByKeySetter> utility', () => {
		expect(SetBarrel).toHaveProperty('setByKeySetter');
		expectTypeOf(SetBarrel['setByKeySetter']).toBeFunction();
	})

	it('should re-export <setBySetter> utility', () => {
		expect(SetBarrel).toHaveProperty('setBySetter');
		expectTypeOf(SetBarrel['setBySetter']).toBeFunction();
	})
})

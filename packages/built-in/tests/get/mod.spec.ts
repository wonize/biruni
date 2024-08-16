import * as getBarrel from '@/get/mod.ts';

describe('get/mod.ts', () => {
	it('should re-export <getByEntire> utility', () => {
		expect(getBarrel).toHaveProperty('getByEntire');
		expectTypeOf(getBarrel['getByEntire']).toBeFunction();
	});

	it('should re-export <getByKey> utility', () => {
		expect(getBarrel).toHaveProperty('getByKey');
		expectTypeOf(getBarrel['getByKey']).toBeFunction();
	});

	it('should re-export <getByKeyMapper> utility', () => {
		expect(getBarrel).toHaveProperty('getByKeyMapper');
		expectTypeOf(getBarrel['getByKeyMapper']).toBeFunction();
	});

	it('should re-export <getByMapper> utility', () => {
		expect(getBarrel).toHaveProperty('getByMapper');
		expectTypeOf(getBarrel['getByMapper']).toBeFunction();
	});

	it('should re-export <getByKeys> utility', () => {
		expect(getBarrel).toHaveProperty('getByKeys');
		expectTypeOf(getBarrel['getByKeys']).toBeFunction();
	});

	it('should re-export <getByTruthy> utility', () => {
		expect(getBarrel).toHaveProperty('getByTruthy');
		expectTypeOf(getBarrel['getByTruthy']).toBeFunction();
	});
});

import * as Helpers from '@/helpers/mod';

describe('helpers/mod.ts', () => {
	it('should re-export <keyOf> utility', () => {
		expect(Helpers).toHaveProperty('keyOf');
		expectTypeOf(Helpers['keyOf']).toBeFunction();
	});

	it('should re-export <hasOwn> utility', () => {
		expect(Helpers).toHaveProperty('mergeFresh');
		expectTypeOf(Helpers['mergeFresh']).toBeFunction();
	});

	it('should re-export <isEmptyObject> utility', () => {
		expect(Helpers).toHaveProperty('isEmptyObject');
		expectTypeOf(Helpers['isEmptyObject']).toBeFunction();
	});

	it('should re-export <shouldFreshInitializing> utility', () => {
		expect(Helpers).toHaveProperty('shouldFreshInitializing');
		expectTypeOf(Helpers['shouldFreshInitializing']).toBeFunction();
	});
});

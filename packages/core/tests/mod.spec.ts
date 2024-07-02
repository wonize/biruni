import * as coreBarrel from '@/mod';

describe('core/mod.ts', () => {
	it('export <Setter> namespace', () => {
		expect(coreBarrel).toHaveProperty('Setter');
	})

	it('export <Getter> namespace', () => {
		expect(coreBarrel).toHaveProperty('Getter');
	})

	it('export <Store> class', () => {
		expect(coreBarrel).toHaveProperty('Store');
	})

	it('export <default> same as <Store> class', () => {
		expect(coreBarrel.default).toStrictEqual(coreBarrel.Store);
	})
})

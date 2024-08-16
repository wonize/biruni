import * as mod from '@/core/mod';

describe('biruni/core/mod.ts', () => {
	it('should export <Store>', () => {
		expect(mod).toHaveProperty('Store');
	});

	it('should export <Setter>', () => {
		expect(mod).toHaveProperty('Setter');
	});

	it('should export <Getter>', () => {
		expect(mod).toHaveProperty('Getter');
	});
});

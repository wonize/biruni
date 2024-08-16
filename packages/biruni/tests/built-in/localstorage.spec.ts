import * as mod from '@/built-in/localstorage';

describe('biruni/build-in/localstorage.ts', () => {
	it('should export <localstorage> plugin', () => {
		expect(mod).toHaveProperty('localstorage');
	});

	it('should export <LocalStoragePlugin> alias', () => {
		expect(mod).toHaveProperty('LocalStoragePlugin');
	});
});

import * as mod from '@/built-in/mod';

describe('biruni/build-in/mod.ts', () => {
	it('should export <recommended>', () => {
		expect(mod).toHaveProperty('recommended');
	});

	it('should export <builtins> alias', () => {
		expect(mod).toHaveProperty('builtins');
	});

	it('should export <BuiltinPlugin> alias', () => {
		expect(mod).toHaveProperty('BuiltinPlugin');
	});

	it('should export <LocalStorageCollection>', () => {
		expect(mod).toHaveProperty('LocalStorageCollection');
	});

	describe('LocalStorage Plugin', () => {
		it('should export <localstorage> plugin', () => {
			expect(mod).toHaveProperty('localstorage');
		});

		it('should export <LocalStoragePlugin> alias', () => {
			expect(mod).toHaveProperty('LocalStoragePlugin');
		});
	});

	describe('Json Plugin', () => {
		it('should export <json> plugin', () => {
			expect(mod).toHaveProperty('json');
		});

		it('should export <JsonPlugin> alias', () => {
			expect(mod).toHaveProperty('JsonPlugin');
		});
	});

	describe('EventEmitter Plugin', () => {
		it('should export <event> plugin', () => {
			expect(mod).toHaveProperty('event');
		});

		it('should export <EventEmitterPlugin> alias', () => {
			expect(mod).toHaveProperty('EventEmitterPlugin');
		});
	});
});

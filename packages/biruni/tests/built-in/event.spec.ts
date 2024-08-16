import * as mod from '@/built-in/event';

describe('biruni/build-in/event.ts', () => {
	it('should export <event> plugin', () => {
		expect(mod).toHaveProperty('event');
	});

	it('should export <EventEmitterPlugin> alias', () => {
		expect(mod).toHaveProperty('EventEmitterPlugin');
	});
});

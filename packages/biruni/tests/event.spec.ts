import * as mod from '@/event';

describe('biruni/event', () => {
	it('have re-export <event>', () => {
		expect(mod).toHaveProperty('event');
	});

	it('have re-export <EventPlugin>', () => {
		expect(mod).toHaveProperty('EventPlugin');
	});

	it('have re-export <event> as <defualt>', () => {
		expect(mod).toHaveProperty('default');
		expect(mod.default).toBe(mod.event);
	});
});

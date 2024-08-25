import * as mod from '@/json';

describe('biruni/json', () => {
	it('have re-export <json>', () => {
		expect(mod).toHaveProperty('json');
	});

	it('have re-export <JsonPlugin>', () => {
		expect(mod).toHaveProperty('JsonPlugin');
	});

	it('have re-export <json> as <default>', () => {
		expect(mod).toHaveProperty('default');
		expect(mod.default).toBe(mod.json);
	});

	it('have re-export <JsonParsePlugin>', () => {
		expect(mod).toHaveProperty('JsonParsePlugin');
	});

	it('have re-export <JsonStringifyPlugin>', () => {
		expect(mod).toHaveProperty('JsonStringifyPlugin');
	});
});

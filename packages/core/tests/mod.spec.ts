import { Core } from '@/core';
import * as mod from '@/mod';
import { Plugin } from '@/plugin';

describe('core/mod.ts', () => {
	it('export <Core> class', () => {
		expect(mod).toHaveProperty('Core');
		const core = expectTypeOf(mod).toHaveProperty('Core');
		core.instance.toEqualTypeOf<Core<object>>();
	});

	it('export <Plugin> abstract class', () => {
		expect(mod).toHaveProperty('Plugin');
		const plugin = expectTypeOf(mod).toHaveProperty('Plugin');
		plugin.toHaveProperty('prototype').toEqualTypeOf<Plugin<any>>();
	});

	it('export <DataFlow> enum', () => {
		expect(mod).toHaveProperty('DataFlow');
		expectTypeOf(mod).toHaveProperty('DataFlow');
	});

	it('export <default> same as <Core> class', () => {
		expect(mod.default).toStrictEqual(mod.Core);
		expectTypeOf(mod.default).toEqualTypeOf<typeof mod.Core>();
	});
});

import { Core } from '@/core';
import { DataFlow } from '@/flow';
import { Plugin } from '@/plugin';
import type { MockData } from '@repo/mocks';

describe('Plugin interface', () => {
	const instance = expectTypeOf<Plugin<MockData>>();

	class PluginImpl extends Plugin<MockData> {
		public constructor() {
			super('impl');
		}
	}

	it('should to have <process> method', () => {
		const process = instance.toHaveProperty('process');
		process.toBeFunction();
		process.parameter(0).toBeObject();
		process.parameter(1).toBeUndefined();
		process.returns.toBeObject();
	});

	it('should to have <setup> method', () => {
		const setup = instance.toHaveProperty('setup');
		setup.toBeFunction();
		setup.parameter(0).toEqualTypeOf<Core<MockData>>();
		setup.returns.toBeVoid();
	});

	it('should to have <flow> attribute and default initialized', () => {
		const flow = instance.toHaveProperty('flow');
		flow.toEqualTypeOf<DataFlow>();
		const plugin = new PluginImpl();
		expect(plugin.flow).toStrictEqual(DataFlow.NONE);
		expect(plugin.flow).not.toStrictEqual(DataFlow.INPUT);
		expect(plugin.flow).not.toStrictEqual(DataFlow.OUTPUT);
	});
});

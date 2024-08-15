import { Core } from '@/core';
import { DataFlow } from '@/flow';
import { Plugin } from '@/plugin';
import type { MockData } from '@repo/mocks';

describe('core/core.ts', () => {
	describe('Interface', () => {
		const prototype = expect(Core.prototype);
		const instance = expectTypeOf(Core<MockData>).instance;

		it('should to have <bound> method', () => {
			prototype.toHaveProperty('bound');
			const bound = instance.toHaveProperty('bound');
			bound.toBeFunction();
			bound.parameter(0).toBeString();
			bound.parameter(1).toBeUnknown();
		});

		it.skip('should to have <namespace> accessor', () => {
			prototype.toHaveProperty('namespace');
		});

		it('should to have <plug> method', () => {
			prototype.toHaveProperty('plug');
			const plug = instance.toHaveProperty('plug');
			plug.toBeFunction();
			plug.parameter(0).toEqualTypeOf<Plugin<MockData>>();
			plug.returns.toBeVoid();
		});

		it('should to have <register> method', () => {
			prototype.toHaveProperty('register');
			const register = instance.toHaveProperty('register');
			register.toBeFunction();
			register.parameter(0).toBeString();
			register.parameter(1).toBeFunction();
			register.returns.toBeObject();
		});

		it('should to have <invoke> method', () => {
			prototype.toHaveProperty('invoke');
			const invoke = instance.toHaveProperty('invoke');
			invoke.toBeFunction();
			invoke.parameters.toEqualTypeOf<[string, ...unknown[]]>();
			invoke.returns.toBeUnknown();
		});

		it('should to have <watch> method', () => {
			prototype.toHaveProperty('watch');
			const watch = instance.toHaveProperty('watch');
			watch.toBeFunction();
			watch.parameter(0).toBeString();
			watch.parameter(1).toBeFunction();
			watch.returns.toBeObject();
		});

		it('should to have <trigger> method', () => {
			prototype.toHaveProperty('trigger');
			const trigger = instance.toHaveProperty('trigger');
			trigger.toBeFunction();
			trigger.parameters.toEqualTypeOf<[string, ...unknown[]]>();
			trigger.returns.toBeVoid();
		});

		it('should to have <process> method', () => {
			prototype.toHaveProperty('process');
			const process = instance.toHaveProperty('process');
			process.toBeFunction();
			process.parameter(0).toEqualTypeOf<DataFlow>();
			const process_callback = process.parameter(1);
			process_callback.toBeFunction();
			process_callback.parameter(0).toEqualTypeOf<MockData>();
			process_callback.returns.toBeUnknown();
			process.returns.toEqualTypeOf<MockData>();
		});
	});

	describe.todo('Functionality <Core>', () => {
		// TODO: write plugin tests and make mocks of plugins
		// put all together in here

		const core = new Core('namespace');
	});
});

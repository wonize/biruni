import { Core } from '@/core';
import { DataFlow } from '@/flow';
import { Plugin } from '@/plugin';
import type { MOCK_NAMESPACE, MockData } from '@repo/mocks';

describe('core/plugin.ts', () => {
	describe('Plugin Interface', () => {
		const instance = expectTypeOf<Plugin<MockData>>();

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
		});
	});

	describe('Plugin Functionality', () => {
		class ConcretePlugin extends Plugin<MockData> {
			public constructor() {
				super('concrete');
			}
		}

		const concrete = new ConcretePlugin();

		const setupSpy = vi.spyOn(concrete, 'setup');
		it('should call <setup> and assign the given parameter to <core>', () => {
			concrete.setup({ __mock__: true } as unknown as Core<MockData, typeof MOCK_NAMESPACE>);
			expect(setupSpy).toBeCalledTimes(1);
			expect(setupSpy).toBeCalledWith(expect.objectContaining({ __mock__: true }));
			expect(concrete['core']).toStrictEqual(expect.objectContaining({ __mock__: true }));
		});

		const processSpy = vi.spyOn(concrete, 'process');
		it('should call <process> and return the given parameter', () => {
			concrete.process({ __mock__: true } as unknown as MockData);
			expect(processSpy).toBeCalledTimes(1);
			expect(processSpy).toBeCalledWith(expect.objectContaining({ __mock__: true }));
			expect(processSpy).toReturnWith(expect.objectContaining({ __mock__: true }));
		});

		it('should cunstruct without parameter', () => {
			expectTypeOf(ConcretePlugin).constructorParameters.toEqualTypeOf<[]>();
		});
	});
});

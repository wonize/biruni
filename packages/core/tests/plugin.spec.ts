import { Core } from '@/core';
import { DataFlow } from '@/flow';
import { Plugin } from '@/plugin';
import type { MOCK_NAMESPACE, MockData } from '@repo/mocks';
import type { MockInstance } from 'vitest';

describe('core/plugin.ts', () => {
	describe('Plugin Interface', () => {
		const instance = expectTypeOf<Plugin<MockData>>();

		it('should have correct <process> method', () => {
			const process = instance.toHaveProperty('process');
			process.toBeFunction();
			process.parameter(0).toBeObject();
			process.returns.toBeObject();
		});

		it('should have correct <setup> method', () => {
			const setup = instance.toHaveProperty('setup');
			setup.toBeFunction();
			setup.parameter(0).toEqualTypeOf<Core<MockData>>();
			setup.returns.toBeVoid();
		});

		it('should have correct <flow> attribute', () => {
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

		let concrete: Plugin<MockData>;
		let setupSpy: MockInstance;
		let processSpy: MockInstance;

		beforeEach(() => {
			concrete = new ConcretePlugin();
			setupSpy = vi.spyOn(concrete, 'setup');
			processSpy = vi.spyOn(concrete, 'process');
		});

		afterEach(() => {
			vi.resetAllMocks();
			vi.clearAllMocks();
		});

		it('should implement <setup> method with assign given <Core> instance', () => {
			concrete.setup({ __mock__: true } as unknown as Core<MockData, typeof MOCK_NAMESPACE>);
			expect(setupSpy).toBeCalledTimes(1);
			expect(setupSpy).toBeCalledWith(expect.objectContaining({ __mock__: true }));
			expect(concrete['core']).toStrictEqual(expect.objectContaining({ __mock__: true }));
		});

		it('should implement <process> method with return given arguments', () => {
			concrete.process({ __mock__: true } as unknown as MockData);
			expect(processSpy).toBeCalledTimes(1);
			expect(processSpy).toBeCalledWith(expect.objectContaining({ __mock__: true }));
			expect(processSpy).toReturnWith(expect.objectContaining({ __mock__: true }));
		});

		it('should cunstruct without parameter', () => {
			expectTypeOf(ConcretePlugin).constructorParameters.toEqualTypeOf<[]>();
		});

		it('should initialized default <NONE> to <flow> attribute', () => {
			expect(concrete.flow).toStrictEqual(DataFlow.NONE);
		});
	});
});

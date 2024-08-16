import { Core } from '@/core';
import { DataFlow } from '@/flow';
import { Plugin } from '@/plugin';
import { MOCK_NAMESPACE, mockData, type MockData } from '@repo/mocks';

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

		it('should to have <namespace> accessor', () => {
			instance.toHaveProperty('namespace');
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

	describe('Functionality <Core>', () => {
		const core = new Core(MOCK_NAMESPACE);
		const processSpy = vi.spyOn(core, 'process');
		const plugSpy = vi.spyOn(core, 'plug');
		const registerSpy = vi.spyOn(core, 'register');
		const invokeSpy = vi.spyOn(core, 'invoke');
		const triggerSpy = vi.spyOn(core, 'trigger');
		const watchSpy = vi.spyOn(core, 'watch');
		const boundSpy = vi.spyOn(core, 'bound');
		const initSpy = vi.spyOn(core, 'init');

		it('should to register new internal function and invoke correctly', () => {
			const internal = vi.fn().mockImplementation((param) => ({ result: param.param }));
			core.register('custom', internal);

			expect(Array.from(core['internal'].entries())).toStrictEqual(
				expect.arrayContaining([expect.arrayContaining(['custom', internal])])
			);

			expect(registerSpy).toBeCalledTimes(1);
			expect(registerSpy).toBeCalledWith('custom', internal);
			expect(registerSpy).toReturnWith(expect.objectContaining({ custom: internal }));

			core.invoke('custom', { param: 'value' });
			expect(invokeSpy).toBeCalledTimes(1);
			expect(invokeSpy).toBeCalledWith('custom', expect.objectContaining({ param: 'value' }));
			expect(invokeSpy).toReturnWith(expect.objectContaining({ result: 'value' }));

			expect(internal).toBeCalledTimes(1);
			expect(internal).toBeCalledWith(expect.objectContaining({ param: 'value' }));
			expect(internal).toReturnWith(expect.objectContaining({ result: 'value' }));
		});

		it('should throw excepction when internal not exists', () => {
			expect(() => {
				core.invoke('bluh', 'value');
			}).toThrowError();
		});

		it('should register a <hook> listener', () => {
			const fn = vi.fn().mockImplementation((p) => ({ result: p }));
			core.watch('onCustom', fn);

			expect(Array.from(core['hooks'])).toStrictEqual(
				expect.arrayContaining([expect.arrayContaining(['onCustom', new Set([fn])])])
			);

			expect(watchSpy).toBeCalledTimes(1);
			expect(watchSpy).toBeCalledWith('onCustom', fn);
			expect(watchSpy).toReturnWith(expect.objectContaining({ onCustom: fn }));

			expect(fn).toBeCalledTimes(0);

			core.trigger('onCustom', 'value');

			expect(fn).toBeCalledTimes(1);
			expect(fn).toBeCalledWith('value');
			expect(fn).toReturnWith(expect.objectContaining({ result: 'value' }));

			expect(triggerSpy).toBeCalledTimes(1);
			expect(triggerSpy).toBeCalledWith('onCustom', 'value');
			expect(triggerSpy).toReturnWith(undefined);
		});

		it('should register a boundary', () => {
			const fn = vi.fn().mockImplementation((p) => ({ result: p }));
			core.bound('fn', fn);
			expect(boundSpy).toBeCalledWith('fn', fn);

			core.bound('value', 'value');
			expect(boundSpy).toBeCalledWith('value', 'value');

			expect(boundSpy).toBeCalledTimes(2);
		});

		it('should register a plugin', () => {
			const mockPlugin = { setup: vi.fn() } as unknown as Plugin<MockData>;

			core.plug(mockPlugin);

			expect(mockPlugin.setup).toReturnTimes(1);
			expect(mockPlugin.setup).toBeCalledWith(core);
		});

		it('should pipe with INPUT', () => {
			const mockPlugin = {
				flow: DataFlow.INPUT,
				setup: vi.fn(),
				process: vi.fn().mockImplementation((d) => d),
			} as unknown as Plugin<object>;
			core.plug(mockPlugin);

			const fn = vi.fn().mockImplementation(() => ({ value: 'value' }));
			core.process(DataFlow.INPUT, fn);

			expect(mockPlugin.process).toBeCalledTimes(1);
			expect(mockPlugin.process).toBeCalledWith(expect.objectContaining({ value: 'value' }));
			expect(mockPlugin.process).toReturnWith(expect.objectContaining({ value: 'value' }));
			expect(plugSpy).toReturnWith(void 0);
		});

		it('should pipe with OUTPUT', () => {
			const mockPlugin = {
				flow: DataFlow.OUTPUT,
				setup: vi.fn(),
				process: vi.fn().mockImplementation((d) => d),
			} as unknown as Plugin<object>;
			core.plug(mockPlugin);

			const fn = vi.fn().mockImplementation(() => ({ value: 'value' }));
			core.process(DataFlow.OUTPUT, fn);
			expect(mockPlugin.process).toBeCalledTimes(1);
			expect(mockPlugin.process).toBeCalledWith(expect.objectContaining({ value: 'value' }));
			expect(mockPlugin.process).toReturnWith(expect.objectContaining({ value: 'value' }));
		});

		it('should return only <Data> on <NONE> flow', () => {
			const mockPlugin = {
				flow: DataFlow.NONE,
				setup: vi.fn(),
				process: vi.fn().mockImplementation((d) => d),
			} as unknown as Plugin<object>;
			core.plug(mockPlugin);

			const fn = vi.fn().mockImplementation(() => ({ value: 'value' }));
			core.process(DataFlow.OUTPUT, fn);
			expect(mockPlugin.process).toBeCalledTimes(0);
			expect(processSpy).toReturnWith(expect.objectContaining({ value: 'value' }));
		});

		it('should return only on <NONE> flow', () => {
			const mockPlugin = {
				flow: DataFlow.OUTPUT,
				setup: vi.fn(),
				process: vi.fn().mockImplementation((d) => d),
			} as unknown as Plugin<object>;
			core.plug(mockPlugin);

			const fn = vi.fn().mockImplementation(() => ({ value: 'value' }));
			core.process(DataFlow.NONE, fn);
			expect(mockPlugin.process).toBeCalledTimes(0);
			expect(processSpy).toReturnWith(expect.objectContaining({ value: 'value' }));
		});

		it('should accessor to namespace', () => {
			expect(core.namespace).toStrictEqual(MOCK_NAMESPACE);
		});

		it('should assign <Data> to <set data> in <init>', () => {
			const initializer = vi.fn().mockReturnValue(mockData);
			core.init(initializer);
			expect(initializer).toBeCalledTimes(1);
			expect(initializer).toReturnTimes(1);
			expect(initSpy).toReturnWith(expect.objectContaining({}));
		});
	});
});

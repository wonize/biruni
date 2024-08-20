import { Core } from '@/core';
import { DataFlow } from '@/flow';
import { Plugin } from '@/plugin';
import { MOCK_NAMESPACE, mockData, type MockData } from '@repo/mocks';

describe('Core class', () => {
	let core: Core<MockData, typeof MOCK_NAMESPACE>;

	beforeEach(() => {
		core = new Core(MOCK_NAMESPACE);
	});

	describe('.namespace', () => {
		const namespace = expectTypeOf(Core<MockData>).instance.toHaveProperty('namespace');

		it('should be a getter property of <Core> instance', () => {
			expect(core).toHaveProperty('namespace');
		});

		it('should be a <string> getter property', () => {
			namespace.toEqualTypeOf<Readonly<string>>();
			expect(core.namespace).toBeTypeOf('string');
		});

		it('should equal to the initialized namespace argument', () => {
			expect(core.namespace).toStrictEqual(MOCK_NAMESPACE);
		});
	});

	describe('.bound', () => {
		const bound = expectTypeOf(Core<MockData>).instance.toHaveProperty('bound');

		it('should be a method of <Core> instance', () => {
			expect(core).toHaveProperty('bound');
		});

		it('should be a function', () => {
			bound.toBeFunction();
			expect(core.bound).toBeTypeOf('function');
		});

		it('should accept a <string> as the first argument', () => {
			bound.parameter(0).toBeString();
		});

		it('should accept a <unknown> as the second argument', () => {
			bound.parameter(1).toBeUnknown();
		});

		it('should return an object shape with the bound function mapped', () => {
			bound.returns.toBeObject();
			const fn = vi.fn();
			const result = core.bound('getData', fn);
			expect(result).toHaveProperty('getData');
			expect(result.getData).toBe(fn);
			// expect(injectSpy).toHaveBeenCalledWith('getData', fn);
			// expect(injectSpy).toHaveReturnedWith(expect.objectContaining({ getData: fn }));
		});
	});

	describe('.plug', () => {
		const plug = expectTypeOf(Core<MockData>).instance.toHaveProperty('plug');

		afterEach(() => {
			core['plugins'].clear();
		});

		it('should be a method of <Core> instance', () => {
			expect(core).toHaveProperty('plug');
		});

		it('should be a function', () => {
			plug.toBeFunction();
			expect(core.plug).toBeTypeOf('function');
		});

		it('should accept a concreted instance of <Plugin> interface as the first argument', () => {
			plug.parameter(0).toBeObject();
			plug.parameter(0).toEqualTypeOf<Plugin<MockData>>();
			plug.parameter(0).not.toBeNullable();
		});

		it('should return <void>', () => {
			plug.returns.toBeVoid();
		});

		it('should properly register a plugin and reflect in the core', () => {
			class StubPlugin extends Plugin<MockData> {
				constructor() {
					super('stub-plugin');
				}
			}
			const plugin = new StubPlugin();

			core.plug(plugin);

			expect(core['plugins'].has(plugin.name)).toBeTruthy();
		});

		it('should invoke <Plugin.setup> method with forward <Core> instance', () => {
			class StubPlugin extends Plugin<MockData> {
				constructor() {
					super('stub-plugin');
				}
			}
			const plugin = new StubPlugin();
			const setupSpy = vi.spyOn(plugin, 'setup');

			core.plug(plugin);

			expect(setupSpy).toBeCalledTimes(1);
			expect(setupSpy).toBeCalledWith(core);
		});
	});

	describe('.register', () => {
		const register = expectTypeOf(Core<MockData>).instance.toHaveProperty('register');

		it('should be a method of <Core> instance', () => {
			expect(core).toHaveProperty('register');
		});

		it('should be a function', () => {
			register.toBeFunction();
			expect(core.register).toBeTypeOf('function');
		});

		it('should accept a <string> as the first argument', () => {
			register.parameter(0).toBeString();
		});

		it('should accept a <function> callback as the second argument', () => {
			const callback = register.parameter(1);
			callback.toBeFunction();
			callback.parameters.toEqualTypeOf<[...any[]]>();
			callback.returns.toBeAny();
		});

		it('should return an object shape with specific properties', () => {
			register.returns.toBeObject();
			const result = core.register('customApi', vi.fn());
			expect(result).toMatchObject({ customApi: expect.any(Function) });
		});
	});

	describe('.invoke', () => {
		const invoke = expectTypeOf(Core<MockData>).instance.toHaveProperty('invoke');

		it('should be a method of <Core> instance', () => {
			expect(core).toHaveProperty('invoke');
		});

		it('should be a function', () => {
			invoke.toBeFunction();
			expect(core.invoke).toBeTypeOf('function');
		});

		it('should accept a <string> as the first argument', () => {
			invoke.parameter(0).toBeString();
		});

		it('should accept a <unknown> as the rest argument', () => {
			invoke.parameters.toEqualTypeOf<[string, ...unknown[]]>();
		});

		it('should return <unknown>', () => {
			invoke.returns.toBeUnknown();
		});

		it('should call the invoked function with provided arguments', () => {
			const api = vi.fn().mockReturnValue('my_lowercase_text');
			core.register('customApi', api);
			const result = core.invoke('customApi', 'MY_UPPERCASE_TEXT');
			expect(api).toBeCalledTimes(1);
			expect(api).toBeCalledWith('MY_UPPERCASE_TEXT');
			expect(api).toReturnTimes(1);
			expect(api).toReturnWith('my_lowercase_text');
			expect(result).toStrictEqual('my_lowercase_text');
		});
	});

	describe('.watch', () => {
		const watch = expectTypeOf(Core<MockData>).instance.toHaveProperty('watch');

		it('should be a method of <Core> instance', () => {
			expect(core).toHaveProperty('watch');
		});

		it('should be a function', () => {
			watch.toBeFunction();
			expect(core.watch).toBeTypeOf('function');
		});

		it('should accept a <DataFlow> or <string> as the first argument', () => {
			watch.parameter(0).toEqualTypeOf<DataFlow | string>();
		});

		it('should accept a <function> callback as the second argument', () => {
			const callback = watch.parameter(1);
			callback.toBeFunction();
			callback.parameters.toEqualTypeOf<[...any[]]>();
			callback.returns.toBeAny();
		});

		it('should return an object shape', () => {
			watch.returns.toBeObject();
		});
	});

	describe('.trigger', () => {
		const trigger = expectTypeOf(Core<MockData>).instance.toHaveProperty('trigger');

		it('should be a method of <Core> instance', () => {
			expect(core).toHaveProperty('trigger');
		});

		it('should be a function', () => {
			trigger.toBeFunction();
			expect(core.trigger).toBeTypeOf('function');
		});

		it('should accept a <string> as the first argument', () => {
			trigger.parameter(0).toBeString();
		});

		it('should accept a <unknown> as the rest argument', () => {
			trigger.parameters.toEqualTypeOf<[string, ...unknown[]]>();
		});

		it('should return <void>', () => {
			trigger.returns.toBeVoid();
		});

		it('should invoke the event callback when triggered', () => {
			const listener = vi.fn();
			core.watch('customEvent', listener);
			core.trigger('customEvent', 'mocked_data');
			expect(listener).toBeCalledTimes(1);
			expect(listener).toReturnTimes(1);
			expect(listener).toBeCalledWith('mocked_data');
		});
	});

	describe('.process', () => {
		const process = expectTypeOf(Core<MockData>).instance.toHaveProperty('process');

		it('should be a method of <Core> instance', () => {
			expect(core).toHaveProperty('process');
		});

		it('should be a function', () => {
			process.toBeFunction();
			expect(core.process).toBeTypeOf('function');
		});

		it('should accept a <DataFlow> as the first argument', () => {
			process.parameter(0).toEqualTypeOf<DataFlow>();
		});

		it('should accept a <function> callback as the second argument', () => {
			const callback = process.parameter(1);
			callback.toBeFunction();
			callback.parameter(0).toEqualTypeOf<MockData>();
			callback.returns.toBeUnknown();
		});

		it('should return an object shape <Data> geenric argument', () => {
			process.returns.toBeObject();
			process.returns.toMatchTypeOf<MockData>();
		});

		it('should correctly process data and return the expected result', () => {
			const processed_data = core.process(DataFlow.INPUT, (data) => {
				return { ...data, processed: true };
			});
			expect(processed_data).toMatchObject({ processed: true });
		});

		it('should trigger the <DataFlow> events', () => {
			const on_output1 = vi.fn();
			const on_output2 = vi.fn();
			const on_custom = vi.fn();
			core.watch(DataFlow.OUTPUT, on_output1);
			core.watch(DataFlow.OUTPUT, on_output2);
			core.watch('customEvent', on_custom);
			core.process(DataFlow.OUTPUT, () => mockData);
			expect(on_output1).toBeCalledTimes(1);
			expect(on_output2).toBeCalledTimes(1);
			expect(on_custom).toBeCalledTimes(0);
		});

		it('should setup a plugin', () => {
			const plugin = {
				name: 'plugin#1',
				flow: DataFlow.INPUT,
				setup: vi.fn(),
				process: vi.fn((data: MockData) => data),
			} as unknown as Plugin<MockData>;

			core.plug(plugin);
			expect(plugin.setup).toHaveBeenCalledWith(core);

			core.init(() => mockData);

			const processor = vi.fn((data) => data);
			const result = core.process(DataFlow.INPUT, processor);
			expect(plugin.process).toHaveBeenCalledWith(mockData);
			expect(result).toMatchObject(mockData);
		});
	});

	describe('.init', () => {
		const init = expectTypeOf(Core<MockData>).instance.toHaveProperty('init');

		it('should be a method of <Core> instance', () => {
			expect(core).toHaveProperty('init');
		});

		it('should be a function', () => {
			init.toBeFunction();
			expect(core.init).toBeTypeOf('function');
		});

		it('should accept a <function> initializer as the first argument', () => {
			const initializer = init.parameter(0);
			initializer.toBeFunction();
			initializer.parameter(0).toBeUndefined();
			initializer.returns.toEqualTypeOf<MockData>();
		});

		it('should return an object shape', () => {
			init.returns.toBeObject();
		});

		it('should execute the initializer and return boundaries', () => {
			const retrieveTheme = vi.fn().mockReturnValue(mockData.theme);
			core.bound('retrieveTheme', retrieveTheme);
			const store = core.init(() => mockData);
			expect(core['data']).toMatchObject(mockData);
			expect(store).toHaveProperty('retrieveTheme');
			expect(store.retrieveTheme).toBeTypeOf('function');
			const result = (store as any).retrieveTheme();
			expect(result).toStrictEqual(mockData.theme);
			expect(retrieveTheme).toBeCalledTimes(1);
			expect(retrieveTheme).toReturnTimes(1);
			expect(retrieveTheme).toReturnWith(mockData.theme);
		});
	});
});

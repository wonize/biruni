import * as mod from '@/json/mod';
import json, { JsonParsePlugin, JsonPlugin, JsonStringifyPlugin } from '@/json/mod';
import { Core, DataFlow, type Plugin } from '@biruni/core';
import { MOCK_NAMESPACE, mockData, type MockData } from '@repo/mocks';
import type { MockInstance } from 'vitest';

describe('JsonParsePlugin', () => {
	it('have re-export in <mod.ts>', () => {
		expect(mod).toHaveProperty('JsonParsePlugin');
	});

	it('should type of <JsonParsePlugin> instance to be <Plugin> interface', () => {
		expectTypeOf(JsonParsePlugin<MockData>).instance.toMatchTypeOf<Plugin<MockData>>();
	});

	let instance: Plugin<MockData>;
	beforeEach(() => {
		instance = new JsonParsePlugin();
	});

	it('should be an <OUTPUT> flow plugin', () => {
		expect(instance.flow).toStrictEqual(DataFlow.OUTPUT);
	});

	it('should correctly process stringifed <data> object into parsed <data>', () => {
		expect(instance.process(JSON.stringify(mockData) as any)).toMatchObject(mockData);
	});

	it('should pass through <data> when is typeof object', () => {
		expect(instance.process(mockData)).toMatchObject(mockData);
	});

	it('should parse piped stringified <data> object on <OUTPUT> flow', () => {
		const core = new Core<MockData>(MOCK_NAMESPACE);
		core.plug({
			setup: vi.fn(),
			process: () => JSON.stringify(mockData),
		} as unknown as Plugin<MockData>);
		instance.setup(core);
		core.init(() => mockData);
		const output = core.process(DataFlow.OUTPUT, (data) => data);
		expect(output).toMatchObject(mockData);
	});

	it('should parse piped String wrapped <data> object on <OUTPUT> flow', () => {
		const core = new Core<MockData>(MOCK_NAMESPACE);
		core.plug({
			setup: vi.fn(),
			process: () => String(JSON.stringify(mockData)),
		} as unknown as Plugin<MockData>);
		instance.setup(core);
		core.init(() => mockData);
		const output = core.process(DataFlow.OUTPUT, (data) => data);
		expect(output).toMatchObject(mockData);
	});

	it('should pass through piped non-string <data> on <OUTPUT> flow', () => {
		const core = new Core<MockData>(MOCK_NAMESPACE);
		core.plug({
			setup: vi.fn(),
			process: () => mockData,
		} as unknown as Plugin<MockData>);
		instance.setup(core);
		core.init(() => mockData);
		const output = core.process(DataFlow.OUTPUT, (data) => data);
		expect(output).toMatchObject(mockData);
	});
});

describe('JsonStringifyPlugin', () => {
	it('have re-export in <mod.ts>', () => {
		expect(mod).toHaveProperty('JsonStringifyPlugin');
	});

	it('should type of <JsonStringifyPlugin> instance to be <Plugin> interface', () => {
		expectTypeOf(JsonStringifyPlugin<MockData>).instance.toMatchTypeOf<Plugin<MockData>>();
	});

	let instance: Plugin<MockData>;
	beforeEach(() => {
		instance = new JsonStringifyPlugin();
	});

	it('should be an <INPUT> flow plugin', () => {
		expect(instance.flow).toStrictEqual(DataFlow.INPUT);
	});

	it('should correctly process stringifed <data> object into parsed <data>', () => {
		expect(instance.process(mockData)).toStrictEqual(JSON.stringify(mockData));
	});

	it('should parse piped stringified <data> object on <INPUT> flow', () => {
		const core = new Core<MockData>(MOCK_NAMESPACE);
		core.plug({
			setup: vi.fn(),
			process: () => mockData,
		} as unknown as Plugin<MockData>);
		instance.setup(core);
		core.init(() => mockData);
		const output = core.process(DataFlow.INPUT, (data) => data);
		expect(output).toMatchObject(mockData);
	});
});

describe('JsonPlugin (Collection)', () => {
	it('have re-export in <mod.ts>', () => {
		expect(mod).toHaveProperty('JsonPlugin');
	});

	it('should be a <Plugin> interface', () => {
		expectTypeOf(JsonPlugin<MockData>).instance.toMatchTypeOf<Plugin<MockData>>();
	});

	let core: Core<MockData>;
	let plugSpy: MockInstance;
	beforeAll(() => {
		core = new Core(MOCK_NAMESPACE);
		plugSpy = vi.spyOn(core, 'plug');
		core.plug(new JsonPlugin<MockData>());
	});

	it('should to plug <JsonParsePlugin> to <Core> instance', () => {
		expect(plugSpy).toHaveBeenNthCalledWith(
			2,
			expect.objectContaining(new JsonParsePlugin<MockData>())
		);
	});

	it('should to plug <JsonStringifyPlugin> to <Core> instance', () => {
		expect(plugSpy).toHaveBeenNthCalledWith(
			3,
			expect.objectContaining(new JsonStringifyPlugin<MockData>())
		);
	});
});

describe('json (invoker)', () => {
	it('have re-export in <mod.ts>', () => {
		expect(mod).toHaveProperty('json');
	});

	it('have re-export as <default>', () => {
		expect(mod).toHaveProperty('default');
		expect(mod.default).toBe(mod.json);
	});

	it('should be a <function>', () => {
		expectTypeOf(json).toBeFunction();
		expect(json).toBeTypeOf('function');
	});

	it('should return instance match to <Plugin> interface', () => {
		expectTypeOf(json<MockData>).returns.toMatchTypeOf<Plugin<MockData>>();
	});

	it('should return an instance of <JsonPlugin>', () => {
		expect(json<MockData>()).toBeInstanceOf(JsonPlugin<MockData>);
	});
});

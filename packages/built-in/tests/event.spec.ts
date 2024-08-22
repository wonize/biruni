import { event, EventPlugin } from '@/event/mod';
import Core, { DataFlow, Plugin } from '@biruni/core';
import { MOCK_NAMESPACE, mockData, type MockData } from '@repo/mocks';
import type { MockInstance } from 'vitest';

describe('event', () => {
	it('should be a <function>', () => {
		expectTypeOf(event).toBeFunction();
		expect(event).toBeTypeOf('function');
	});

	it('should have no argument', () => {
		expectTypeOf(event).parameters.toEqualTypeOf<[]>();
	});

	it('should return an instance match to <Plugin> interface', () => {
		expectTypeOf(event<MockData>).returns.toMatchTypeOf<Plugin<MockData>>();
	});

	it('should return an instance match to <EventPlugin> class', () => {
		expectTypeOf(event<MockData>).returns.toEqualTypeOf<EventPlugin<MockData>>();
		expect(event<MockData>()).toBeInstanceOf(EventPlugin<MockData>);
	});
});

describe('EventPlugin', () => {
	let core: Core<MockData, typeof MOCK_NAMESPACE>;
	let boundSpy: MockInstance;
	let watchSpy: MockInstance;
	let instance: Plugin<MockData>;
	let store: any;

	beforeEach(() => {
		core = new Core(MOCK_NAMESPACE);
		instance = new EventPlugin<MockData>();
		boundSpy = vi.spyOn(core, 'bound');
		watchSpy = vi.spyOn(core, 'watch');
		vi.clearAllMocks();
		core.plug(instance);
		store = core.init(vi.fn(() => mockData));
	});

	it('should a class with <Plugin> interface', () => {
		expectTypeOf(EventPlugin<MockData>).instance.toMatchTypeOf<Plugin<MockData>>();
	});

	it('should invoke <Core.bound> around <4> times', () => {
		expect(boundSpy).toHaveBeenCalledTimes(4);
	});

	it('should bound <addListener> to <Core> instance', () => {
		expect(boundSpy).toHaveBeenCalledWith('addListener', expect.any(Function));
	});

	it('should bound <on> to <Core> instance', () => {
		expect(boundSpy).toHaveBeenCalledWith('on', expect.any(Function));
	});

	it('should bound <removeListener> to <Core> instance', () => {
		expect(boundSpy).toHaveBeenCalledWith('removeListener', expect.any(Function));
	});

	it('should bound <off> to <Core> instance', () => {
		expect(boundSpy).toHaveBeenCalledWith('off', expect.any(Function));
	});

	it('should watch <DataFlow.OUTPUT> event', () => {
		expect(watchSpy).toHaveBeenCalledWith(DataFlow.OUTPUT, expect.any(Function));
	});

	it('should watch <DataFlow.INPUT> event', () => {
		expect(watchSpy).toHaveBeenCalledWith(DataFlow.INPUT, expect.any(Function));
	});

	// Ensure to have same reference
	const onOutputMock = vi.fn().mockImplementation(function onOutputMock(data: MockData) {
		expect(data).toMatchObject(mockData);
	});

	it('should trigger on <Core.process> invoke with <DataFlow.OUTPUT>', () => {
		expect.hasAssertions();
		store.on(DataFlow.OUTPUT, onOutputMock);
		core.process(DataFlow.OUTPUT, () => mockData);
	});

	it('should remove <listener> correctly', () => {
		store.off(DataFlow.OUTPUT, onOutputMock);
		core.process(DataFlow.OUTPUT, () => mockData);
		expect(onOutputMock).toBeCalledTimes(0);
	});
});

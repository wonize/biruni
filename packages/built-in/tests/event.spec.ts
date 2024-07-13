import { event, EventEmitterPlugin } from '@/event/mod'
import { diff } from '@biruni/core/listener/diff';
import { BiruniPlugin } from '@biruni/core/plugin'
import { mockData, type MockData } from '@repo/mocks'
import { default as EventEmitter } from 'events';

describe('EventEmitter Plugin', () => {
	it('Verify Signature', () => {
		expect(event).toBeTypeOf('function')
		expect(EventEmitterPlugin).toBeTypeOf('function')
		const plugin = EventEmitterPlugin<MockData>()
		expect(plugin).toHaveProperty('type')
		expect(plugin).toHaveProperty('name')
		expect(plugin).toHaveProperty('preprocess')
		expect(plugin).toHaveProperty('postprocess')
		expectTypeOf(plugin['type']).toEqualTypeOf<BiruniPlugin<MockData>['type']>()
		expectTypeOf(plugin['name']).toBeString()
	})

	it('<preprocess> method should return same object of input', async () => {
		const plugin = EventEmitterPlugin<MockData>();
		const result = await plugin.preprocess(mockData);
		expect(result).toBeTypeOf('object');
		expect(result).toStrictEqual(expect.objectContaining(mockData))
	})

	it('<postprocess> method should return same object of input', async () => {
		const plugin = EventEmitterPlugin<MockData>();
		const result = await plugin.postprocess(mockData);
		expect(result).toBeTypeOf('object');
		expect(result).toStrictEqual(expect.objectContaining(mockData))
	})

	it('<addListener> method should attach <change> event to listener callback function', () => {
		const listener = vi.fn();
		const plugin = EventEmitterPlugin<MockData>();
		const add_listener_spy = vi.spyOn(EventEmitter.prototype, 'addListener');
		plugin.addListener('change', listener);
		expect(add_listener_spy).toBeCalledTimes(1);
		expect(add_listener_spy).toBeCalledWith('change', listener);
	})

	it('<postprocess> method should invoke <listener> callback function', () => {
		const listener = vi.fn();
		const plugin = EventEmitterPlugin<MockData>();
		plugin.addListener('change', listener);
		plugin.postprocess(mockData);
		expect(listener).toBeCalledTimes(1);
		const diff_object = diff({}, mockData);
		expect(listener).toBeCalledWith(expect.objectContaining(diff_object));
	})

	it('<removeListener> method should remove <change> and listener callback function', () => {
		const listener = vi.fn();
		const plugin = EventEmitterPlugin<MockData>();

		const add_listener_spy = vi.spyOn(EventEmitter.prototype, 'addListener');
		plugin.addListener('change', listener);
		expect(add_listener_spy).toBeCalledTimes(1);
		expect(add_listener_spy).toBeCalledWith('change', listener);

		const remove_listener_spy = vi.spyOn(EventEmitter.prototype, 'removeListener');
		plugin.removeListener('change', listener);
		expect(remove_listener_spy).toBeCalledTimes(1);
		expect(remove_listener_spy).toBeCalledWith('change', listener);
	})
})

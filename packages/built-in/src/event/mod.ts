import Core, { Plugin } from '@biruni/core';
import type { DataObject } from '@biruni/core/helpers';
import { DataFlow } from '@biruni/core/mod';
import { default as EventEmitter } from 'events';

export class EventPlugin<Data extends DataObject> extends Plugin<Data> {
	private listeners: EventEmitter;
	public constructor() {
		super('biruni.event');
		this.listeners = new EventEmitter();
	}

	public override setup(core: Core<Data, string>): void {
		super.setup(core);

		core.bound('on', this.add_listener.bind(this));
		core.bound('addListener', this.add_listener.bind(this));
		core.bound('off', this.remove_listener.bind(this));
		core.bound('removeListener', this.remove_listener.bind(this));

		this.attach_listeners = this.attach_listeners.bind(this);
		this.attach_listeners(DataFlow.OUTPUT);
		this.attach_listeners(DataFlow.INPUT);
	}

	private attach_listeners(this: EventPlugin<Data>, flow: DataFlow) {
		function on_output(this: EventPlugin<Data>, data: Data): void {
			this.listeners.emit(flow, data);
		}
		const onOutput = on_output.bind(this);
		this.core.watch(flow, onOutput);
	}

	public add_listener(flow: DataFlow, handler: () => void) {
		this.listeners.addListener(flow, handler);
	}

	public remove_listener(flow: DataFlow, handler: () => void) {
		this.listeners.removeListener(flow, handler);
	}
}

export function event<Data extends DataObject>() {
	return new EventPlugin<Data>();
}

export default event;

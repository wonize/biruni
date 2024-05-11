import type { Event as BiruniEvent } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import type { Add, Remove } from '@biruni/core/listener';
import { diff } from '@biruni/core/listener/diff';
import * as Plugin from '@biruni/core/plugin';
import { default as EventEmitter } from 'events';

class BiruniEventEmitter<Data extends StoreData> extends Plugin.BiruniPlugin<Data> {
	private _event_emitter: EventEmitter;

	override type: Plugin.ContextType = 'synchronizer';
	override name: 'built-in/event-emitter' = 'built-in/event-emitter';

	public constructor() {
		super();
		this._event_emitter = new EventEmitter<BiruniEvent.EventMap>();
	}

	override addListener: Add<Data> = (event, listener) => {
		this._event_emitter.addListener(event, listener);
	};

	override removeListener: Remove<Data> = (event, listener) => {
		this._event_emitter.removeListener(event, listener);
	};

	override postprocess: (data: Data) => Promise<Data> = async (data) => {
		this._event_emitter.emit('change', diff({}, data));
		return data;
	};
}

const event: Plugin.Function = <Data extends StoreData>() => {
	return new BiruniEventEmitter<Data>();
};

export { event as EventEmitterPlugin, event };

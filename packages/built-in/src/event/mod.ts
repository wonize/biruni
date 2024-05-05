import type { Event as BiruniEvent, Plugin } from '@biruni/core';
import type { DataDiff, KeyDiff, StoreData } from '@biruni/core/helpers';
import type { Synchronizer } from '@biruni/core/synchronizer';
import type { ListenerFunction } from '@biruni/core/synchronizer/listener';
import type { Payload } from '@biruni/core/synchronizer/payload';
import { default as EventEmitter } from 'events';

class BiruniEventEmitter<Data extends StoreData> implements Synchronizer<Data> {
	private _event_emitter: EventEmitter;

	public constructor() {
		this._event_emitter = new EventEmitter<BiruniEvent.EventMap>();
	}

	public addListener<
		Event extends BiruniEvent.EventName,
		Keys extends KeyDiff<Data>,
		Diffs extends DataDiff<Data, Keys>
	>(payload: {
		$$event: Event;
		$$listener: ListenerFunction<Data, NoInfer<Event>, Keys, Diffs>;
	}): void {
		this._event_emitter.addListener(payload.$$event, payload.$$listener);
	}

	public removeListener<
		Event extends BiruniEvent.EventName,
		Keys extends KeyDiff<Data>,
		Diffs extends DataDiff<Data, Keys>
	>(payload: {
		$$event: Event;
		$$listener: ListenerFunction<Data, NoInfer<Event>, Keys, Diffs>;
	}): void {
		this._event_emitter.removeListener(payload.$$event, payload.$$listener);
	}

	public emit<
		Event extends BiruniEvent.EventName,
		Keys extends KeyDiff<Data>,
		Diffs extends DataDiff<Data, Keys>
	>(payload: {
		$$event: Event;
		$$payload: Payload<Data, NoInfer<Event>, Keys, Diffs>;
	}): void {
		this._event_emitter.emit(payload.$$event, payload.$$payload);
	}
}

const event = (): Plugin.Function => {
	return function <Data extends StoreData>() {
		const $$instance = new BiruniEventEmitter<Data>();
		return {
			$$type: 'synchronizer',
			$$instance: $$instance,
		}
	}
}

export { event as EventEmitterPlugin, event };

import type { StoreData } from '../helpers/mod.ts';
import type { EventName } from '../synchronizer/event.ts';
import type { ListenerFunction } from '../synchronizer/listener.ts';

interface AddListenerMethods<Data extends StoreData> {
	readonly on: AddListener<Data>;
	readonly addListener: AddListener<Data>;
}

interface AddListener<Data extends StoreData> {
	(event: EventName, listener: ListenerFunction<Data>): void;
}

export type { AddListener, AddListenerMethods };

import type { StoreData } from '../helpers/mod';
import type { EventName } from './event';
import type { ListenerFunction } from './listener';

interface AddListenerMethods<Data extends StoreData> {
	readonly on: AddListener<Data>;
	readonly addListener: AddListener<Data>;
}

interface AddListener<Data extends StoreData> {
	(event: EventName, listener: ListenerFunction<Data>): void;
}

export type { AddListener, AddListenerMethods };

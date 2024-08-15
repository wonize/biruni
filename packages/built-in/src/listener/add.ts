import type { DataObject } from '../../../core/src/helpers/mod';
import type { EventName } from './event';
import type { ListenerFunction } from './listener';

interface AddListenerMethods<Data extends DataObject> {
	readonly on: AddListener<Data>;
	readonly addListener: AddListener<Data>;
}

interface AddListener<Data extends DataObject> {
	(event: EventName, listener: ListenerFunction<Data>): void;
}

export type { AddListener, AddListenerMethods };

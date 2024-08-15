import type { DataObject } from '../../../core/src/helpers/mod';
import type { EventName } from './event';
import type { ListenerFunction } from './listener';

interface RemoveListenerMethods<Data extends DataObject> {
	readonly off: RemoveListener<Data>;
	readonly removeListener: RemoveListener<Data>;
}

interface RemoveListener<Data extends DataObject> {
	(event: EventName, listener: ListenerFunction<Data>): void;
}

export type { RemoveListener, RemoveListenerMethods };

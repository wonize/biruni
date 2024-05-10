import type { StoreData } from '../helpers/mod';
import type { EventName } from '../synchronizer/event';
import type { ListenerFunction } from '../synchronizer/listener';

interface RemoveListenerMethods<Data extends StoreData> {
	readonly off: RemoveListener<Data>;
	readonly removeListener: RemoveListener<Data>;
}

interface RemoveListener<Data extends StoreData> {
	(event: EventName, listener: ListenerFunction<Data>): void;
}

export type { RemoveListener, RemoveListenerMethods };

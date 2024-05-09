import type { StoreData } from '../helpers/mod.ts';
import type { EventName } from '../synchronizer/event.ts';
import type { ListenerFunction } from '../synchronizer/listener.ts';

interface RemoveListenerMethods<Data extends StoreData> {
	readonly off: RemoveListener<Data>;
	readonly removeListener: RemoveListener<Data>;
}

interface RemoveListener<Data extends StoreData> {
	(event: EventName, listener: ListenerFunction<Data>): void;
}

export type { RemoveListener, RemoveListenerMethods };

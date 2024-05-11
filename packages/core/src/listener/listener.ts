import type { StoreData } from '../helpers/mod';
import type { EventName } from './event';
import type { Payload } from './payload';

interface ListenerFunction<Data extends StoreData> {
	<Event extends EventName>(payload: Payload<Event, Data>): void;
}

export type { ListenerFunction };

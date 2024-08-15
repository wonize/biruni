import type { DataObject } from '../../../core/src/helpers/mod';
import type { EventName } from './event';
import type { Payload } from './payload';

interface ListenerFunction<Data extends DataObject> {
	<Event extends EventName>(payload: Payload<Event, Data>): void;
}

export type { ListenerFunction };

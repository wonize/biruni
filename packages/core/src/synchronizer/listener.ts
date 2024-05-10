import type { DataDiff, KeyDiff, StoreData } from '../helpers/mod';
import type { EventName } from './event';
import type { Payload } from './payload';

interface ListenerFunction<Data extends StoreData> {
	<Event extends EventName, Keys extends KeyDiff<Data>, Diffs extends DataDiff<Data, Keys>>(
		payload: Payload<Data, Event, Keys, Diffs>
	): void;
}

export type { ListenerFunction };

import type { DataDiff, KeyDiff, StoreData } from "../helpers/mod";
import type { EventName } from './event';
import type { ListenerFunction } from "./listener";
import type { Payload } from './payload';

export interface Synchronizer<Data extends StoreData> {
	on<Event extends EventName, Keys extends KeyDiff<Data>, Diffs extends DataDiff<Data, Keys>>(payload: {
		$$event: Event,
		$$listener: ListenerFunction<Data, NoInfer<Event>, Keys, Diffs>
	}): void;

	emit<Event extends EventName, Keys extends KeyDiff<Data>, Diffs extends DataDiff<Data, Keys>>(payload: {
		$$event: Event,
		$$payload: Payload<Data, NoInfer<Event>, Keys, Diffs>,
	}
	): void;
}

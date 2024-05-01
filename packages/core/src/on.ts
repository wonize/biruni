import type { DataDiff, KeyDiff, StoreData } from "./helpers/mod";
import type { EventName } from "./synchronizer/event";
import type { Payload } from "./synchronizer/payload";

interface AddEventListener<Data extends StoreData> {
	(event: EventName, listener: ListenerFunction<Data>): void;
}

interface ListenerFunction<Data extends StoreData> {
	<
		Event extends EventName,
		Keys extends KeyDiff<Data>,
		Diffs extends DataDiff<Data, Keys>,
	>(payload: Payload<Data, Event, Keys, Diffs>): void;
}

interface Emit<Data extends StoreData> {
	<
		Event extends EventName,
		Keys extends KeyDiff<Data>,
		Diffs extends DataDiff<Data, Keys>
	>(
		event: Event,
		payload: Payload<Data, NoInfer<Event>, Keys, Diffs>,
	): void;
}

interface Overloads<Data extends StoreData> extends AddEventListener<Data> { }

export type {
	AddEventListener,
	Emit,
	Overloads
};

import type { DataDiff, KeyDiff, StoreData } from "@/helpers";
import type * as Synchronizer from "@/synchronizer";

interface AddListener<Data extends StoreData> {
	(event: Synchronizer.Event, listener: ListenerFunction<Data>): void;
}

interface ListenerFunction<Data extends StoreData> {
	<
		Event extends Synchronizer.Event,
		Keys extends KeyDiff<Data>,
		Diffs extends DataDiff<Data, Keys>
	>(payload: Synchronizer.Payload<Data, Event, Keys, Diffs>): void;
}

interface Overloads<Data extends StoreData> extends AddListener<Data> { }

export type {
	AddListener, Overloads, Emit
};

interface Emit<Data extends StoreData> {
	<
		Event extends Synchronizer.Event,
		Keys extends KeyDiff<Data>,
		Diffs extends DataDiff<Data, Keys>
	>(
		event: Event,
		payload: Synchronizer.Payload<Data, NoInfer<Event>, Keys, Diffs>,
	): void;
}
import type { DataDiff, KeyDiff, StoreData } from "./helpers/mod";
import type { EventName } from "./synchronizer/event";
import type { Payload } from "./synchronizer/payload";

interface ListenerMethod<Data extends StoreData> extends AddListenerMethod<Data>, RemoveListenerMethod<Data> { }

interface AddListenerMethod<Data extends StoreData> {
	readonly on: AddListener<Data>;
	readonly addListener: AddListener<Data>;
}

interface AddListener<Data extends StoreData> {
	(event: EventName, listener: ListenerFunction<Data>): void;
}

interface RemoveListenerMethod<Data extends StoreData> {
	readonly off: RemoveListener<Data>;
	readonly removeListener: RemoveListener<Data>;
}

interface RemoveListener<Data extends StoreData> {
	(event: EventName, listener: ListenerFunction<Data>): void;
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

interface ListenerFunction<Data extends StoreData> {
	<
		Event extends EventName,
		Keys extends KeyDiff<Data>,
		Diffs extends DataDiff<Data, Keys>,
	>(payload: Payload<Data, Event, Keys, Diffs>): void;
}

export type {
	RemoveListener, RemoveListenerMethod,
	AddListener, AddListenerMethod,
	AddListener as Overloads,
	ListenerMethod as Methods,
	ListenerMethod,
	Emit,
};


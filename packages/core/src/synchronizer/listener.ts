import type { DataDiff, KeyDiff, StoreData } from "@/helpers";
import type { EventName } from "./event";
import type { Payload } from "./payload";

export interface ListenerFunction<
	Data extends StoreData,
	Event extends EventName,
	Keys extends KeyDiff<Data>,
	Diffs extends DataDiff<Data, Keys>,

> {
	(payload: Payload<Data, Event, Keys, Diffs>): void;
}
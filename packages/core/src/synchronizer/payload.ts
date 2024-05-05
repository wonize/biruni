import type { DataDiff, KeyDiff, StoreData } from "../helpers/mod";
import type { EventName } from "./event";

export interface Payload<
	Data extends StoreData,
	Event extends EventName,
	Keys extends KeyDiff<Data>,
	Diffs extends DataDiff<Data, Keys>
> {
	event: Event;
	oldData: Data;
	newData: Data;
	diff: Diffs;
	keyDiff: Keys;
	// TODO: persister: typeof Persister<Data>['name'];
}
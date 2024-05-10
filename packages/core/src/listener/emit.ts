import type { DataDiff, KeyDiff, StoreData } from '../helpers/mod.ts';
import type { EventName } from '../synchronizer/event.ts';
import type { Payload } from '../synchronizer/payload.ts';

interface EmitListener<Data extends StoreData> {
	<Event extends EventName, Keys extends KeyDiff<Data>, Diffs extends DataDiff<Data, Keys>>(
		event: Event,
		payload: Payload<Data, NoInfer<Event>, Keys, Diffs>
	): void;
}

export type { EmitListener };

import type { DataDiff, KeyDiff, StoreData } from "@/helpers";

export interface Synchronizer<Data extends StoreData> {
	on<
		Event extends SynchronizerEvent,
		Keys extends KeyDiff<Data>,
		Diffs extends DataDiff<Data, Keys>
	>(payload: {
		$$event: Event,
		$$listener: SynchronizerListenerFunction<Data, NoInfer<Event>, Keys, Diffs>
	}): void;

	emit<
		Event extends SynchronizerEvent,
		Keys extends KeyDiff<Data>,
		Diffs extends DataDiff<Data, Keys>
	>(payload: {
		$$event: Event,
		$$details: SynchronizerPayload<Data, NoInfer<Event>, Keys, Diffs>,
	}): void;
}

export interface SynchronizerPayload<
	Data extends StoreData,
	Event extends SynchronizerEvent,
	Keys extends KeyDiff<Data>,
	Diffs extends DataDiff<Data, Keys>
> {
	oldData: Data;
	newData: Data;
	diff: Diffs;
	keyDiff: Keys;
	event: Event;
	// TODO: persister: typeof Persister<Data>['name'];
	url: URL | string;
}

export type SynchronizerEventCore = 'change' | 'applySet' | 'resolveGet';
export type SynchronizerEventPrefix = 'pre' | 'post';
export type SynchronizerEvent = `${SynchronizerEventPrefix}${Capitalize<SynchronizerEventCore>}`;
export type SynchronizerEventAsMethod = `on${Capitalize<SynchronizerEvent>}`;

export type SynchronizerListenerFunction<
	Data extends StoreData,
	Event extends SynchronizerEvent,
	Keys extends KeyDiff<Data>,
	Diffs extends DataDiff<Data, Keys>
> = (payload: SynchronizerPayload<Data, NoInfer<Event>, Keys, Diffs>) => void;
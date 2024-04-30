import type { StoreData } from "@/helpers";

export interface Synchronizer<Data extends StoreData> {
	emit<
		Namespace extends string,
		Event extends SynchronizerEvent,
		KeyDiff extends Partial<keyof Data>,
		DataDiff extends Partial<Data>
	>(payload: {
		$$event: SynchronizerEvent,
		$$details: SynchronizerPayload<Data, Namespace, Event, KeyDiff, DataDiff>,
	}): Promise<void>;

	on<
		Namespace extends string,
		Event extends SynchronizerEvent,
		KeyDiff extends Partial<keyof Data>,
		DataDiff extends Partial<Data>
	>(payload: {
		$$event: SynchronizerEvent,
		$$listener: SynchronizerListenerFunction<Data, Namespace, Event, KeyDiff, DataDiff>
	}): Promise<void>
}

export interface SynchronizerPayload<
	Data extends StoreData,
	Namespace extends string,
	Event extends SynchronizerEvent,
	KeyDiff extends Partial<keyof Data>,
	DataDiff extends Partial<Data>,
> {
	namespace: Namespace;
	oldData: Data;
	newData: Data;
	diff: DataDiff;
	keyDiff: KeyDiff;
	event: Event;
	// persister: typeof Persister<Data>['name'];
	url: URL | string;
}

export type SynchronizerEventCore = 'change' | 'applySet' | 'resolveGet';
export type SynchronizerEventPrefix = 'pre' | 'post';
export type SynchronizerEvent = `${SynchronizerEventPrefix}${Capitalize<SynchronizerEventCore>}`;
export type SynchronizerEventAsMethod = `on${Capitalize<SynchronizerEvent>}`;

export type SynchronizerListenerFunction<
	Data extends StoreData,
	Namespace extends string,
	Event extends SynchronizerEvent,
	KeyDiff extends Partial<keyof Data>,
	DataDiff extends Partial<Data>
> = (payload: SynchronizerPayload<Data, Namespace, Event, KeyDiff, DataDiff>) => void;
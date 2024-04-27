import type { StoreData } from '../globals';
import type { Persister } from './persister';

export interface PersisterContext<TData extends StoreData> {
	readonly $$type: 'persister';
	$$instance: Persister<TData>;
}

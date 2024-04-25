import type { StoreData } from '../globals';
import type { Persister } from './persister';

export interface PersisterContext<S extends StoreData> {
	readonly $$type: 'persister';
	$$instance: Persister<S>;
}

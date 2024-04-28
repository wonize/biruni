import type { StoreData } from '../helpers';
import type { Persister } from './persister';

export interface PersisterContext<TData extends StoreData> {
	readonly $$type: 'persister';
	$$instance: Persister<TData>;
}

import type { StoreData } from '@/helpers';
import type { Persister } from './interface';

export interface PersisterContext<TData extends StoreData> {
	readonly $$type: 'persister';
	$$instance: Persister<TData>;
}

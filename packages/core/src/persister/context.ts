import type { StoreData } from '@/helpers';
import type { Persister } from './interface';

export interface Context<Data extends StoreData> {
	readonly $$type: 'persister';
	$$instance: Persister<Data>;
}

import type { StoreData } from '@/helpers';
import type { Parser } from './interface';

export interface Context<Data extends StoreData> {
	readonly $$type: 'parser';
	$$instance: Parser<Data>;
}

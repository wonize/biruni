import type { StoreData } from '@/helpers';
import type { Parser } from './interface';

export interface ParserContext<TData extends StoreData> {
	readonly $$type: 'parser';
	$$instance: Parser<TData>;
}

import type { StoreData } from '../helpers';
import type { Parser } from './parser';

export interface ParserContext<TData extends StoreData> {
	readonly $$type: 'parser';
	$$instance: Parser<TData>;
}

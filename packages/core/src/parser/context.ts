import type { StoreData } from '../globals';
import type { Parser } from './parser';

export interface ParserContext<S extends StoreData> {
	readonly $$type: 'parser';
	$$instance: Parser<S>;
}

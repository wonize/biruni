import type { Parser } from './parser';

export interface ParserContext<Value extends object> {
	readonly $$type: 'parser';
	$$instance: Parser<Value>;
}

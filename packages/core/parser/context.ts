import type { Context } from "../context";
import type { Parser } from "./parser";

export interface ParserContext<Value extends object> extends Context<'parser'> {
	readonly $$type: 'parser';
	$$instance: Parser<Value>;
}

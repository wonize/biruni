import type { Context } from "./context";

export interface ParserCore<Value extends object> {
	parse<TValue extends Value>(value: string): TValue;
	stringify<TValue extends Value>(value: TValue): string;
}

export interface ParserContext<Value extends object> extends Context<'parser'> {
	readonly $$type: 'parser';
	$$instance: ParserCore<Value>;
}

import type { ParserContext } from "./parser/mod";
import type { PersisterContext } from "./persister/mod";
import type { ValidatorContext } from "./validator/mod";

export interface Context<K extends Readonly<string>> {
	readonly $$type: K;
}

export type CoreContext<V extends object> =
	| ParserContext<V>
	| PersisterContext<V>
	| ValidatorContext<V>;

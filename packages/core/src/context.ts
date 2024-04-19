import type { ParserContext } from "./parser/mod";
import type { PersisterContext } from "./persister/mod";
import type { ValidatorContext } from "./validator/mod";

export type CoreContext<V extends object> =
	| ParserContext<V>
	| PersisterContext<V>
	| ValidatorContext<V>;

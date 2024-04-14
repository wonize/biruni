import type { ParserContext } from "./parser";
import type { PersistenceContext } from "./persistence";
import type { ValidatorContext } from "./validator";

export interface Context<T extends Readonly<string>> {
	readonly $$type: T;
}

export type CoreContext<T extends object> =
	| PersistenceContext<T>
	| ParserContext<T>
	| ValidatorContext<T>;

import type { ParserContext } from './parser/mod';
import type { PersisterContext } from './persister/mod';
import type { ValidatorContext } from './validator/mod';

export type CoreContext<V extends object> =
	| ParserContext<V>
	| PersisterContext<V>
	| ValidatorContext<V>;

export type { ParserContext, PersisterContext, ValidatorContext };
export type { Parser } from './parser/parser';
export type { Persister } from './persister/persister';
export type { Validator } from './validator/validator';

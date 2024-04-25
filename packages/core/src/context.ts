import type { StoreData } from './globals';
import type { ParserContext } from './parser/context';
import type { PersisterContext } from './persister/context';
import type { ValidatorContext } from './validator/context';

export type CoreContext<S extends StoreData> =
	| ParserContext<S>
	| PersisterContext<S>
	| ValidatorContext<S>;

export type { Parser } from './parser/parser';
export type { Persister } from './persister/persister';
export type { Validator } from './validator/validator';
export type { ParserContext, PersisterContext, ValidatorContext };


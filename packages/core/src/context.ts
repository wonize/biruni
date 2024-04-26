import type { StoreData } from './globals';
import type { ParserContext } from './parser/context';
import type { PersisterContext } from './persister/context';
import type { ValidatorContext } from './validator/context';

export type CoreContext<S extends StoreData> =
	| ParserContext<S>
	| PersisterContext<S>
	| ValidatorContext<S>;

export type {
	ParserContext,
	PersisterContext,
	ValidatorContext
};

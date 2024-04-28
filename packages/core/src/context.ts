import type { StoreData } from './helpers';
import type { ParserContext } from './parser/context';
import type { PersisterContext } from './persister/context';
import type { ValidatorContext } from './validator/context';

export type CoreContext<TData extends StoreData> =
	| ParserContext<TData>
	| PersisterContext<TData>
	| ValidatorContext<TData>;

export type {
	ParserContext,
	PersisterContext,
	ValidatorContext
};

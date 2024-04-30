import type { StoreData } from '@/helpers';
import type { Context as Parser } from '@/parser/context';
import type { Context as Persister } from '@/persister/context';
import type { Context as Synchronizer } from '@/synchronizer/context';
import type { Context as Validator } from '@/validator/context';

export type CoreContext<Data extends StoreData> =
	| Parser<Data>
	| Persister<Data>
	| Validator<Data>
	| Synchronizer<Data>;

export type {
	Parser,
	Persister,
	Synchronizer,
	Validator
};
import type { StoreData } from '../helpers/mod';
import type { AddListener } from '../listener/add';
import type { RemoveListener } from '../listener/remove';
import type { BiruniPlugin } from './function';

export type ContextType = 'parser' | 'persister' | 'validator' | 'synchronizer';

export type CreateContext<
	Data extends StoreData,
	Type extends ContextType,
	Instance extends {
		parser: BiruniPlugin<Data>;
		persister: BiruniPlugin<Data>;
		validator: BiruniPlugin<Data>;
		synchronizer: BiruniPlugin<Data> & {
			addListener: AddListener<Data>;
			removeListener: RemoveListener<Data>;
		};
	}[Type] = {
		parser: BiruniPlugin<Data>;
		persister: BiruniPlugin<Data>;
		validator: BiruniPlugin<Data>;
		synchronizer: BiruniPlugin<Data> & {
			addListener: AddListener<Data>;
			removeListener: RemoveListener<Data>;
		};
	}[Type],
> = {
	[P in keyof Instance]: Instance[P];
};

export type Parser<Data extends StoreData> = CreateContext<Data, 'parser'>;
export type Persister<Data extends StoreData> = CreateContext<Data, 'persister'>;
export type Validator<Data extends StoreData> = CreateContext<Data, 'validator'>;
export type Synchronizer<Data extends StoreData> = CreateContext<Data, 'synchronizer'>;
export type Core<Data extends StoreData> =
	| Parser<Data>
	| Persister<Data>
	| Validator<Data>
	| Synchronizer<Data>;

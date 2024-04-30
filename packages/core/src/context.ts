import type { StoreData } from '@/helpers';
import type { Parser as ParserInterface } from '@/parser';
import type { Persister as PersisterInterface } from '@/persister';
import type { Synchronizer as SynchronizerInterface } from '@/synchronizer';
import type { Validator as ValidatorInterface } from '@/validator';

export type ContextType =
	| 'parser'
	| 'persister'
	| 'validator'
	| 'synchronizer';

export interface CreateContext<
	Data extends StoreData,
	Type extends ContextType,
	Instance extends {
		'parser': ParserInterface<Data>,
		'persister': PersisterInterface<Data>,
		'validator': ValidatorInterface<Data>,
		'synchronizer': SynchronizerInterface<Data>,
	}[Type] = {
		'parser': ParserInterface<Data>,
		'persister': PersisterInterface<Data>,
		'validator': ValidatorInterface<Data>,
		'synchronizer': SynchronizerInterface<Data>,
	}[Type]
> {
	readonly $$type: Type;
	readonly $$instance: Instance;
}

export type Parser<Data extends StoreData> = CreateContext<Data, 'parser'>;
export type Persister<Data extends StoreData> = CreateContext<Data, 'persister'>;
export type Validator<Data extends StoreData> = CreateContext<Data, 'validator'>;
export type Synchronizer<Data extends StoreData> = CreateContext<Data, 'synchronizer'>;
export type Context<Data extends StoreData> =
	| Parser<Data>
	| Persister<Data>
	| Validator<Data>
	| Synchronizer<Data>;
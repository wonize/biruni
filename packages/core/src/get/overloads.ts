import type { StoreData } from '../helpers/mod.ts';

import type { KeyMapper } from './by-key-mapper.ts';
import type { SingleKey } from './by-key-value.ts';
import type { KeyList } from './by-keylist.ts';
import type { Mapper } from './by-mapper.ts';
import type { TruthyKeys } from './by-truthy-object.ts';
import type { WholeData } from './get-whole.ts';

interface Overloads<Data extends StoreData> extends
	WholeData<Data>,
	Mapper<Data>,
	SingleKey<Data>,
	KeyMapper<Data>,
	TruthyKeys<Data>,
	KeyList<Data> { }

export type { Overloads };

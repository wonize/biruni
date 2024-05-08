import type { StoreData } from '../helpers/mod.ts';

import type { ByEntire } from './by-entire.ts';
import type { ByKeyMapper } from './by-key-mapper.ts';
import type { ByKey } from './by-key-value.ts';
import type { ByKeys } from './by-keys.ts';
import type { ByMapper } from './by-mapper.ts';
import type { ByTruthy } from './by-truthy.ts';

interface Overloads<Data extends StoreData>
	extends ByEntire<Data>,
		ByMapper<Data>,
		ByKey<Data>,
		ByKeyMapper<Data>,
		ByTruthy<Data>,
		ByKeys<Data> {}

export type { Overloads };

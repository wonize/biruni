import type { StoreData } from '../helpers/mod.ts';

import type { GetByEntire } from './by-entire.ts';
import type { GetByKeyMapper } from './by-key-mapper.ts';
import type { GetByKey } from './by-key-value.ts';
import type { GetByKeys } from './by-keys.ts';
import type { GetByMapper } from './by-mapper.ts';
import type { GetByTruthy } from './by-truthy.ts';

interface GetOverloads<Data extends StoreData>
	extends GetByEntire<Data>,
		GetByMapper<Data>,
		GetByKey<Data>,
		GetByKeyMapper<Data>,
		GetByTruthy<Data>,
		GetByKeys<Data> {}

export type { GetOverloads };

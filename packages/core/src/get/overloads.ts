import type { StoreData } from '../helpers/mod';

import type { GetByEntire } from './by-entire';
import type { GetByKeyMapper } from './by-key-mapper';
import type { GetByKey } from './by-key-value';
import type { GetByKeys } from './by-keys';
import type { GetByMapper } from './by-mapper';
import type { GetByTruthy } from './by-truthy';

interface GetOverloads<Data extends StoreData>
	extends GetByEntire<Data>,
		GetByMapper<Data>,
		GetByKey<Data>,
		GetByKeyMapper<Data>,
		GetByTruthy<Data>,
		GetByKeys<Data> {}

export type { GetOverloads };

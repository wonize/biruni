import type { StoreData } from '../helpers/type-utility.ts';
import type { GetByEntire } from './by-entire.ts';
import type { GetByKeyMapper } from './by-key-mapper.ts';
import type { GetByKey } from './by-key-value.ts';
import type { GetByKeys } from './by-keys.ts';
import type { GetByMapper } from './by-mapper.ts';
import type { GetByTruthy } from './by-truthy.ts';
import type { GetOverloads } from './overloads.ts';

export interface GetInterface<Data extends StoreData> {
	get: GetOverloads<Data>;
	getByEntire: GetByEntire<Data>;
	getByKey: GetByKey<Data>;
	getByKeyMapper: GetByKeyMapper<Data>;
	getByKeys: GetByKeys<Data>;
	getByMapper: GetByMapper<Data>;
	getByTruthy: GetByTruthy<Data>;
}

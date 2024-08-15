import type { StoreData } from '../helpers/type-utility';
import type { GetByEntire } from './by-entire';
import type { GetByKeyMapper } from './by-key-mapper';
import type { GetByKey } from './by-key-value';
import type { GetByKeys } from './by-keys';
import type { GetByMapper } from './by-mapper';
import type { GetByTruthy } from './by-truthy';
import type { GetOverloads } from './overloads';

export interface GetInterface<Data extends StoreData> {
	get: GetOverloads<Data>;
	getByEntire: GetByEntire<Data>;
	getByKey: GetByKey<Data>;
	getByKeyMapper: GetByKeyMapper<Data>;
	getByKeys: GetByKeys<Data>;
	getByMapper: GetByMapper<Data>;
	getByTruthy: GetByTruthy<Data>;
}

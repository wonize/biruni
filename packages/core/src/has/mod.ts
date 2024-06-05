import { hasProperty } from 'dot-prop';
import type * as Path from '../helpers/path-key';
import type { StoreData } from '../helpers/type-utility';

function hasOwnPropertyPath<Data extends StoreData, PathKey extends Path.From<Data>>(
	data: Data,
	path: PathKey
): boolean {
	return hasProperty(data, path as unknown as string);
}

interface HasOwnPropertyPath<Data extends StoreData> {
	<PathKey extends Path.From<Data>>(path: PathKey): boolean;
}

export { hasOwnPropertyPath };
export type { HasOwnPropertyPath };
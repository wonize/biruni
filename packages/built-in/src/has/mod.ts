import type { DataObject } from '@biruni/core/helpers/type-utility';
import { hasProperty } from 'dot-prop';
import type { Path } from '../path/mod';

function hasOwnPropertyPath<
	Data extends DataObject,
	PathKey extends Path.From<Data> = Path.From<Data>,
>(data: Data, path: PathKey): boolean {
	if (typeof data !== 'object' || data === null) {
		throw 'Error';
	}

	return hasProperty(data, path as unknown as string);
}

interface HasOwnPropertyPath<Data extends DataObject> {
	<PathKey extends Path.From<Data>>(path: PathKey): boolean;
}

export { hasOwnPropertyPath };
export type { HasOwnPropertyPath };

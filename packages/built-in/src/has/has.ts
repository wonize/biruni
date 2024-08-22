import type { DataObject } from '@biruni/core/helpers/type-utility';
import { hasProperty } from 'dot-prop';
import type { Path } from '../path/mod';

class BaseTypeError extends TypeError {
	public constructor(base: unknown) {
		super();
		const baseActualType = (base === null ? 'null' : typeof base).toUpperCase();
		super.message = `The <${baseActualType}> is not shape of an <Object>!`;
		super.name = BaseTypeError.name;
	}
}

function hasOwnPropertyPath<
	Data extends DataObject,
	PathKey extends Path.From<Data> = Path.From<Data>,
>(data: Data, path: PathKey): boolean {
	if (typeof data !== 'object' || data === null) {
		throw new BaseTypeError(data);
	}

	return hasProperty(data, path as unknown as string);
}

interface HasOwnPropertyPath<Data extends DataObject> {
	<PathKey extends Path.From<Data>>(path: PathKey): boolean;
}

export { hasOwnPropertyPath };
export type { HasOwnPropertyPath };

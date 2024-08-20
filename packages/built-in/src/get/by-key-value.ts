import type { DataObject } from '@biruni/core/helpers/mod';
import { getProperty } from 'dot-prop';
import type { Path } from '../path/mod';

interface GetByKey<Data extends DataObject> {
	<Key extends Path.From<Data>>(key: Key): GetByKeyReturnType<Data, Key>;
}

type GetByKeyReturnType<Data extends DataObject, Key extends Path.From<Data>> = Path.At<Data, Key>;

const isKeyOfData = <Data extends DataObject>(input: unknown): input is Path.From<Data> => {
	return typeof input === 'string' || input instanceof String;
};

const isByKey = <Data extends DataObject>(
	input: Data | unknown
): input is undefined | never | null => {
	return typeof input === 'undefined' || input === null || Boolean(input) === false;
};

function getByKey<Data extends DataObject, Key extends Path.From<Data> = Path.From<Data>>(
	data: Data,
	key: Key
): Path.At<Data, Key> | undefined {
	let temp_base = data;
	if (typeof data !== 'object' || data === null) {
		temp_base = Object.create({});
	}
	return getProperty(temp_base, key.toString());
}

export { getByKey, isByKey, isKeyOfData };
export type { GetByKey, GetByKeyReturnType };

import type { DeepPartial } from '@biruni/core/helpers/deep-partial';
import type { DataObject } from '@biruni/core/helpers/mod';
import { hasProperty, setProperty } from 'dot-prop';
import clone from 'lodash.clonedeep';
import type { Path } from '../path/mod';
import { setByPair } from './by-pair';

interface SetByKeyValue<Data extends DataObject> {
	<Key extends Path.From<Data>, Value extends Path.At<Data, Key>>(
		key: Key,
		value: DeepPartial<Value>
	): void;
}

const isKeyOfData = <Data extends DataObject>(input: unknown): input is Path.From<Data> => {
	return typeof input === 'string' || input instanceof String;
};

const isByKeyValue = <Data extends DataObject>(
	input: unknown
): input is Path.At<Data, Path.From<Data>> => {
	return true;
};

function setByKeyValue<
	Data extends DataObject,
	Key extends Path.From<Data> = Path.From<Data>,
	Value extends Path.At<Data, Key> = Path.At<Data, Key>,
>(data: Data, key: Key, value: DeepPartial<Value>): Data {
	let temp_base = data;

	if (typeof data !== 'object' && data !== null) {
		temp_base = Object.create({});
	}

	if (typeof key !== 'string') {
		throw 'Error';
	}

	const cloned_base = clone(temp_base);

	if (typeof data === 'object' && hasProperty(cloned_base, key.toString()) === false) {
		return cloned_base;
	}

	const merge_pair = setProperty({}, key.toString(), value) as DeepPartial<Data>;
	return setByPair(cloned_base, merge_pair);
}

export { isByKeyValue, isKeyOfData, setByKeyValue };
export type { SetByKeyValue };

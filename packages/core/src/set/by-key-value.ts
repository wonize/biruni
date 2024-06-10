import { deepKeys, getProperty, setProperty } from 'dot-prop';
import { clone, type StoreData } from '../helpers/mod';
import type { Path } from '../path/mod';

interface SetByKeyValue<Data extends StoreData> {
	<Key extends Path.From<Data>, Value extends Path.At<Data, Key>>(
		key: Key,
		value: Value
	): Promise<void>;
}

const isKeyOfData = <Data extends StoreData>(
	input: unknown
): input is keyof Data | Path.From<Data> => {
	return typeof input === 'string';
};

const isByKeyValue = <Data extends StoreData>(
	input: unknown
): input is Data[keyof Data] | Path.At<Data, Path.From<Data>> => {
	return true;
};

function setByKeyValue<
	Data extends StoreData,
	Key extends Path.From<Data> = Path.From<Data>,
	Value extends Path.At<Data, Key> = Path.At<Data, Key>,
>(data: Data, key: Key, value: Value): Data {
	if (typeof data !== 'object' && typeof data !== null) {
		throw 'Error';
	}
	if (typeof key !== 'string') {
		throw 'Error';
	}

	const clonedInputData = clone(data);

	if (typeof value !== 'object') {
		return setProperty(clonedInputData, key.toString(), value);
	}

	const previous_nested_value = getProperty(data, key.toString());

	if (previous_nested_value === null || typeof previous_nested_value === 'undefined') {
		throw 'Error';
	}

	let new_nested_value = clone(previous_nested_value);
	for (const keyof_new_value of deepKeys(value)) {
		const valueof_new_value = clone(getProperty(value, keyof_new_value)!);
		new_nested_value = setProperty(previous_nested_value, keyof_new_value, valueof_new_value);
	}
	return setProperty(clonedInputData, key.toString(), new_nested_value);
}

export { isByKeyValue, isKeyOfData, setByKeyValue };
export type { SetByKeyValue };

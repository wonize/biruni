import { deepKeys, getProperty, hasProperty, setProperty } from 'dot-prop';
import { clone, type StoreData } from '../helpers/mod';
import type { Path } from '../path/mod';

interface SetByKeySetter<Data extends StoreData> {
	<Key extends Path.From<Data>, Setter extends SetByKeySetterFunction<Path.At<Data, Key>, Data>>(
		key: Key,
		setter: Setter
	): Promise<void>;
}

interface SetByKeySetterFunction<
	Value extends Path.At<Data, Path.From<Data>>,
	Data extends StoreData = StoreData,
> {
	(value: Readonly<Value>): Partial<Value>;
}

const isByKeySetter = <Data extends StoreData>(
	input: unknown
): input is SetByKeySetterFunction<Path.At<Data, Path.From<Data>>, Data> => {
	return typeof input === 'function';
};

function setByKeySetter<
	Data extends StoreData,
	Key extends Path.From<Data> = Path.From<Data>,
	Setter extends SetByKeySetterFunction<Path.At<Data, Key>, Data> = SetByKeySetterFunction<Path.At<Data, Key>, Data>,
>(data: Data, key: Key, setter: Setter): Data {
	if (typeof data !== 'object' && typeof data !== null) {
		throw 'Error';
	}
	if (typeof key !== 'string') {
		throw 'Error';
	}
	if (typeof setter !== 'function') {
		throw 'Error';
	}

	const clonedInputData = clone(data);

	if (hasProperty(clonedInputData, key.toString()) === false) {
		return clonedInputData;
	}

	const previous_nested_value = getProperty(clonedInputData, key.toString())!;
	const new_nested_value = setter(previous_nested_value);

	if (typeof new_nested_value === 'undefined' || new_nested_value === null) {
		return clonedInputData;
	}

	if (typeof previous_nested_value !== 'object') {
		return setProperty(clonedInputData, key.toString(), new_nested_value);
	}

	let newest_nested_value = clone(previous_nested_value);
	for (const keyof_new_value of deepKeys(new_nested_value)) {
		const valueof_new_value = getProperty(new_nested_value, keyof_new_value);
		newest_nested_value = setProperty(newest_nested_value, keyof_new_value, valueof_new_value);
	}

	return setProperty(clonedInputData, key.toString(), newest_nested_value);
}

export { isByKeySetter, setByKeySetter };
export type { SetByKeySetter, SetByKeySetterFunction };

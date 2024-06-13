import { getProperty, setProperty } from 'dot-prop';
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
	(value: Readonly<Value>): Value;
}

const isByKeySetter = <Data extends StoreData>(
	input: unknown
): input is SetByKeySetterFunction<Path.At<Data, Path.From<Data>>, Data> => {
	return typeof input === 'function';
};

function setByKeySetter<
	Data extends StoreData,
	Key extends Path.From<Data>,
	Setter extends SetByKeySetterFunction<Path.At<Data, Key>, Data>,
>(data: Data, key: Key, setter: Setter): Data {
	const clonedInputData = clone(data);

	// FIXME: what if path is not exists in base data?
	const value = getProperty(clonedInputData, key.toString());

	// @ts-expect-error not planned to support non-exists path
	const outputData = setProperty(clonedInputData, key.toString(), setter(value));
	return outputData;
}

export { isByKeySetter, setByKeySetter };
export type { SetByKeySetter, SetByKeySetterFunction };

import { clone, type StoreData } from '../helpers/mod.ts';

interface SetByKeySetter<Data extends StoreData> {
	<Key extends keyof Data, Setter extends SetByKeySetterFunction<Data[Key], Data>>(
		key: Key,
		setter: Setter
	): Promise<void>;
}

interface SetByKeySetterFunction<
	Value extends Data[keyof Data],
	Data extends StoreData = StoreData,
> {
	(value: Readonly<Value>): Value;
}

const isByKeySetter = <Data extends StoreData>(
	input: unknown
): input is SetByKeySetterFunction<Data[keyof Data], Data> => {
	return typeof input === 'function';
};

function setByKeySetter<
	Data extends StoreData,
	Key extends keyof Data,
	Setter extends SetByKeySetterFunction<Data[Key], Data>,
>(data: Data, key: Key, setter: Setter): Data {
	const clonedInputData = clone(data);
	const value = clonedInputData[key];
	const outputData = Object.assign({}, clonedInputData, { [key]: setter(value) });
	return outputData;
}

export { isByKeySetter, setByKeySetter };
export type { SetByKeySetter, SetByKeySetterFunction };

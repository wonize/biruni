import { clone, type StoreData } from '../helpers/mod.ts';

interface SetByKeyValue<Data extends StoreData> {
	<Key extends keyof Data, Value extends Data[Key]>(key: Key, value: Value): Promise<void>;
}

const isKeyOfData = <Data extends StoreData>(input: unknown): input is keyof Data => {
	return typeof input === 'string';
};

const isByKeyValue = <Data extends StoreData>(input: unknown): input is Data[keyof Data] => {
	return true;
};

function setByKeyValue<Data extends StoreData, Key extends keyof Data, Value extends Data[Key]>(
	data: Data,
	key: Key,
	value: Value
): Data {
	const clonedInputData = clone(data);
	const outputData = Object.assign({}, clonedInputData, { [key]: value });
	return outputData;
}

export { isByKeyValue, isKeyOfData, setByKeyValue };
export type { SetByKeyValue };

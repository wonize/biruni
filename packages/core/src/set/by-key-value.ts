import type { StoreData } from '../helpers/mod.ts';

interface KeyValue<Data extends StoreData> {
	<Key extends keyof Data, Value extends Data[Key]>(key: Key, value: Value): Promise<void>;
}

const isKeyOfData = <Data extends StoreData>(input: unknown): input is keyof Data => {
	return typeof input === 'string';
}

const isKeyValue = <Data extends StoreData>(input: unknown): input is Data[keyof Data] => {
	return true;
}

export {
	isKeyOfData,
	isKeyValue,
	type KeyValue
};

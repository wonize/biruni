import type { StoreData } from '../helpers/mod.ts';

interface KeySetter<Data extends StoreData> {
	<Key extends keyof Data, Value extends Data[Key]>(key: Key, setter: KeySetterFunction<Value, Data>): Promise<void>;
}

interface KeySetterFunction<Value extends Data[keyof Data], Data extends StoreData> {
	(value: Readonly<Value> | never): Value;
}

const isKeySetter = <Data extends StoreData>(input: unknown): input is KeySetterFunction<Data[keyof Data], Data> => {
	return typeof input === 'function';
}

export {
	isKeySetter,
	type KeySetter,
	type KeySetterFunction
};

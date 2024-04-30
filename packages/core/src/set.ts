import type { StoreData } from "@/helpers";

interface PartialData<Data extends StoreData> {
	(data: Partial<Data>): Promise<void>;
}

interface KeyValue<Data extends StoreData> {
	<Key extends keyof Data, Value extends Data[Key]>(key: Key, value: Value): Promise<void>;
}

interface KeySetter<Data extends StoreData> {
	<Key extends keyof Data, Value extends Data[Key]>(key: Key, setter: KeySetterFunction<Value, Data>): Promise<void>;
}

interface KeySetterFunction<Value extends Data[keyof Data], Data extends StoreData> {
	(value: Readonly<Value> | never): Value;
}

interface Setter<Data extends StoreData> {
	(setter: SetterFunction<Data>): Promise<void>;
}

interface SetterFunction<Data extends StoreData> {
	(data: Readonly<Data> | never): Partial<Data>;
}

interface Overloads<Data extends StoreData> extends
	PartialData<Data>,
	KeyValue<Data>,
	KeySetter<Data>,
	Setter<Data> { }

const isPartialData = <Data extends StoreData>(input: unknown): input is Partial<Data> => {
	return typeof input === 'object' && input !== null;
}

const isKeyOfData = <Data extends StoreData>(input: unknown): input is keyof Data => {
	return typeof input === 'string';
}

const isKeyValue = <Data extends StoreData>(input: unknown): input is Data[keyof Data] => {
	return true;
}

const isKeySetter = <Data extends StoreData>(input: unknown): input is KeySetterFunction<Data[keyof Data], Data> => {
	return typeof input === 'function';
}

const isSetter = <Data extends StoreData>(input: unknown): input is SetterFunction<Data> => {
	return typeof input === 'function';
}

export {
	isKeyOfData,
	isKeySetter,
	isKeyValue,
	isPartialData,
	isSetter
};

export type {
	KeySetter,
	KeyValue,
	Overloads,
	PartialData,
	Setter
};
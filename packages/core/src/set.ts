import type { StoreData } from "./helpers";

interface PartialData<Data extends StoreData> {
	(data: Partial<Data>): Promise<void>;
}

interface KeyValue<Data extends StoreData> {
	<Key extends keyof Data, Value extends Data[Key]>(key: Key, value: Value): Promise<void>;
}

interface KeyMapper<Data extends StoreData> {
	<Key extends keyof Data, Value extends Data[Key]>(key: Key, mapper: KeyMapperFunction<Value>): Promise<void>;
}

interface KeyMapperFunction<Value extends unknown> {
	(value: Readonly<Value> | never): Value;
}

interface Mapper<Data extends StoreData> {
	(mapper: MapperFunction<Data>): Promise<void>;
}

interface MapperFunction<Data extends StoreData> {
	(data: Readonly<Data> | never): Partial<Data>;
}

interface Overloads<Data extends StoreData> extends
	PartialData<Data>,
	KeyValue<Data>,
	KeyMapper<Data>,
	Mapper<Data> { }

const isPartialData = <Data extends StoreData>(input: unknown): input is Partial<Data> => {
	return typeof input === 'object' && input !== null;
}

const isKeyOfData = <Data extends StoreData>(input: unknown): input is keyof Data => {
	return typeof input === 'string';
}

const isKeyMapper = <Data extends StoreData>(input: unknown): input is KeyMapperFunction<Data> => {
	return typeof input === 'function';
}

const isMapper = <Data extends StoreData>(input: unknown): input is MapperFunction<Data> => {
	return typeof input === 'function';
}

export {
	isKeyMapper,
	isKeyOfData,
	isMapper,
	isPartialData
};

export type {
	KeyMapper,
	KeyValue,
	Mapper,
	Overloads,
	PartialData
};
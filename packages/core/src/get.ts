import type { RemoveNever, StoreData } from './helpers';

interface WholeData<Data extends StoreData> {
	(): Promise<
		Readonly<Data>
	>;
}

interface SingleKey<Data extends StoreData> {
	<Key extends keyof Data>(key: Key): Promise<
		Data[Key]
	>;
}

interface KeyMapper<Data extends StoreData> {
	<Key extends keyof Data, Mapper extends SingleKeyMapperFunction<Data, Key>>(key: Key, mapper: Mapper): Promise<
		ReturnType<Mapper>
	>;
}

interface SingleKeyMapperFunction<Data extends StoreData, Key extends keyof Data> {
	(data: Data[Key] | never): Data[Key] | unknown;
}

interface Mapper<Data extends StoreData> {
	<Mapper extends MapperFunction<Data>>(mapper: Mapper): Promise<
		ReturnType<Mapper>
	>;
}

interface MapperFunction<Data extends StoreData> {
	(data: Readonly<Data> | never): Data | unknown;
}

interface TruthyKeys<Data extends StoreData> {
	<KeyObject extends Partial<Record<keyof Data, boolean>>>(keys: KeyObject): Promise<
		Readonly<
			RemoveNever<{
				[SelectedKey in keyof KeyObject]:
				KeyObject[SelectedKey] extends false
				? never
				// @ts-ignore
				: Data[string & SelectedKey]
			}>
		>
	>
}

interface KeyList<Data extends StoreData> {
	<KeyList extends Array<keyof Data>>(keys: Partial<KeyList>): Promise<
		Readonly<{
			[SelectedKey in KeyList[number]]: Data[SelectedKey]
		}>
	>;
}

interface Overloads<Data extends StoreData> extends
	WholeData<Data>,
	Mapper<Data>,
	SingleKey<Data>,
	KeyMapper<Data>,
	TruthyKeys<Data>,
	KeyList<Data> { }

export type {
	KeyList,
	KeyMapper,
	Mapper,
	Overloads,
	SingleKey,
	TruthyKeys,
	WholeData
};


const isWholeData = <Data extends StoreData>(input: unknown): input is (undefined | never | null | void) => {
	return typeof input === 'undefined' || input === null || Boolean(input) === false;
}

const isKeyOfData = <Data extends StoreData>(input: unknown): input is keyof Data => {
	return typeof input === 'string';
}

const isSingleKeyMapper = <Data extends StoreData>(input: unknown): input is SingleKeyMapperFunction<Data, keyof Data> => {
	return typeof input === 'function';
}

const isSingleKey = <Data extends StoreData>(input: unknown): input is (undefined | never | null | void) => {
	return typeof input === 'undefined' || input === null || Boolean(input) === false;
}

const isMapper = <Data extends StoreData>(input: unknown): input is MapperFunction<Data> => {
	return typeof input === 'function';
}

const isKeyList = <Data extends StoreData>(input: unknown): input is Partial<Array<keyof Data>> => {
	return typeof input === 'object' && input !== null && ((input instanceof Array) || (Array.isArray(input)));
}

const isTruthyKeys = <Data extends StoreData>(input: unknown): input is Partial<Record<keyof Data, boolean>> => {
	return typeof input === 'object' && input !== null;
}

export {
	isKeyList,
	isKeyOfData,
	isMapper,
	isSingleKey,
	isSingleKeyMapper,
	isTruthyKeys,
	isWholeData
};
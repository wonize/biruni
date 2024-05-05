import type { ToFlatKey, ValueOfFlatKey } from './helpers/flatten-key';
import type { RemoveNever, StoreData } from './helpers/mod';

interface WholeData<Data extends StoreData> {
	(): Promise<
		WholeDataReturnType<Data>
	>;
}
type WholeDataReturnType<Data extends StoreData> = Readonly<Data>;

interface SingleKey<Data extends StoreData> {
	<Key extends keyof Data>(key: Key): Promise<
		SingleKeyReturnType<Data, Key>
	>;
}
type SingleKeyReturnType<Data extends StoreData, Key extends keyof Data> = Data[Key];

interface SingleNestedKey<Data extends StoreData> {
	<Key extends ToFlatKey<Data>>(key: Key): Promise<
		// @ts-expect-error the Key is actuall keyof Data
		ValueOfFlatKey<Data, NoInfer<Key>>
	>;
}

interface KeyMapper<Data extends StoreData> {
	<Key extends keyof Data, Mapper extends SingleKeyMapperFunction<Data, Key>>(key: Key, mapper: Mapper): Promise<
		KeyMapperReturnType<Data, Key, Mapper>
	>;
}
interface SingleKeyMapperFunction<Data extends StoreData, Key extends keyof Data> {
	(data: Data[Key] | never): Data[Key] | unknown;
}
type KeyMapperReturnType<Data extends StoreData, Key extends keyof Data, Mapper extends SingleKeyMapperFunction<Data, Key>> = ReturnType<Mapper> | Data[Key] | unknown;

interface Mapper<Data extends StoreData> {
	<Mapper extends MapperFunction<Data>>(mapper: Mapper): Promise<MapperReturnType<Data, Mapper>>;
}
interface MapperFunction<Data extends StoreData> {
	(data: Readonly<Data> | never): Data | unknown;
}
type MapperReturnType<Data extends StoreData, Mapper extends MapperFunction<Data>> = ReturnType<Mapper> | Data | unknown;

interface TruthyKeys<Data extends StoreData> {
	<KeyObject extends Record<keyof Data, boolean>>(keys: Partial<KeyObject>): Promise<
		TruthyKeysReturnType<Data, KeyObject>
	>;
}
type TruthyKeysReturnType<Data extends StoreData, KeyObject extends Partial<Record<keyof Data, boolean>>> = Readonly<
	RemoveNever<{
		[SelectedKey in keyof KeyObject]:
		KeyObject[SelectedKey] extends false
		? never
		// @ts-ignore
		: Data[string & SelectedKey]
	}>
>;

interface KeyList<Data extends StoreData> {
	<KeyList extends Array<keyof Data>>(keys: Partial<KeyList>): Promise<KeyListReturnType<Data, KeyList>>;
}
type KeyListReturnType<Data extends StoreData, KeyList extends Partial<Array<keyof Data>>> = Readonly<{
	[SelectedKey in KeyList extends Partial<Array<infer Key>> ? Key : never]: Data[SelectedKey]
}>;

interface Overloads<Data extends StoreData> extends
	WholeData<Data>,
	Mapper<Data>,
	SingleKey<Data>,
	SingleNestedKey<Data>,
	KeyMapper<Data>,
	TruthyKeys<Data>,
	KeyList<Data> { }

export type {
	KeyList, KeyListReturnType, KeyMapper, KeyMapperReturnType, Mapper, MapperReturnType, Overloads,
	SingleKey, SingleKeyReturnType, TruthyKeys, TruthyKeysReturnType, WholeData, WholeDataReturnType
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

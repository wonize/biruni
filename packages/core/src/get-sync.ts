import type { RemoveNever, StoreData } from './helpers/mod';

interface WholeData<Data extends StoreData> {
	(): WholeDataReturnType<Data>;
}
type WholeDataReturnType<Data extends StoreData> = Readonly<Data>;

interface SingleKey<Data extends StoreData> {
	<Key extends keyof Data>(key: Key): SingleKeyReturnType<Data, Key>;
}
type SingleKeyReturnType<Data extends StoreData, Key extends keyof Data> = Data[Key];

interface KeyMapper<Data extends StoreData> {
	<Key extends keyof Data, Mapper extends SingleKeyMapperFunction<Data, Key>>(
		key: Key,
		mapper: Mapper
	): KeyMapperReturnType<Data, Key, Mapper>;
}
interface SingleKeyMapperFunction<Data extends StoreData, Key extends keyof Data> {
	(data: Data[Key] | never): Data[Key] | unknown;
}
type KeyMapperReturnType<
	Data extends StoreData,
	Key extends keyof Data,
	Mapper extends SingleKeyMapperFunction<Data, Key>,
> = ReturnType<Mapper> | Data[Key] | unknown;

interface Mapper<Data extends StoreData> {
	<Mapper extends MapperFunction<Data>>(mapper: Mapper): Promise<MapperReturnType<Data, Mapper>>;
}
interface MapperFunction<Data extends StoreData> {
	(data: Readonly<Data> | never): Data | unknown;
}
type MapperReturnType<Data extends StoreData, Mapper extends MapperFunction<Data>> =
	| ReturnType<Mapper>
	| Data
	| unknown;

interface TruthyKeys<Data extends StoreData> {
	<KeyObject extends Record<keyof Data, boolean>>(
		keys: Partial<KeyObject>
	): TruthyKeysReturnType<Data, KeyObject>;
}
type TruthyKeysReturnType<
	Data extends StoreData,
	KeyObject extends Partial<Record<keyof Data, boolean>>,
> = Readonly<
	RemoveNever<{
		[SelectedKey in keyof KeyObject]: KeyObject[SelectedKey] extends false
			? never
			: // @ts-expect-error the `SelectedKey` is string and keyof `Data`
				Data[string & SelectedKey];
	}>
>;

interface KeyList<Data extends StoreData> {
	<KeyList extends Array<keyof Data>>(
		keys: Partial<KeyList>
	): Promise<KeyListReturnType<Data, KeyList>>;
}
type KeyListReturnType<
	Data extends StoreData,
	KeyList extends Partial<Array<keyof Data>>,
> = Readonly<{
	[SelectedKey in KeyList extends Partial<Array<infer Key>> ? Key : never]: Data[SelectedKey];
}>;

interface Overloads<Data extends StoreData>
	extends WholeData<Data>,
		Mapper<Data>,
		SingleKey<Data>,
		KeyMapper<Data>,
		TruthyKeys<Data>,
		KeyList<Data> {}

export type {
	KeyList,
	KeyListReturnType,
	KeyMapper,
	KeyMapperReturnType,
	Mapper,
	MapperReturnType,
	Overloads,
	SingleKey,
	SingleKeyReturnType,
	TruthyKeys,
	TruthyKeysReturnType,
	WholeData,
	WholeDataReturnType,
};

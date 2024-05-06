import type { StoreData } from '../helpers/mod.ts';

interface KeyMapper<Data extends StoreData> {
	<Key extends keyof Data, Mapper extends SingleKeyMapperFunction<Data, Key>>(key: Key, mapper: Mapper): Promise<
		KeyMapperReturnType<Data, Key, Mapper>
	>;
}

type KeyMapperReturnType<Data extends StoreData, Key extends keyof Data, Mapper extends SingleKeyMapperFunction<Data, Key>> = ReturnType<Mapper> | Data[Key] | unknown;


interface SingleKeyMapperFunction<Data extends StoreData, Key extends keyof Data> {
	(data: Data[Key] | never): Data[Key] | unknown;
}


const isSingleKeyMapper = <Data extends StoreData>(input: unknown): input is SingleKeyMapperFunction<Data, keyof Data> => {
	return typeof input === 'function';
}

export {
	isSingleKeyMapper,
	type KeyMapper,
	type KeyMapperReturnType,
	type SingleKeyMapperFunction
};

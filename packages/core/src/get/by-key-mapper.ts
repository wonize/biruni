import type { StoreData } from '../helpers/mod.ts';

interface ByKeyMapper<Data extends StoreData> {
	<Key extends keyof Data, Mapper extends ByKeyMapperFunction<Data, Key>>(
		key: Key,
		mapper: Mapper,
	): Promise<ByKeyMapperReturnType<Data, Key, Mapper>>;
}

type ByKeyMapperReturnType<
	Data extends StoreData,
	Key extends keyof Data,
	Mapper extends ByKeyMapperFunction<Data, Key>,
> = ReturnType<Mapper> | Data[Key] | unknown;

interface ByKeyMapperFunction<Data extends StoreData, Key extends keyof Data> {
	(data: Data[Key] | never): Data[Key] | unknown;
}

const isByKeyMapper = <Data extends StoreData>(
	input: unknown,
): input is ByKeyMapperFunction<Data, keyof Data> => {
	return typeof input === 'function';
};

function getByKeyMapper<
	Data extends StoreData,
	Key extends keyof Data,
	Mapper extends ByKeyMapperFunction<Data, Key>,
>(data: Data, key: Key, mapper: Mapper) {
	return mapper(data[key]);
}

export { getByKeyMapper, isByKeyMapper };
export type { ByKeyMapper, ByKeyMapperFunction, ByKeyMapperReturnType };

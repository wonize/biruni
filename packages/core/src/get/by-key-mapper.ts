import type { StoreData } from '../helpers/mod';

interface GetByKeyMapper<Data extends StoreData> {
	<Key extends keyof Data, Mapper extends GetByKeyMapperFunction<Data, Key>>(
		key: Key,
		mapper: Mapper
	): Promise<GetByKeyMapperReturnType<Data, Key, Mapper>>;
}

type GetByKeyMapperReturnType<
	Data extends StoreData,
	Key extends keyof Data,
	Mapper extends GetByKeyMapperFunction<Data, Key>,
> = ReturnType<Mapper> | Data[Key] | unknown;

interface GetByKeyMapperFunction<Data extends StoreData, Key extends keyof Data> {
	(data: Data[Key] | never): Data[Key] | unknown;
}

const isByKeyMapper = <Data extends StoreData>(
	input: unknown
): input is GetByKeyMapperFunction<Data, keyof Data> => {
	return typeof input === 'function';
};

function getByKeyMapper<
	Data extends StoreData,
	Key extends keyof Data,
	Mapper extends GetByKeyMapperFunction<Data, Key>,
>(data: Data, key: Key, mapper: Mapper) {
	return mapper(data[key]);
}

export { getByKeyMapper, isByKeyMapper };
export type { GetByKeyMapper, GetByKeyMapperFunction, GetByKeyMapperReturnType };

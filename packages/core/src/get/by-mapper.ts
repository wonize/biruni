import type { StoreData } from '../helpers/mod.ts';

interface GetByMapper<Data extends StoreData> {
	<Mapper extends GetByMapperFunction<Data>>(
		mapper: Mapper,
	): Promise<GetByMapperReturnType<Data, Mapper>>;
}

type GetByMapperReturnType<Data extends StoreData, Mapper extends GetByMapperFunction<Data>> =
	| ReturnType<Mapper>
	| Data
	| unknown;

interface GetByMapperFunction<Data extends StoreData> {
	(data: Readonly<Data> | never): Data | unknown;
}

const isByMapper = <Data extends StoreData>(input: unknown): input is GetByMapperFunction<Data> => {
	return typeof input === 'function';
};

function getByMapper<Data extends StoreData, Mapper extends GetByMapperFunction<Data>>(
	data: Data,
	mapper: Mapper,
) {
	return mapper(data);
}

export { getByMapper, isByMapper };
export type { GetByMapper, GetByMapperFunction, GetByMapperReturnType };

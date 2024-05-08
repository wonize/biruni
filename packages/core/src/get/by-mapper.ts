import type { StoreData } from '../helpers/mod.ts';

interface ByMapper<Data extends StoreData> {
	<Mapper extends ByMapperFunction<Data>>(
		mapper: Mapper,
	): Promise<ByMapperReturnType<Data, Mapper>>;
}

type ByMapperReturnType<Data extends StoreData, Mapper extends ByMapperFunction<Data>> =
	| ReturnType<Mapper>
	| Data
	| unknown;

interface ByMapperFunction<Data extends StoreData> {
	(data: Readonly<Data> | never): Data | unknown;
}

const isByMapper = <Data extends StoreData>(input: unknown): input is ByMapperFunction<Data> => {
	return typeof input === 'function';
};

function getByMapper<Data extends StoreData, Mapper extends ByMapperFunction<Data>>(
	data: Data,
	mapper: Mapper,
) {
	return mapper(data);
}

export { getByMapper, isByMapper };
export type {
	ByMapper as ByMapper,
	ByMapperFunction as ByMapperFunction,
	ByMapperReturnType as ByMapperReturnType,
};

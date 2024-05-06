import type { StoreData } from '../helpers/mod.ts';

interface Mapper<Data extends StoreData> {
	<Mapper extends MapperFunction<Data>>(mapper: Mapper): Promise<MapperReturnType<Data, Mapper>>;
}

interface MapperFunction<Data extends StoreData> {
	(data: Readonly<Data> | never): Data | unknown;
}

type MapperReturnType<Data extends StoreData, Mapper extends MapperFunction<Data>> = ReturnType<Mapper> | Data | unknown;

const isMapper = <Data extends StoreData>(input: unknown): input is MapperFunction<Data> => {
	return typeof input === 'function';
}

export {
	isMapper,
	type Mapper,
	type MapperFunction,
	type MapperReturnType
};

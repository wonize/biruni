import { clone, type StoreData } from '../helpers/mod.ts';

interface GetByEntire<Data extends StoreData> {
	(): Promise<GetByEntireReturnType<Data>>;
}

type GetByEntireReturnType<Data extends StoreData> = Readonly<Data>;

const isByEntire = <Data extends StoreData>(
	input: unknown,
): input is undefined | never | null | void => {
	return typeof input === 'undefined' || input === null || Boolean(input) === false;
};

function getByEntire<Data extends StoreData>(data: Data): GetByEntireReturnType<Data> {
	return clone(data);
}

export { getByEntire, isByEntire };
export type { GetByEntire, GetByEntireReturnType };

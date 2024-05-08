import { clone, type StoreData } from '../helpers/mod.ts';

interface ByEntire<Data extends StoreData> {
	(): Promise<
		ByEntireReturnType<Data>
	>;
}

type ByEntireReturnType<Data extends StoreData> = Readonly<Data>;

const isByEntire = <Data extends StoreData>(input: unknown): input is (undefined | never | null | void) => {
	return typeof input === 'undefined' || input === null || Boolean(input) === false;
}

function getByEntire<Data extends StoreData>(data: Data): ByEntireReturnType<Data> {
	return clone(data);
}

export {
	getByEntire,
	isByEntire
};

export type {
	ByEntire,
	ByEntireReturnType
};

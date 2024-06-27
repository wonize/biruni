import clone from 'lodash.clonedeep';
import type { StoreData } from '../helpers/mod';

interface GetByEntire<Data extends StoreData> {
	(): Promise<GetByEntireReturnType<Data>>;
}

type GetByEntireReturnType<Data extends StoreData> = Readonly<Data>;

const isByEntire = (input: unknown): input is null | undefined => {
	return typeof input === 'undefined' || input === null || Boolean(input) === false;
};

function getByEntire<Data extends StoreData>(data: Data): GetByEntireReturnType<Data> {
	let temp_base = data;

	if (typeof data !== 'object' || data === null) {
		temp_base = Object.create({});
	}

	return clone(temp_base);
}

export { getByEntire, isByEntire };
export type { GetByEntire, GetByEntireReturnType };

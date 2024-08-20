import type { DataObject } from '@biruni/core/helpers';
import clone from 'lodash.clonedeep';

interface GetByEntire<Data extends DataObject> {
	(): GetByEntireReturnType<Data>;
}

type GetByEntireReturnType<Data extends DataObject> = Readonly<Data>;

const isByEntire = (input: unknown): input is null | undefined => {
	return typeof input === 'undefined' || input === null || Boolean(input) === false;
};

function getByEntire<Data extends DataObject>(data: Data): GetByEntireReturnType<Data> {
	let temp_base = data;

	if (typeof data !== 'object' || data === null) {
		temp_base = Object.create({});
	}

	return clone(temp_base);
}

export { getByEntire, isByEntire };
export type { GetByEntire, GetByEntireReturnType };

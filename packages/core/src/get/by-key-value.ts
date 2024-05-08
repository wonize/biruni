import type { StoreData } from '../helpers/mod.ts';

interface GetByKey<Data extends StoreData> {
	<Key extends keyof Data>(key: Key): Promise<GetByKeyReturnType<Data, Key>>;
}

type GetByKeyReturnType<Data extends StoreData, Key extends keyof Data> = Data[Key];

const isKeyOfData = <Data extends StoreData>(input: unknown): input is keyof Data => {
	return typeof input === 'string';
};

const isByKey = <Data extends StoreData>(
	input: unknown,
): input is undefined | never | null | void => {
	return typeof input === 'undefined' || input === null || Boolean(input) === false;
};

function getByKey<Data extends StoreData, Key extends keyof Data>(data: Data, key: Key) {
	return data[key];
}

export { getByKey, isByKey, isKeyOfData };
export type { GetByKey, GetByKeyReturnType };

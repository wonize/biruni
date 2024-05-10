import { clone, type StoreData } from '../helpers/mod';

interface SetByPair<Data extends StoreData> {
	(data: Partial<Data>): Promise<void>;
}

const isByPair = <Data extends StoreData>(input: unknown): input is Partial<Data> => {
	return typeof input === 'object' && input !== null;
};

function setByPair<Data extends StoreData>(data: Data, pairs: Partial<Data>): Data {
	const cloneInputData = clone(data);
	const clonedPair = clone(pairs);
	const outputData = Object.assign({}, cloneInputData, clonedPair);
	return outputData;
}

export { isByPair, setByPair };
export type { SetByPair };

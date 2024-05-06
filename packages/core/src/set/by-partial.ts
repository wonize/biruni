import type { StoreData } from '../helpers/mod.ts';

interface PartialData<Data extends StoreData> {
	(data: Partial<Data>): Promise<void>;
}

const isPartialData = <Data extends StoreData>(input: unknown): input is Partial<Data> => {
	return typeof input === 'object' && input !== null;
}

export {
	isPartialData,
	type PartialData
};

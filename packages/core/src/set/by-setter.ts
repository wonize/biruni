import { clone, type StoreData } from '../helpers/mod';

interface SetBySetter<Data extends StoreData> {
	<Setter extends SetBySetterFunction<Data>>(setter: Setter): Promise<void>;
}

interface SetBySetterFunction<Data extends StoreData> {
	(data: Readonly<Data>): Partial<Data>;
}

const isBySetter = <Data extends StoreData>(input: unknown): input is SetBySetterFunction<Data> => {
	return typeof input === 'function';
};

function setBySetter<Data extends StoreData, Setter extends SetBySetterFunction<Data>>(
	data: Data,
	setter: Setter
): Data {
	const clonedInputData = clone(data);
	const outputData = Object.assign({}, clonedInputData, setter(clonedInputData));
	return outputData;
}

export { isBySetter, setBySetter };
export type { SetBySetter, SetBySetterFunction };

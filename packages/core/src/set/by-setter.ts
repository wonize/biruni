import merge from 'lodash.merge';
import clone from 'lodash.clone';
import { deepKeys, hasProperty } from 'dot-prop';
import type { DeepPartial } from '../helpers/deep-partial';
import type { StoreData } from '../helpers/mod';

interface SetBySetter<Data extends StoreData> {
	<Setter extends SetBySetterFunction<Data>>(setter: Setter): Promise<void>;
}

interface SetBySetterFunction<Data extends StoreData> {
	(data: Readonly<Data>): DeepPartial<Data>;
}


const isBySetter = <Data extends StoreData>(input: unknown): input is SetBySetterFunction<Data> => {
	return typeof input === 'function';
};

function setBySetter<Data extends StoreData, Setter extends SetBySetterFunction<Data> = SetBySetterFunction<Data>>(
	data: Data,
	setter: Setter
): Data {
	if (typeof data !== 'object' || typeof data === 'function') {
		throw 'Error';
	}


	const clonedInputData = clone(data);
	const value = setter(clonedInputData);

	if (typeof value !== 'object' || typeof value === 'function') {
		throw 'Error';
	}

	let is_match: boolean = true;
	for (const path of deepKeys(value)) {
		if (hasProperty(clonedInputData, path) === false) {
			is_match = false;
		}
	}

	if (is_match === false) {
		return clonedInputData;
	}

	const outputData = merge(clonedInputData, value);
	return outputData;
}

export { isBySetter, setBySetter };
export type { SetBySetter, SetBySetterFunction };

import { deepKeys, deleteProperty, hasProperty } from 'dot-prop';
import clone from 'lodash.clonedeep';
import merge from 'lodash.merge';
import type { StoreData } from '../helpers/mod';
import type { DeepPartial } from '../helpers/deep-partial';

interface SetByPair<Data extends StoreData> {
	(data: DeepPartial<Data>): Promise<void>;
}

const isByPair = <Data extends StoreData>(input: unknown): input is Partial<Data> | DeepPartial<Data> => {
	return typeof input === 'object' && input !== null;
};

function setByPair<Data extends StoreData>(data: Data, pairs: DeepPartial<Data>): Data {
	if ((typeof pairs !== 'object' || pairs === null) && (typeof data !== 'object' || data === null)) {
		return Object.create({});
	}

	if (typeof pairs !== 'object' || pairs === null) {
		return clone(data);
	}

	if (typeof data !== 'object' || data === null) {
		return clone(pairs as Data);
	}

	const cloned_base = clone(data);
	const cloned_pair = clone(pairs);

	if (JSON.stringify(cloned_base).length === 2) {
		return cloned_pair as Data;
	}

	for (const key of deepKeys(cloned_pair)) {
		if (hasProperty(cloned_base, key) === false) {
			deleteProperty(cloned_pair, key);
		}
	}

	return merge(cloned_base, cloned_pair);
}

export { isByPair, setByPair };
export type { SetByPair };

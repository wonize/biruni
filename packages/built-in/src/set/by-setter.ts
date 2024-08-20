import type { DeepPartial } from '@biruni/core/helpers/deep-partial';
import type { DataObject } from '@biruni/core/helpers/mod';
import clone from 'lodash.clone';
import { setByPair } from './by-pair';

interface SetBySetter<Data extends DataObject> {
	<Setter extends SetBySetterFunction<Data>>(setter: Setter): void;
}

interface SetBySetterFunction<Data extends DataObject> {
	(data: Readonly<Data>): DeepPartial<Data>;
}

const isBySetter = <Data extends DataObject>(
	input: unknown
): input is SetBySetterFunction<Data> => {
	return typeof input === 'function';
};

function setBySetter<
	Data extends DataObject,
	Setter extends SetBySetterFunction<Data> = SetBySetterFunction<Data>,
>(data: Data, setter: Setter): Data {
	let temp_data = data;
	let temp_setter = setter;

	if (typeof data !== 'object' || typeof data === 'function') {
		temp_data = Object.create({});
	}

	if (typeof setter !== 'function') {
		temp_setter = function alternative_setter(param_data) {
			return param_data;
		} as Setter;
	}

	const cloned_base = clone(temp_data);
	const setter_pair = temp_setter(cloned_base);

	if (typeof setter_pair !== 'object' || typeof setter_pair === 'function') {
		return cloned_base;
	}

	return setByPair(cloned_base, setter_pair);
}

export { isBySetter, setBySetter };
export type { SetBySetter, SetBySetterFunction };

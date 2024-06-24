import { getProperty, hasProperty, setProperty } from 'dot-prop';
import clone from 'lodash.clonedeep';
import type { DeepPartial } from '../helpers/deep-partial';
import type { StoreData } from '../helpers/mod';
import type { Path } from '../path/mod';
import { setByPair } from './by-pair';
import { setBySetter, type SetBySetterFunction } from './by-setter';

interface SetByKeySetter<Data extends StoreData> {
	<Key extends Path.From<Data>, Setter extends SetByKeySetterFunction<Path.At<Data, Key>, Data>>(
		key: Key,
		setter: Setter
	): Promise<void>;
}

interface SetByKeySetterFunction<
	Value extends Path.At<Data, Path.From<Data>>,
	Data extends StoreData = StoreData,
> {
	(value: Readonly<Value>): Partial<Value>;
}

const isByKeySetter = <Data extends StoreData>(
	input: unknown
): input is SetByKeySetterFunction<Path.At<Data, Path.From<Data>>, Data> => {
	return typeof input === 'function';
};

function setByKeySetter<
	Data extends StoreData,
	Key extends Path.From<Data> = Path.From<Data>,
	Setter extends SetByKeySetterFunction<Path.At<Data, Key>, Data> = SetByKeySetterFunction<Path.At<Data, Key>, Data>,
>(data: Data, key: Key, setter: Setter): Data {
	let temp_data = data;
	let temp_setter = setter;

	if (typeof data !== 'object') {
		temp_data = Object.create({});
	}

	if (typeof setter !== 'function') {
		temp_setter = function alternative_setter(param_data) {
			return param_data;
		} as Setter
	}

	const cloned_base = clone(temp_data);

	if (typeof key !== 'string') {
		return setBySetter(cloned_base, setter as unknown as SetBySetterFunction<Data>);
	}

	if (typeof data === 'object' && hasProperty(cloned_base, key.toString()) === false) {
		return cloned_base;
	}

	const target_pair = getProperty(cloned_base, key.toString())!;
	const setter_pair = temp_setter(target_pair);
	const merge_pair = setProperty({}, key.toString(), setter_pair) as DeepPartial<Data>;
	return setByPair(cloned_base, merge_pair);
}

export { isByKeySetter, setByKeySetter };
export type { SetByKeySetter, SetByKeySetterFunction };

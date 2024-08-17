import type { DataObject } from '@biruni/core/helpers/mod';
import { getProperty, hasProperty } from 'dot-prop';
import clone from 'lodash.clonedeep';
import type { Path } from '../path/mod';

interface GetByKeyMapper<Data extends DataObject> {
	<Key extends Path.From<Data>, Mapper extends GetByKeyMapperFunction<Data, Key>>(
		key: Key,
		mapper: Mapper
	): GetByKeyMapperReturnType<Data, Key, Mapper>;
}

type GetByKeyMapperReturnType<
	Data extends DataObject,
	Key extends Path.From<Data>,
	Mapper extends GetByKeyMapperFunction<Data, Key>,
> = ReturnType<Mapper> | Path.At<Data, Key> | unknown;

interface GetByKeyMapperFunction<Data extends DataObject, Key extends Path.From<Data>> {
	(data: Path.At<Data, Key> | never): Path.At<Data, Key> | unknown;
}

const isByKeyMapper = <Data extends DataObject>(
	input: unknown
): input is GetByKeyMapperFunction<Data, Path.From<Data>> => {
	return typeof input === 'function';
};

function getByKeyMapper<
	Data extends DataObject,
	Key extends Path.From<Data> = Path.From<Data>,
	Mapper extends GetByKeyMapperFunction<Data, Key> = GetByKeyMapperFunction<Data, Key>,
>(data: Data, key: Key, mapper: Mapper) {
	let temp_mapper = mapper;

	if (typeof mapper !== 'function') {
		temp_mapper = function alternative_mapper(value) {
			return value;
		} as Mapper;
	}

	if (hasProperty(data, key.toString()) === false) {
		return clone(data);
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const parameter = getProperty(data, key.toString())!;
	return temp_mapper(parameter);
}

export { getByKeyMapper, isByKeyMapper };
export type { GetByKeyMapper, GetByKeyMapperFunction, GetByKeyMapperReturnType };

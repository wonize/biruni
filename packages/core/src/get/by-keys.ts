/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getProperty } from 'dot-prop';
import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';
import type { Path } from '../path/mod';
import type { StoreData } from '../helpers/mod';

interface GetByKeys<Data extends StoreData> {
	<KeyList extends Array<Path.From<Data>>>(
		keys: Partial<KeyList>
	): Promise<GetByKeysReturnType<Data, KeyList>>;
}

type GetByKeysReturnType<
	Data extends StoreData,
	KeyList extends Partial<Array<Path.From<Data>>>,
> = Readonly<{
	[SelectedKey in KeyList extends Partial<Array<infer Key>> ? Key : never]: Data[SelectedKey];
}>;

const isByKeys = <Data extends StoreData>(
	input: unknown
): input is Partial<Array<Path.From<Data>>> => {
	return (
		typeof input === 'object' &&
		input !== null &&
		(input instanceof Array || Array.isArray(input))
	);
};

function getByKeys<
	Data extends StoreData,
	KeyList extends Array<Path.From<Data>> = Array<Path.From<Data>>,
>(data: Data, keys: Partial<KeyList>) {
	let temp_base = data;
	if (typeof data !== 'object' || data === null) {
		temp_base = Object.create({});
	}

	const cloned_base = cloneDeep(temp_base);

	let result = Object.create({});
	for (const key of keys) {
		const value = getProperty(cloned_base, key!.toString());
		if (key?.toString().indexOf('.') !== -1) {
			const parts = key!.toString().split('.');
			for (const part of parts.slice(1)) {
				result = merge(result, {
					[parts[0]!.toString()]: {
						[part!.toString()]: value,
					},
				});
			}
		} else {
			result = merge(result, { [key!.toString()]: value });
		}
	}

	type Result = GetByKeysReturnType<Data, typeof keys>;
	return result as unknown as Result;
}

export { getByKeys, isByKeys };
export type { GetByKeys, GetByKeysReturnType };

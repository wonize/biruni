import type { StoreData } from '../helpers/mod.ts';

interface ByKeys<Data extends StoreData> {
	<KeyList extends Array<keyof Data>>(
		keys: Partial<KeyList>,
	): Promise<ByKeysReturnType<Data, KeyList>>;
}

type ByKeysReturnType<
	Data extends StoreData,
	KeyList extends Partial<Array<keyof Data>>,
> = Readonly<{
	[SelectedKey in KeyList extends Partial<Array<infer Key>> ? Key : never]: Data[SelectedKey];
}>;

const isByKeys = <Data extends StoreData>(input: unknown): input is Partial<Array<keyof Data>> => {
	return (
		typeof input === 'object' &&
		input !== null &&
		(input instanceof Array || Array.isArray(input))
	);
};

function getByKeys<Data extends StoreData, KeyList extends Array<keyof Data>>(
	data: Data,
	keys: Partial<KeyList>,
) {
	const filtered_data = (keys as unknown as Array<keyof Data>).reduce((filtered_pairs, key) => {
		return Object.assign({}, filtered_pairs, { [key]: data[key] });
	}, {});
	type Result = ByKeysReturnType<Data, typeof keys>;
	return filtered_data as unknown as Result;
}

export { getByKeys, isByKeys };
export type { ByKeys, ByKeysReturnType };

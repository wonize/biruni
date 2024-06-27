import { deepKeys, getProperty, hasProperty, setProperty } from 'dot-prop';
import cloneDeep from 'lodash.clonedeep';
import type { DeepPartial } from '../helpers/deep-partial';
import type { RemoveNever, StoreData } from '../helpers/mod';
import type { Path } from '../path/mod';

type TruthyMap<T extends object> = DeepPartial<{
	[K in Path.From<T>]: Path.At<T, K> extends object
		? TruthyMap<Path.At<T, K>> | boolean
		: boolean;
}>;

interface GetByTruthy<Data extends StoreData> {
	<Truthy extends TruthyMap<Data>>(truthy: Truthy): Promise<GetByTruthyReturnType<Data, Truthy>>;
}

type GetByTruthyReturnType<
	Data extends StoreData,
	Truthy extends TruthyMap<Data> = TruthyMap<Data>,
> = Readonly<
	RemoveNever<{
		[SelectedKey in keyof Truthy]: Truthy[SelectedKey] extends false
			? never
			: // @ts-expect-error the `SelectedKey` is keyof `Data`
				Data[SelectedKey];
	}>
>;

const isByTruthy = <Data extends StoreData>(input: unknown): input is TruthyMap<Data> => {
	return typeof input === 'object' && input !== null;
};

function getByTruthy<Data extends StoreData, Truthy extends TruthyMap<Data> = TruthyMap<Data>>(
	data: Data,
	truthy: Truthy
): GetByTruthyReturnType<Data, typeof truthy> {
	let base = data;
	if (typeof data !== 'object' || data === null) {
		base = Object.create({});
	}

	let result = {};
	for (const key of deepKeys(truthy)) {
		if (hasProperty(truthy, key) === false) continue;
		const target = getProperty(truthy, key);
		if (typeof target === 'object' && target !== null) {
			const target_base = getProperty(base, key);
			result = setProperty(
				cloneDeep(result),
				key,
				getByTruthy(target_base as never, target as never)
			);
		} else if (typeof target === 'boolean' && target === true) {
			const clean_path = key.replace(/\\./gm, '.');
			const target_value = getProperty(base, clean_path);
			result = setProperty(cloneDeep(result), clean_path, target_value);
		}
	}
	return result as unknown as GetByTruthyReturnType<Data, typeof truthy>;
}

export { getByTruthy, isByTruthy };
export type { GetByTruthy, GetByTruthyReturnType };

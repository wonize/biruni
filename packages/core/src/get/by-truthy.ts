import type { RemoveNever, StoreData } from '../helpers/mod.ts';

interface ByTruthy<Data extends StoreData> {
	<Truthy extends TruthyObject<Data>>(
		truthy: Partial<Truthy>,
	): Promise<ByTruthyReturnType<Data, Truthy>>;
}

type ByTruthyReturnType<
	Data extends StoreData,
	Truthy extends Partial<TruthyObject<Data>>,
> = Readonly<
	RemoveNever<{
		[SelectedKey in keyof Truthy]: Truthy[SelectedKey] extends false
			? never
			: // @ts-expect-error the `SelectedKey` is keyof `Data`
				Data[SelectedKey];
	}>
>;

type TruthyObject<Data extends StoreData> = Record<keyof Data, boolean>;

const isByTruthy = <Data extends StoreData>(
	input: unknown,
): input is Partial<TruthyObject<Data>> => {
	return typeof input === 'object' && input !== null;
};

function getByTruthy<Data extends StoreData, Truthy extends TruthyObject<Data>>(
	data: Data,
	truthy: Partial<Truthy>,
) {
	let result = {};
	for (const key in truthy) {
		if (truthy[key] === true) {
			result = Object.assign({}, result, {
				// @ts-expect-error the `key` is key of `data`
				[key]: data[key],
			});
		}
	}

	type Output = ByTruthyReturnType<Data, typeof truthy>;
	return result as unknown as Output;
}

export { getByTruthy, isByTruthy };
export type { ByTruthy, ByTruthyReturnType, TruthyObject };

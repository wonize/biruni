import type { RemoveNever, StoreData } from '../helpers/mod.ts';

interface GetByTruthy<Data extends StoreData> {
	<Truthy extends Partial<Record<keyof Data, boolean>>>(
		truthy: Truthy,
	): Promise<GetByTruthyReturnType<Data, Truthy>>;
}

type GetByTruthyReturnType<
	Data extends StoreData,
	Truthy extends Partial<Record<keyof Data, boolean>>,
> = Readonly<
	RemoveNever<{
		[SelectedKey in keyof Truthy]: Truthy[SelectedKey] extends false
			? never
			: // @ts-expect-error the `SelectedKey` is keyof `Data`
				Data[SelectedKey];
	}>
>;

const isByTruthy = <Data extends StoreData>(
	input: unknown,
): input is Partial<Record<keyof Data, boolean>> => {
	return typeof input === 'object' && input !== null;
};

function getByTruthy<Data extends StoreData, Truthy extends Partial<Record<keyof Data, boolean>>>(
	data: Data,
	truthy: Truthy,
): GetByTruthyReturnType<Data, typeof truthy> {
	let result = {} as unknown as GetByTruthyReturnType<Data, typeof truthy>;
	for (const key in truthy) {
		if (truthy[key] === true) {
			result = Object.assign({}, result, {
				// @ts-expect-error the `key` is key of `data`
				[key]: data[string & key],
			});
		}
	}

	return result;
}

export { getByTruthy, isByTruthy };
export type { GetByTruthy, GetByTruthyReturnType };

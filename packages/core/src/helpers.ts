import type { Store } from "@/store";

export type StoreData = object;

export type ExtractStoreData<TStore extends Store<StoreData>> =
	TStore extends Store<infer TData>
	? TData
	: StoreData;

export type FilterUnNeverKeys<O extends Record<PropertyKey, unknown>> = { [K in keyof O]: O[K] extends never ? never : K }[keyof O];
export type RemoveNever<O extends Record<PropertyKey, unknown>> = { [K in FilterUnNeverKeys<O>]: O[K] };
export type KeyDiff<Data extends StoreData> = Partial<Array<keyof Data>>;
export type ExtractKeyDiff<Data extends StoreData, Keys extends KeyDiff<Data>> = Keys extends Partial<Array<infer Key>> ? Key : never;
export type DataDiff<Data extends StoreData, Keys extends KeyDiff<Data>> = Partial<
	{
		[ChangedKey in ExtractKeyDiff<Data, Keys>]: {
			oldValue: Data[ChangedKey],
			newValue: Data[ChangedKey]
		}
	}
>;
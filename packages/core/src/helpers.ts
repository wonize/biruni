import type { Store } from "./store";

export type StoreData = object;

export type ExtractStoreData<TStore extends Store<StoreData>> =
	TStore extends Store<infer TData>
	? TData
	: StoreData;

export type FilterUnNeverKeys<O extends Record<PropertyKey, unknown>> = { [K in keyof O]: O[K] extends never ? never : K }[keyof O];
export type RemoveNever<O extends Record<PropertyKey, unknown>> = { [K in FilterUnNeverKeys<O>]: O[K] };
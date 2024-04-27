import type { Store } from "./store";

export type StoreData = object;

export type ExtractStoreData<TStore extends Store<StoreData>> =
	TStore extends Store<infer TData>
	? TData
	: StoreData;

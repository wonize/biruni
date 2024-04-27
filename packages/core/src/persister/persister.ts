import type { StoreData } from "../globals";

export interface Persister<TData extends StoreData> {
	set<D extends string, TKey extends string>(tag: {
		$$value: D;
		$$key?: TKey;
	}): Promise<void>;
	get<D extends string, TKey extends string>(tag: {
		$$key?: TKey;
	}): Promise<{ $$value: D }>;
}

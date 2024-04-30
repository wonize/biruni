import type { StoreData } from "@/helpers";

export interface Persister<TData extends StoreData> {
	set<D extends string, TKey extends string>(tag: {
		$$value: D;
		$$key?: TKey;
	}): Promise<void>;
	get<D extends string, TKey extends string>(tag: {
		$$key?: TKey;
	}): Promise<{ $$value: D }>;
}

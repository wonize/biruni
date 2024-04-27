import type { StoreData } from "./globals";

export type StoreSetByObject<TData extends StoreData> = Partial<TData>;
export type StoreSetByFn<TData extends StoreData> = (draft: Readonly<TData>) => Partial<TData>;
export type StoreSetByKeyValue<TData extends StoreData, K extends keyof TData> = TData[K];
export type StoreSetByKeyFn<TData extends StoreData, K extends keyof TData> = (value: TData[K]) => TData[K];

export interface StoreSet<TData extends StoreData> {
	set<K = undefined>(o: StoreSetByObject<TData>): Promise<void>;
	set<K = undefined>(fn: StoreSetByFn<TData>): Promise<void>;
	set<K extends keyof TData, V extends StoreSetByKeyValue<TData, K>>(key: K, value: V): Promise<void>;
	set<K extends keyof TData, F extends StoreSetByKeyFn<TData, K>>(key: K, fn: F): Promise<void>;
	set<
		K extends keyof TData,
		P extends StoreSetByObject<TData> | StoreSetByFn<TData> | K,
		G extends StoreSetByKeyFn<TData, K> | StoreSetByKeyValue<TData, K> | never = P extends K ? (StoreSetByKeyValue<TData, K> | StoreSetByKeyFn<TData, K>) : never
	>(KeyOrFnOrObj: P, FnOrObj?: G): Promise<void>;
}

export type StoreSetGeneric<TData extends StoreData> = <
	K extends keyof TData,
	P extends StoreSetByObject<TData> | StoreSetByFn<TData> | K,
	G extends StoreSetByKeyFn<TData, K> | StoreSetByKeyValue<TData, K> | never = P extends K ? (StoreSetByKeyValue<TData, K> | StoreSetByKeyFn<TData, K>) : never
>(KeyOrFnOrObj: P, FnOrObj?: G) => Promise<void>;

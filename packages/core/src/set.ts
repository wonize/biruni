export type StoreSetByObject<S extends Record<string, unknown>> = Partial<S>;
export type StoreSetByFn<S extends Record<string, unknown>> = (draft: Readonly<S>) => Partial<S>;
export type StoreSetByKeyValue<S extends Record<string, unknown>, K extends keyof S> = S[K];
export type StoreSetByKeyFn<S extends Record<string, unknown>, K extends keyof S> = (value: S[K]) => S[K];

export interface StoreSet<S extends Record<string, unknown>> {
	set<K = undefined>(o: StoreSetByObject<S>): Promise<void>;
	set<K = undefined>(fn: StoreSetByFn<S>): Promise<void>;
	set<K extends keyof S, V extends StoreSetByKeyValue<S, K>>(key: K, value: V): Promise<void>;
	set<K extends keyof S, F extends StoreSetByKeyFn<S, K>>(key: K, fn: F): Promise<void>;
	set<
		K extends keyof S,
		P extends StoreSetByObject<S> | StoreSetByFn<S> | K,
		G extends StoreSetByKeyFn<S, K> | StoreSetByKeyValue<S, K> | never = P extends K ? (StoreSetByKeyValue<S, K> | StoreSetByKeyFn<S, K>) : never
	>(KeyOrFnOrObj: P, FnOrObj?: G): Promise<void>;
}

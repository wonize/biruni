type FilterUnNeverKeys<O extends Record<PropertyKey, unknown>> = { [K in keyof O]: O[K] extends never ? never : K }[keyof O];
type RemoveNever<O extends Record<PropertyKey, unknown>> = { [K in FilterUnNeverKeys<O>]: O[K] };

export type StoreGetByWholeResult<S extends Record<string, unknown>> = Required<Readonly<S>>;
export type StoreGetByWhole<S extends Record<string, unknown>> = <K = undefined>() => Promise<StoreGetByWholeResult<S>>;

export type StoreGetByKeyResult<S extends Record<string, unknown>, K extends keyof S> = S[K];
export type StoreGetByKey<S extends Record<string, unknown>> = <K extends keyof S>(key: K) => Promise<StoreGetByKeyResult<S, K>>

export type KeyList<S extends Record<string, unknown>> = Array<keyof S>;
export type StoreGetByKeysResult<S extends Record<string, unknown>, L extends KeyList<S>> = Readonly<{ [P in L[number]]: S[P] }>;
export type StoreGetByKeys<S extends Record<string, unknown>> = <K extends keyof S, L extends KeyList<S>>(keys: L) => Promise<StoreGetByKeysResult<S, L>>;

export type KeyRecord<S extends Record<string, unknown>> = Partial<Record<keyof S, boolean>>;
export type StoreGetByObjectResult<S extends Record<string, unknown>, O extends KeyRecord<S>> = Readonly<RemoveNever<{ [P in keyof O]: O[P] extends false ? never : S[string & P] }>>;
export type StoreGetByObject<S extends Record<string, unknown>> = <K extends keyof S, O extends KeyRecord<S>>(o: O) => Promise<StoreGetByObjectResult<S, O>>;

type FnWhole<S extends Record<string, unknown>> = (store: Readonly<S>) => unknown;
type FnValue<S extends Record<string, unknown>, K extends keyof S> = (value: S[K]) => unknown;

export interface StoreGet<S extends Record<string, unknown>> {
	get<K = undefined>(): Promise<StoreGetByWholeResult<S>>;
	get<K extends keyof S>(key: K): Promise<StoreGetByKeyResult<S, K>>;
	get<K extends keyof S, L extends KeyList<S>>(keys: L): Promise<StoreGetByKeysResult<S, L>>;
	get<K extends keyof S, O extends KeyRecord<S>>(o: O): Promise<StoreGetByObjectResult<S, O>>;
	get<K extends keyof S, F extends FnValue<S, K> = FnValue<S, K>>(key: K, fn: F): Promise<ReturnType<F>>;
	get<K extends keyof S, F extends FnWhole<S>>(fn: F): Promise<ReturnType<F>>;
	get<
		K extends keyof S,
		P extends KeyList<S> | KeyRecord<S> | FnValue<S, K> | FnWhole<S>,
		R extends
		P extends KeyList<S>
		? StoreGetByKeysResult<S, P>
		: P extends KeyRecord<S>
		? StoreGetByObjectResult<S, P>
		: P extends FnValue<S, K>
		? ReturnType<P> :
		never
		= P extends KeyList<S>
		? StoreGetByKeysResult<S, P>
		: P extends KeyRecord<S>
		? StoreGetByObjectResult<S, P>
		: P extends FnValue<S, K>
		? ReturnType<P>
		: never
	>(keyOrKeysOrObjOrFn?: P, Fn?: FnValue<S, K>): Promise<R>;
}

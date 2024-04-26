import type { StoreData } from "./globals";

type FilterUnNeverKeys<O extends Record<PropertyKey, unknown>> = { [K in keyof O]: O[K] extends never ? never : K }[keyof O];
type RemoveNever<O extends Record<PropertyKey, unknown>> = { [K in FilterUnNeverKeys<O>]: O[K] };

export type StoreGetByWholeResult<S extends StoreData> = Required<Readonly<S>>;
export type StoreGetByWhole<S extends StoreData> = <K = undefined>() => Promise<StoreGetByWholeResult<S>>;

export type StoreGetByKeyResult<S extends StoreData, K extends keyof S> = S[K];
export type StoreGetByKey<S extends StoreData> = <K extends keyof S>(key: K) => Promise<StoreGetByKeyResult<S, K>>

export type KeyList<S extends StoreData> = Array<keyof S>;
export type StoreGetByKeysResult<S extends StoreData, L extends KeyList<S>> = Readonly<{ [P in L[number]]: S[P] }>;
export type StoreGetByKeys<S extends StoreData> = <K extends keyof S, L extends KeyList<S>>(keys: L) => Promise<StoreGetByKeysResult<S, L>>;

export type KeyRecord<S extends StoreData> = Partial<Record<keyof S, boolean>>;
export type StoreGetByObjectResult<S extends StoreData, O extends KeyRecord<S>> = Readonly<RemoveNever<{ [P in keyof O]: O[P] extends false ? never : S[string & P] }>>;
export type StoreGetByObject<S extends StoreData> = <K extends keyof S, O extends KeyRecord<S>>(o: O) => Promise<StoreGetByObjectResult<S, O>>;

export type FnWhole<S extends StoreData> = (store: Readonly<S>) => unknown;
export type FnValue<S extends StoreData, K extends keyof S> = (value: S[K]) => unknown;

export interface StoreGet<S extends StoreData> {
	get<K = undefined>(): Promise<StoreGetByWholeResult<S>>;
	get<K extends keyof S>(key: K): Promise<StoreGetByKeyResult<S, K>>;
	get<K extends keyof S, L extends KeyList<S>>(keys: L): Promise<StoreGetByKeysResult<S, L>>;
	get<K extends keyof S, O extends KeyRecord<S>>(o: O): Promise<StoreGetByObjectResult<S, O>>;
	get<K extends keyof S, F extends FnValue<S, K> = FnValue<S, K>>(key: K, fn: F): Promise<ReturnType<F>>;
	get<K extends keyof S, F extends FnWhole<S>>(fn: F): Promise<ReturnType<F>>;
	get<
		K extends keyof S,
		P extends KeyList<S> | KeyRecord<S> | FnWhole<S>,
		R extends
		P extends KeyList<S>
		? StoreGetByKeysResult<S, P>
		: P extends KeyRecord<S>
		? StoreGetByObjectResult<S, P>
		: P extends FnWhole<S>
		? ReturnType<P> :
		never
		= P extends KeyList<S>
		? StoreGetByKeysResult<S, P>
		: P extends KeyRecord<S>
		? StoreGetByObjectResult<S, P>
		: P extends FnWhole<S>
		? ReturnType<P> :
		never
	>(keyOrKeysOrObjOrFn?: P, Fn?: FnValue<S, K>): Promise<R>;
}

export type StoreGetGeneric<S extends StoreData> = <
	K extends keyof S,
	P extends KeyList<S> | KeyRecord<S> | FnWhole<S>
>(keyOrKeysOrObjOrFn?: P, Fn?: FnValue<S, K>) => Promise<
	P extends KeyList<S>
	? StoreGetByKeysResult<S, P>
	: P extends KeyRecord<S>
	? StoreGetByObjectResult<S, P>
	: P extends FnWhole<S>
	? ReturnType<P> :
	never
>;

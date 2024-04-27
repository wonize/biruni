import type { StoreData } from "./globals";

type FilterUnNeverKeys<O extends Record<PropertyKey, unknown>> = { [K in keyof O]: O[K] extends never ? never : K }[keyof O];
type RemoveNever<O extends Record<PropertyKey, unknown>> = { [K in FilterUnNeverKeys<O>]: O[K] };

export type StoreGetByWholeResult<TData extends StoreData> = Required<Readonly<TData>>;
export type StoreGetByWhole<TData extends StoreData> = <K = undefined>() => Promise<StoreGetByWholeResult<TData>>;

export type StoreGetByKeyResult<TData extends StoreData, K extends keyof TData> = TData[K];
export type StoreGetByKey<TData extends StoreData> = <K extends keyof TData>(key: K) => Promise<StoreGetByKeyResult<TData, K>>

export type KeyList<TData extends StoreData> = Array<keyof TData>;
export type StoreGetByKeysResult<TData extends StoreData, L extends KeyList<TData>> = Readonly<{ [P in L[number]]: TData[P] }>;
export type StoreGetByKeys<TData extends StoreData> = <K extends keyof TData, L extends KeyList<TData>>(keys: L) => Promise<StoreGetByKeysResult<TData, L>>;

export type KeyRecord<TData extends StoreData> = Partial<Record<keyof TData, boolean>>;
export type StoreGetByObjectResult<TData extends StoreData, O extends KeyRecord<TData>> = Readonly<RemoveNever<{ [P in keyof O]: O[P] extends false ? never : TData[string & P] }>>;
export type StoreGetByObject<TData extends StoreData> = <K extends keyof TData, O extends KeyRecord<TData>>(o: O) => Promise<StoreGetByObjectResult<TData, O>>;

export type FnWhole<TData extends StoreData> = (store: Readonly<TData>) => unknown;
export type FnValue<TData extends StoreData, K extends keyof TData> = (value: TData[K]) => unknown;

export interface StoreGet<TData extends StoreData> {
	get<K = undefined>(): Promise<StoreGetByWholeResult<TData>>;
	get<K extends keyof TData>(key: K): Promise<StoreGetByKeyResult<TData, K>>;
	get<K extends keyof TData, L extends KeyList<TData>>(keys: L): Promise<StoreGetByKeysResult<TData, L>>;
	get<K extends keyof TData, O extends KeyRecord<TData>>(o: O): Promise<StoreGetByObjectResult<TData, O>>;
	get<K extends keyof TData, F extends FnValue<TData, K> = FnValue<TData, K>>(key: K, fn: F): Promise<ReturnType<F>>;
	get<K extends keyof TData, F extends FnWhole<TData>>(fn: F): Promise<ReturnType<F>>;
	get<
		K extends keyof TData,
		P extends KeyList<TData> | KeyRecord<TData> | FnWhole<TData>,
		R extends
		P extends KeyList<TData>
		? StoreGetByKeysResult<TData, P>
		: P extends KeyRecord<TData>
		? StoreGetByObjectResult<TData, P>
		: P extends FnWhole<TData>
		? ReturnType<P> :
		never
		= P extends KeyList<TData>
		? StoreGetByKeysResult<TData, P>
		: P extends KeyRecord<TData>
		? StoreGetByObjectResult<TData, P>
		: P extends FnWhole<TData>
		? ReturnType<P> :
		never
	>(keyOrKeysOrObjOrFn?: P, Fn?: FnValue<TData, K>): Promise<R>;
}

export type StoreGetGeneric<TData extends StoreData> = <
	K extends keyof TData,
	P extends KeyList<TData> | KeyRecord<TData> | FnWhole<TData>
>(keyOrKeysOrObjOrFn?: P, Fn?: FnValue<TData, K>) => Promise<
	P extends KeyList<TData>
	? StoreGetByKeysResult<TData, P>
	: P extends KeyRecord<TData>
	? StoreGetByObjectResult<TData, P>
	: P extends FnWhole<TData>
	? ReturnType<P> :
	never
>;

import type { Core as Core } from '../core';

export type DataObject = object;

export type ExtractDataObject<TCore extends Core<DataObject>> =
	TCore extends Core<infer TData> ? TData : DataObject;

export type FilterUnNeverKeys<O extends Record<PropertyKey, unknown>> = {
	[K in keyof O]: O[K] extends never ? never : K;
}[keyof O];

export type RemoveNever<O extends Record<PropertyKey, unknown>> = {
	[K in FilterUnNeverKeys<O>]: O[K];
};

export type KeyDiff<Data extends DataObject> = Partial<Array<keyof Data>>;

export type ExtractKeyDiff<Data extends DataObject, Keys extends KeyDiff<Data>> =
	Keys extends Partial<Array<infer Key>> ? Key : never;

export type DataDiff<Data extends DataObject, Keys extends KeyDiff<Data>> = Partial<{
	[ChangedKey in ExtractKeyDiff<Data, Keys>]: {
		oldValue: Data[ChangedKey];
		newValue: Data[ChangedKey];
	};
}>;

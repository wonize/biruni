import type { Store } from "../store";

export type StoreData = object;

export type ExtractStoreData<TStore extends Store<StoreData>> =
	TStore extends Store<infer TData>
	? TData
	: StoreData;

export type FilterUnNeverKeys<O extends Record<PropertyKey, unknown>> = { [K in keyof O]: O[K] extends never ? never : K }[keyof O];
export type RemoveNever<O extends Record<PropertyKey, unknown>> = { [K in FilterUnNeverKeys<O>]: O[K] };
export type KeyDiff<Data extends StoreData> = Partial<Array<keyof Data>>;
export type ExtractKeyDiff<Data extends StoreData, Keys extends KeyDiff<Data>> = Keys extends Partial<Array<infer Key>> ? Key : never;
export type DataDiff<Data extends StoreData, Keys extends KeyDiff<Data>> = Partial<
	{
		[ChangedKey in ExtractKeyDiff<Data, Keys>]: {
			oldValue: Data[ChangedKey],
			newValue: Data[ChangedKey]
		}
	}
>;

export const keyOf = <Data extends StoreData>(input: Data): Array<keyof Data> => {
	return Array.from(Object.keys(input)) as unknown as Array<keyof Data>;
}

export const hasOwn = <Data extends StoreData>(data: Data, property: PropertyKey): property is keyof Data => {
	return (property in data) && typeof data?.[property as unknown as keyof Data] !== 'undefined' && Object.hasOwn(data, property);
}


/* export function haveKeysChanged(source, target) {
		const targetKeys = Object.keys(target);
		const isTargetChanged = targetKeys.every((key) => {
			const isKeyExist = Object.hasOwn(source, key);
			if (typeof target[key] === 'object' && target[key] !== null && (target[key] instanceof Array) === false) {
				return isKeyExist && haveKeysChanged(source[key], target[key])
			} else {
				return isKeyExist;
			}
		})

		const sourceKeys = Object.keys(source);
		const isSouceChanged = sourceKeys.every((key) => {
			const isKeyExist = Object.hasOwn(target, key);
			if (typeof source[key] === 'object' && source[key] !== null && (source[key] instanceof Array) === false) {
				return isKeyExist && haveKeysChanged(target[key], source[key])
			} else {
				return isKeyExist;
			}
		})

		return isTargetChanged && isSouceChanged;
	} */

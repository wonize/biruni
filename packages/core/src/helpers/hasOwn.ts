import type { StoreData } from './type-utility';

export const hasOwn = <Data extends StoreData>(
	data: Data,
	property: PropertyKey
): property is keyof Data => {
	return (
		property in data &&
		typeof data?.[property as unknown as keyof Data] !== 'undefined' &&
		Object.hasOwn(data, property)
	);
};

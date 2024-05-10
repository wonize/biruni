import type { StoreData } from './type-utility';

export const keyOf = <Data extends StoreData>(input: Data): Array<keyof Data> => {
	return Array.from(Object.keys(input)) as unknown as Array<keyof Data>;
};

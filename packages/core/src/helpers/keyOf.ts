import type { DataObject } from './type-utility';

export const keyOf = <Data extends DataObject>(input: Data): Array<keyof Data> => {
	return Array.from(Object.keys(input)) as unknown as Array<keyof Data>;
};

import type { StoreData } from "../helpers/mod.ts";

interface Setter<Data extends StoreData> {
	(setter: SetterFunction<Data>): Promise<void>;
}

interface SetterFunction<Data extends StoreData> {
	(data: Readonly<Data> | never): Partial<Data>;
}

const isSetter = <Data extends StoreData>(input: unknown): input is SetterFunction<Data> => {
	return typeof input === 'function';
}

export {
	isSetter,
	type Setter,
	type SetterFunction
};

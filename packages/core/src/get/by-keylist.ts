import type { StoreData } from '../helpers/mod.ts';

interface KeyList<Data extends StoreData> {
	<KeyList extends Array<keyof Data>>(keys: Partial<KeyList>): Promise<KeyListReturnType<Data, KeyList>>;
}

type KeyListReturnType<Data extends StoreData, KeyList extends Partial<Array<keyof Data>>> = Readonly<{
	[SelectedKey in KeyList extends Partial<Array<infer Key>> ? Key : never]: Data[SelectedKey]
}>;

const isKeyList = <Data extends StoreData>(input: unknown): input is Partial<Array<keyof Data>> => {
	return typeof input === 'object' && input !== null && ((input instanceof Array) || (Array.isArray(input)));
}

export {
	isKeyList,
	type KeyList,
	type KeyListReturnType
};

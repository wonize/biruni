import type { RemoveNever, StoreData } from '../helpers/mod.ts';

interface TruthyKeys<Data extends StoreData> {
	<KeyObject extends Record<keyof Data, boolean>>(keys: Partial<KeyObject>): Promise<
		TruthyKeysReturnType<Data, KeyObject>
	>;
}

type TruthyKeysReturnType<Data extends StoreData, KeyObject extends Partial<Record<keyof Data, boolean>>> = Readonly<
	RemoveNever<{
		[SelectedKey in keyof KeyObject]:
		KeyObject[SelectedKey] extends false
		? never
		// @ts-ignore
		: Data[string & SelectedKey]
	}>
>;

const isTruthyKeys = <Data extends StoreData>(input: unknown): input is Partial<Record<keyof Data, boolean>> => {
	return typeof input === 'object' && input !== null;
}

export {
	isTruthyKeys,
	type TruthyKeys,
	type TruthyKeysReturnType
};

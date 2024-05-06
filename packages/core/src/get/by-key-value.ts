import type { StoreData } from '../helpers/mod.ts';

interface SingleKey<Data extends StoreData> {
	<Key extends keyof Data>(key: Key): Promise<
		SingleKeyReturnType<Data, Key>
	>;
}

type SingleKeyReturnType<Data extends StoreData, Key extends keyof Data> = Data[Key];

const isKeyOfData = <Data extends StoreData>(input: unknown): input is keyof Data => {
	return typeof input === 'string';
}

const isSingleKey = <Data extends StoreData>(input: unknown): input is (undefined | never | null | void) => {
	return typeof input === 'undefined' || input === null || Boolean(input) === false;
}

export {
	isKeyOfData,
	isSingleKey,
	type SingleKey,
	type SingleKeyReturnType
};

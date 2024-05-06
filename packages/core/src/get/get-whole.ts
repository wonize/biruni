import type { StoreData } from '../helpers/mod.ts';

interface WholeData<Data extends StoreData> {
	(): Promise<
		WholeDataReturnType<Data>
	>;
}

type WholeDataReturnType<Data extends StoreData> = Readonly<Data>;

const isWholeData = <Data extends StoreData>(input: unknown): input is (undefined | never | null | void) => {
	return typeof input === 'undefined' || input === null || Boolean(input) === false;
}

export {
	isWholeData,
	type WholeData,
	type WholeDataReturnType
};

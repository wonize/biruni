import type { StoreData } from "../globals";

export interface Validator<TData extends StoreData> {
	validate<D extends TData>(data: D): boolean;
}

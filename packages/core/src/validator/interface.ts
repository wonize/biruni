import type { StoreData } from "@/helpers";

export interface Validator<TData extends StoreData> {
	validate<D extends TData>(data: D): boolean;
}

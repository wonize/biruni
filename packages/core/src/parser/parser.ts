import type { StoreData } from "../globals";

export interface Parser<TData extends StoreData> {
	parse<D extends TData>(value: string): D;
	stringify<D extends TData>(value: D): string;
}

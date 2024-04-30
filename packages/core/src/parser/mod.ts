import type { StoreData } from "@/helpers";

export interface Parser<TData extends StoreData> {
	parse<D extends TData>(value: string): D;
	stringify<D extends TData>(value: D): string;
}
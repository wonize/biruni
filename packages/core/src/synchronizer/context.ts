import type { StoreData } from "@/helpers";
import type { Synchronizer } from './interface';

export interface Context<Data extends StoreData> {
	readonly $$type: "synchronizer",
	readonly $$instance: Synchronizer<Data>;
}
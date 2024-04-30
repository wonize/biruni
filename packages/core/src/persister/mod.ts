import type { StoreData } from "@/helpers";

export interface Persister<Data extends StoreData> {
	set<
		CustomData extends string,
		Key extends string
	>(tag: {
		$$value: CustomData;
		$$key?: Key;
	}): Promise<void>;

	get<
		CustomData extends string,
		Key extends string
	>(tag: {
		$$key?: Key;
	}): Promise<{ $$value: CustomData }>;
}

import type { CoreContext, Parser, Persister, Synchronizer, Validator } from '@/context';
import type { StoreData } from "@/helpers";

export interface Struct<Data extends StoreData> {
	synchronizer: Synchronizer<Data>;
	validator: Validator<Data>;
	persister: Persister<Data>;
	parser: Parser<Data>;

	[K: string]: CoreContext<Data>;
}

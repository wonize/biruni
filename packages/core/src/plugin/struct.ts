import type * as Context from '../context';
import type { StoreData } from "../helpers/mod";

export interface PluginStruct<Data extends StoreData> {
	synchronizer: Context.Synchronizer<Data>;
	validator: Context.Validator<Data>;
	persister: Context.Persister<Data>;
	parser: Context.Parser<Data>;
	[K: string]: Context.Core<Data>;
}

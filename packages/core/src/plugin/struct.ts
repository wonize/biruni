import type { CoreContext } from '../context';
import type { StoreData } from '../helpers';

export type PluginStruct<TData extends StoreData> = {
	validator: CoreContext<TData>;
	parser: CoreContext<TData>;
	persister: CoreContext<TData>;
}

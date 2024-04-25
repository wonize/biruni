import type { CoreContext } from '../context';
import type { StoreData } from '../globals';

export type PluginStruct<S extends StoreData> = {
	validator: CoreContext<S>;
	parser: CoreContext<S>;
	persister: CoreContext<S>;
}

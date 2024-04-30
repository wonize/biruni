import type { CoreContext } from '@/context';
import type { StoreData } from '@/helpers';
import type * as Synchronizer from '@/synchronizer';
import type * as Validator from '@/validator';

export type PluginStruct<Data extends StoreData> = {
	synchronizer: Synchronizer.Context<Data>;
	validator: Validator.Context<Data>;
	persister: CoreContext<Data>;
	parser: CoreContext<Data>;
}

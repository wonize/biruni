import { StoreGet } from './get';
import type { StoreData } from './globals';
import type { PluginStruct } from './plugin/struct';
import type { StoreSet } from './set';

class StoreImpl<TData extends StoreData> extends StoreGet<TData> implements Store<TData> {
	public constructor(
		protected initializer: () => TData,
		protected pluginStruct: PluginStruct<TData>,
	) {
		super(pluginStruct);
		this.set(initializer);
	}
}

interface Store<TData extends StoreData> extends StoreGet<TData>, StoreSet<TData> { }

export { StoreImpl as Store };

import { StoreGet } from './get';
import type { StoreData } from './globals';
import type { PluginStruct } from './plugin/struct';
import type { StoreSet } from './set';

class StoreImpl<S extends StoreData> extends StoreGet<S> implements Store<S> {
	public constructor(
		protected initializer: () => NoInfer<S>,
		protected pluginStruct: PluginStruct<S>,
	) {
		super(pluginStruct);
		this.set(initializer);
	}
}

interface Store<S extends StoreData> extends StoreGet<S>, StoreSet<S> { }

export { StoreImpl as Store };

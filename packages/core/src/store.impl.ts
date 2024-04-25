import { StoreGetImpl } from './get.impl';
import type { PluginStruct } from './plugin/struct';
import type { Store } from './store';

export class StoreImpl<S extends Record<string, unknown>> extends StoreGetImpl<S> implements Store<S> {
	public constructor(
		protected initializer: () => NoInfer<S>,
		protected pluginStruct: PluginStruct<S>,
	) {
		super(pluginStruct);
		this.set(initializer);
	}
}

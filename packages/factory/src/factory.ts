import { Store } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import type * as Plugin from '@biruni/core/plugin';
import type { Chain } from './chain';

class PluginChain<Data extends StoreData, Namespace extends string = string>
	implements Chain<Data>
{
	public constructor(
		protected namespace: Namespace,
		protected pluginStack?: Plugin.Stack<Data>
	) {
		this.pluginStack = ([] as any).concat(pluginStack);
	}

	public plug(plugin: Plugin.BiruniPlugin<Data>) {
		plugin.namespace = this.namespace;
		return new PluginChain<Data>(this.namespace, this.pluginStack!.concat(plugin));
	}

	public init<T extends Data>(initializer: () => T) {
		return new Store(initializer, this.pluginStack);
	}
}

function defineBiruni<TData extends StoreData, TSpace extends string>(
	namespace: TSpace
): Chain<TData> {
	return new PluginChain<TData, TSpace>(namespace);
}

export {
	PluginChain as Biruni,
	PluginChain as PluginFactory,
	PluginChain as StoreFactory,
	defineBiruni as biruni,
	defineBiruni as default,
	defineBiruni,
};

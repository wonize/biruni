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
		// @ts-expect-error the `pluginStack` will be fill in runtime
		this.pluginStack = [].concat(pluginStack ?? []);
	}

	plug: Chain<Data>['plug'] = (input) => {
		let $plugins = input as Array<Plugin.BiruniPlugin<Data>>;

		if (
			typeof input === 'object' &&
			input !== null &&
			(!(input instanceof Array) || Array.isArray(input) === false)
		) {
			$plugins = [input];
		}

		$plugins = $plugins.map((plugin) => {
			plugin.namespace = this.namespace;
			return plugin;
		});

		// @ts-expect-error the `this.pluginStack` is always array
		return new PluginChain<Data, Namespace>(this.namespace, this.pluginStack.concat($plugins));
	};

	public init<T extends Data>(initializer: () => T) {
		// @ts-expect-error the `this.pluginStack` is not undefined, also it's will be match with `Plugin.Stack<T>`, because `T` is `Data`.
		return new Store<T>(initializer, this.pluginStack);
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

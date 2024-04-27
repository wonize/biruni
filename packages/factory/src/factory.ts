import type { ExactPlugin, PluginStruct, StoreData } from '@biruni/core';
import Store from '@biruni/core';
import type { StoreFactoryChain } from './chain';

class StoreFactory<S extends StoreData> implements StoreFactoryChain<S> {
	readonly #pluginStruct: PluginStruct<S> = {
		validator: {},
		parser: {},
		persister: {},
	} as PluginStruct<S>;

	public constructor(plugin?: ExactPlugin, comingPluginStruct?: PluginStruct<S>) {
		const pluginStruct = comingPluginStruct;

		if (typeof plugin !== 'function') return;
		const pluginContext = plugin();
		this.#pluginStruct = Object.assign({}, pluginStruct, {
			[pluginContext.$$type]: pluginContext,
		}) as PluginStruct<S>;
	}

	public plug(plugin: ExactPlugin): StoreFactoryChain<S> {
		return new StoreFactory<S>(plugin, this.#pluginStruct);
	}

	public init(initializer: () => NoInfer<S>): Store<S> {
		return new Store<S>(initializer, this.#pluginStruct);
	}
}

function defineBiruni<S extends StoreData>(): StoreFactoryChain<S> {
	return new StoreFactory<S>();
}

export {
	StoreFactory as Biruni,
	StoreFactory,
	defineBiruni as biruni,
	defineBiruni,
};

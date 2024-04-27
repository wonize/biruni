import type { ExactPlugin, PluginStruct, StoreData } from '@biruni/core';
import Store from '@biruni/core';
import type { StoreFactoryChain } from './chain';

class StoreFactory<TData extends StoreData> implements StoreFactoryChain<TData> {
	readonly #pluginStruct: PluginStruct<TData> = {
		validator: {},
		parser: {},
		persister: {},
	} as PluginStruct<TData>;

	public constructor(plugin?: ExactPlugin, comingPluginStruct?: PluginStruct<TData>) {
		const pluginStruct = comingPluginStruct;

		if (typeof plugin !== 'function') return;
		const pluginContext = plugin();
		this.#pluginStruct = Object.assign({}, pluginStruct, {
			[pluginContext.$$type]: pluginContext,
		}) as PluginStruct<TData>;
	}

	public plug(plugin: ExactPlugin): StoreFactoryChain<TData> {
		return new StoreFactory<TData>(plugin, this.#pluginStruct);
	}

	public init<D extends TData>(initializer: () => D): Store<D> {
		return new Store<D>(initializer, this.#pluginStruct);
	}
}

function defineBiruni<TData extends StoreData>(): StoreFactoryChain<TData> {
	return new StoreFactory<TData>();
}

export {
	StoreFactory as Biruni,
	StoreFactory,
	defineBiruni as biruni,
	defineBiruni
};

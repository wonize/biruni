import type { Plugin } from '@biruni/core';
import Store from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import type { StoreFactoryChain } from './chain';

class StoreFactory<Data extends StoreData> implements StoreFactoryChain<Data> {
	readonly #pluginStruct: Plugin.Struct<Data> = {
		validator: {},
		parser: {},
		persister: {},
		synchronizer: {},
	} as Plugin.Struct<Data>;

	public constructor(plugin?: Plugin.Function, comingPluginStruct?: Plugin.Struct<Data>) {
		const pluginStruct = comingPluginStruct;

		if (typeof plugin !== 'function') return;
		const pluginContext = plugin();
		this.#pluginStruct = Object.assign({}, pluginStruct, {
			[pluginContext.$$type]: pluginContext,
		}) as Plugin.Struct<Data>;
	}

	public plug(plugin: Plugin.Function): StoreFactoryChain<Data> {
		return new StoreFactory<Data>(plugin, this.#pluginStruct);
	}

	public init<T extends Data>(initializer: () => T): Store<T> {
		return new Store<T>(initializer, this.#pluginStruct);
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

import type { Plugin, Store } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';

export interface StoreFactoryChain<Data extends StoreData> {
	plug(plugin: Plugin.Function): StoreFactoryChain<Data>;
	init<T extends Data>(initializer: () => T): Store<T>;
}

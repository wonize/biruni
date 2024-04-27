import type { ExactPlugin, Store, StoreData } from '@biruni/core';

export interface StoreFactoryChain<TData extends StoreData> {
	plug(plugin: ExactPlugin): StoreFactoryChain<TData>;
	init(initializer: () => TData): Store<TData>;
}

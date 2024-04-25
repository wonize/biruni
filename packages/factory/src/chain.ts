import type { ExactPlugin, Store, StoreData } from '@biruni/core';

export interface StoreFactoryChain<S extends StoreData> {
	plug(plugin: ExactPlugin): StoreFactoryChain<S>;
	init(initializer: () => NoInfer<S>): Store<S>;
}

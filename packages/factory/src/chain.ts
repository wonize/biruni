import type { ExactPlugin, Store, StoreData } from '@biruni/core';

export interface StoreFactoryChain<TData extends StoreData> {
	plug(plugin: ExactPlugin): StoreFactoryChain<TData>;
	init<T extends TData>(initializer: () => T): Store<T>;
}

import type { Store } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import { BiruniPlugin } from '@biruni/core/plugin';

export interface Chain<Data extends StoreData> {
	plug(plugin: BiruniPlugin<Data>): Chain<Data>;
	init<T extends Data>(initializer: () => T): Store<T>;
}

import type { Store } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import type { BiruniPlugin } from '@biruni/core/plugin';

export interface Chain<Data extends StoreData> {
	plug: ChainPlug<Data>;
	init<T extends Data>(initializer: () => T): Store<T>;
}

interface ChainPlug<Data extends StoreData> {
	(plugin: BiruniPlugin<Data>): Chain<Data>;
	(plugin: Array<BiruniPlugin<Data>>): Chain<Data>;
}

import type { StoreData } from '@biruni/core/helpers';
import { EventEmitterPlugin } from './event/mod';
import { JsonPlugin } from './json/mod';
import { LocalStoragePlugin } from './localstorage/mod';
import type { BiruniPlugin } from '@biruni/core/plugin';

const BasicLocalStorage = <Data extends StoreData>(): Array<BiruniPlugin<Data>> => {
	return [LocalStoragePlugin<Data>(), JsonPlugin<Data>(), EventEmitterPlugin<Data>()] as const;
};

export { BasicLocalStorage };

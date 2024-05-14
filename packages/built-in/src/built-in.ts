import type { StoreData } from '@biruni/core/helpers';
import type { BiruniPlugin } from '@biruni/core/plugin';
import { EventEmitterPlugin } from './event/mod';
import { JsonPlugin } from './json/mod';
import { LocalStoragePlugin } from './localstorage/mod';

const builtins = <Data extends StoreData>(): Array<BiruniPlugin<Data>> => {
	return [LocalStoragePlugin<Data>(), JsonPlugin<Data>(), EventEmitterPlugin<Data>()] as const;
};

export default builtins;
export { builtins as BuiltinPlugin, builtins as LocalStorageCollection, builtins };

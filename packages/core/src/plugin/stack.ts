import type { StoreData } from '../helpers/mod';
import type { BiruniPlugin } from './function';

export type PluginStack<Data extends StoreData> = Array<BiruniPlugin<Data>>;

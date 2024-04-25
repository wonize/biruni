import type { StoreGet } from './get';
import type { StoreData } from './globals';
import type { StoreSet } from './set';

export interface Store<S extends StoreData> extends StoreGet<S>, StoreSet<S> { }

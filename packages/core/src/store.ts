import type { StoreGet } from './get';
import type { StoreSet } from './set';

export interface Store<S extends Record<string, unknown>> extends StoreGet<S>, StoreSet<S> { }

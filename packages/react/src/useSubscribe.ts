import type { Store, StoreData } from '@biruni/core';

export function useSubscribe<
	S extends Store<StoreData>,
	D extends StoreData = S extends Store<infer Data> ? Data : StoreData
>(store: S) {
	throw new Error('[BIRUNI] <useSubscribe> not implemented and in WIP');
}

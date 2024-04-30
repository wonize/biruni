import type { Store } from '@biruni/core';
import type { ExtractStoreData, StoreData } from '@biruni/core/helpers';

export function useSubscribe<
	TStore extends Store<StoreData>,
	TData extends StoreData = ExtractStoreData<TStore>
>(store: TStore) {
	throw new Error('[BIRUNI] <useSubscribe> not implemented and in WIP');
}

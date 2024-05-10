import { Getter, Setter, type GetterSync, type Store } from '@biruni/core';
import type { ExtractStoreData, StoreData } from '@biruni/core/helpers';
import React from 'react';

function useStore<
	TData extends StoreData,
	TStore extends Store<any> = Store<TData>,
	Data extends TData = ExtractStoreData<TStore>,
>(store: TStore): UseStore<NoInfer<Data>> {
	const [data, setData] = React.useState<NoInfer<Data>>(store.data);

	React.useEffect(() => {
		store.addListener('change', function onPostChange(event) {
			setData(() => event.newData);
		});
	}, []);

	const localStore = React.useMemo<UseStore<NoInfer<Data>>>(
		() =>
			({
				set: store.set,
				get: (first?: unknown, second?: unknown): any => {
					if (Getter.isByEntire(first)) {
						return Getter.getByEntire(data);
					} else if (Getter.isKeyOfData(first)) {
						if (Getter.isByKeyMapper(second)) {
							return Getter.getByKeyMapper(data, first, second);
						} else if (Getter.isByKey(second)) {
							return Getter.getByKey(data, first);
						} else {
						}
					} else if (Getter.isByMapper(first)) {
						return Getter.getByMapper(data, first);
					} else if (Getter.isByKeys(first)) {
						return Getter.getByKeys(data, first);
					} else if (Getter.isByTruthy(first)) {
						return Getter.getByTruthy(data, first);
					} else {
					}
				},
			}) satisfies UseStore<NoInfer<Data>>,
		[data]
	);

	return localStore;
}

interface UseStore<Data extends StoreData> {
	set: Setter.Overloads<Data>;
	get: GetterSync.Overloads<Data>;
}

export { useStore };

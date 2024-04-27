import type { Store, StoreData } from '@biruni/core';
import React from 'react';

function useStore<
	TStore extends Store<StoreData>,
	TData extends StoreData = TStore extends Store<infer D> ? D : StoreData
>(store: TStore) {
	const [data, setData] = React.useState<TData>();

	React.useEffect(() => {
		// TODO: some magic of pub/sub in here!
		store.get().then(($$data) => {
			setData(() => {
				return ($$data as unknown as TData)
			});
		});
	}, [store]);

	const $$store = React.useMemo(
		() => ({
			// TODO: resolve promises out-of-box
			/// getSync: NoPromise<StoreGetGeneric<S>>
			/// getSync: () => value;
			set: store.set,
			get: store.get,
		}),
		[data],
	);

	return $$store;
}

export { useStore as useBiruni, useStore };

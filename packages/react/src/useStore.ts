import type { Store, StoreData } from '@biruni/core';
import React from 'react';

function useStore<
	TData extends StoreData,
	TStore extends Store<TData>
>(store: TStore): UseStore<TStore> {
	const [data, setData] = React.useState<NoInfer<TData>>();

	React.useEffect(() => {
		// TODO: some magic of pub/sub in here!
		store.get().then(($$data) => {
			setData(() => {
				return ($$data as any)
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

type UseStore<TStore extends Store<StoreData>> = {
	get: TStore['get'],
	set: TStore['set']
}

export { useStore as useBiruni, useStore };

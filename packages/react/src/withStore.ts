import type { ExtractStoreData, Store, StoreData } from '@biruni/core';
import React from 'react';
import { useStore } from './useStore';

function withStore<
	TStore extends Store<StoreData>,
	TProps extends object = object,
	TData extends StoreData = ExtractStoreData<TStore>,
	TCleanProps = Omit<TProps, keyof TData>,
	TNewProps = TCleanProps & Partial<TData>,
>(Store: TStore, Component: React.ComponentType<TProps & Partial<TNewProps>>) {
	return function EnhancedBiruni<
		Props extends Record<string, unknown>
		& TNewProps
	>(props: Props) {
		const store = useStore(Store);
		const [$$storeData, setData] = React.useState<TData>();

		React.useEffect(() => {
			store.get().then(($$data) => {
				setData(() => $$data as unknown as TData);
			})
		}, []);

		return React.createElement(
			Component,
			Object.assign({}, props, $$storeData) as Props & TProps & TNewProps,
		);
	};
}

export { withStore as withBiruni, withStore };

export type WithStore<
	S extends Store<StoreData>,
	P extends object = object> =
	S extends Store<infer Data> ? Omit<P, keyof Data> & Partial<Data> : P;

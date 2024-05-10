import type { Store } from '@biruni/core';
import type { ExtractStoreData, StoreData } from '@biruni/core/helpers';
import React from 'react';
import { useStore } from './useStore';

function withStore<
	TStore extends Store<StoreData>,
	TProps extends object = object,
	TData extends StoreData = ExtractStoreData<TStore>,
	TCleanProps = Omit<TProps, keyof TData>,
	TNewProps = TCleanProps & Partial<TData>,
>(Store: TStore, Component: React.ComponentType<TProps & Partial<TNewProps>>) {
	return function EnhancedBiruni<Props extends Record<string, unknown> & TNewProps>(
		props: Props
	) {
		const store = useStore(Store);
		return React.createElement(
			Component,
			Object.assign({}, props, store.get()) as Props & TProps & TNewProps
		);
	};
}

export { withStore };

export type WithStore<TStore extends Store<StoreData>, TProps extends object = object> = Omit<
	TProps,
	keyof ExtractStoreData<TStore>
> &
	Partial<ExtractStoreData<TStore>>;

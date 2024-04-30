import { Getter, Setter, type GetterSync, type Store } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import React from 'react';

function useStore<
	TData extends StoreData,
	TStore extends Store<TData>
>(store: TStore): UseStore<TData> {
	const [data, setData] = React.useState<NoInfer<TData>>();

	React.useEffect(() => {
		store.on('postChange', function onStoreChange(event) {
			setData(() => {
				return (event.newData)
			});
		})
	}, []);

	const $$store = React.useMemo<UseStore<TData>>(
		() => ({
			set: store.set,
			get: ((input1?: unknown, input2?: unknown) => {
				if (typeof data === 'undefined') return null;

				if (Getter.isWholeData(input1)) {
					return data;
				} else if (Getter.isKeyOfData(input1)) {
					if (Getter.isSingleKeyMapper(input2)) {
						return input2(data[input1]);
					} else if (Getter.isSingleKey(input2)) {
						return data[input1]
					} else {
						return null;
					}
				} else if (Getter.isMapper(input1)) {
					return input1(data);
				} else if (Getter.isKeyList(input1)) {
					const filtered_data = (input1 as unknown as Array<keyof TData>).reduce((filtered_pairs, key) => {
						return Object.assign({}, filtered_pairs, { [key]: data[key] });
					}, {});
					type Result = GetterSync.KeyListReturnType<TData, typeof input1>;
					return filtered_data as unknown as Result;
				} else if (Getter.isTruthyKeys(input1)) {
					const filtered_data = Object.keys(input1).reduce((filtered_pairs, key) => {
						return (input1 as unknown as Parameters<GetterSync.TruthyKeys<TData>>[0])[key as keyof TData] === true
							? Object.assign({}, filtered_pairs, { [key]: data[key as keyof TData] })
							: Object.assign({}, filtered_pairs);
					}, {});
					type Result = GetterSync.TruthyKeysReturnType<TData, typeof input1>;
					return filtered_data as unknown as Result;
				} else { return null; }
			}) as GetterSync.Overloads<TData>
		}),
		[data],
	);

	return $$store;
}

interface UseStore<Data extends StoreData> {
	get: GetterSync.Overloads<Data>,
	set: Setter.Overloads<Data>,
}

export { useStore };

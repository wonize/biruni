import { Getter, Setter, type GetterSync, type Store } from '@biruni/core';
import type { ExtractStoreData, StoreData } from '@biruni/core/helpers';
import React from 'react';

function useStore<
	TData extends StoreData,
	TStore extends Store<any> = Store<TData>,
	Data extends TData = ExtractStoreData<TStore>,
>(store: TStore): UseStore<NoInfer<Data>> {
	const [data, setData] = React.useState<NoInfer<Data>>(store.initialData);

	React.useEffect(() => {
		store.on('postChange', function onPostChange(event) {
			setData(() => event.newData);
		});
	}, []);

	const $$store = React.useMemo<UseStore<NoInfer<Data>>>(
		() => ({
			set: store.set,
			get: (input1?: unknown, input2?: unknown): any => {

				if (Getter.isWholeData(input1)) {
					return data;
				} else if (Getter.isKeyOfData(input1)) {
					if (Getter.isSingleKeyMapper(input2)) {
						return input2(data[input1]);
					} else if (Getter.isSingleKey(input2)) {
						return data[input1]
					} else { }
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
				} else { }
			}
		} satisfies UseStore<NoInfer<Data>>),
		[data],
	);

	return $$store;
}

interface UseStore<Data extends StoreData> {
	set: Setter.Overloads<Data>,
	get: GetterSync.Overloads<Data>,
}

export { useStore };

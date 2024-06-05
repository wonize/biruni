import { Getter, Setter } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import { create } from 'zustand';

interface PluginActions<Data extends StoreData>
	extends Setter.Methods<Data>,
		Getter.Methods<Data> {}

// interface PluginMeta {
// 	type: 'initializer';
// }

// interface BiruniPlugin<Data extends StoreData> {
// 	initialize(initializer: (data: Data) => PluginActions<Data>): PluginActions<Data>;
// }

export function zustand_plugin<Data extends StoreData>(
	initializer: () => Data
): PluginActions<Data> {
	const store = create<Data & Setter.Methods<Data>>(function zustand_initializer(set) {
		return { ...initializer(), ...actions(set) };
	});

	function actions(
		set: (
			partial:
				| StoreData
				| Partial<StoreData>
				| ((state: StoreData) => StoreData | Partial<StoreData>),
			replace?: boolean | undefined
		) => void
	) {
		return {
			async setByKeyValue(key, value) {
				set((data) => Setter.setByKeyValue(data, key as never, value as never), true);
			},

			async setByKeySetter(key, setter) {
				set((data) => Setter.setByKeySetter(data, key as never, setter as never), true);
			},

			async setByPair(pair) {
				set((data) => Setter.setByPair(data, pair), true);
			},

			async setBySetter(setter) {
				set((data) => Setter.setBySetter(data, setter as never), true);
			},

			// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
			async set(first: unknown, second?: unknown) {},
		} satisfies Setter.Methods<Data>;
	}

	return {
		async getByEntire() {
			return store((data) => Getter.getByEntire(data));
		},

		async getByKey(key) {
			return store((state) => state[key]);
		},

		async getByKeyMapper(key, mapper) {
			return store((data) => Getter.getByKeyMapper(data, key, mapper));
		},

		async getByMapper(mapper) {
			return store((data) => Getter.getByMapper(data, mapper));
		},

		getByTruthy: (async (truthy) => {
			return store((data) => Getter.getByTruthy(data, truthy as never));
		}) as Getter.ByTruthy<Data>,

		getByKeys: (async (keys) => {
			return store((data) => Getter.getByKeys(data, keys));
		}) as Getter.ByKeys<Data>,

		// @ts-expect-error this.get is actual type
		async get(first?: unknown, second?: unknown) {
			if (Getter.isKeyOfData(first)) {
				if (Getter.isByKeyMapper(second)) {
					return this.getByKeyMapper(first, second);
				} else if (Getter.isByKey(second)) {
					return this.getByKey(first);
				}
			} else if (Getter.isByMapper(first)) {
				return this.getByMapper(first);
			} else if (Getter.isByKeys(first)) {
				return this.getByKeys(first);
			} else if (Getter.isByTruthy(first)) {
				return this.getByTruthy(first);
			} else if (Getter.isByEntire(first)) {
				return this.getByEntire();
			}
		},

		async setByKeyValue(key, value) {
			store(async (action) => await action.setByKeyValue(key, value));
		},

		async setByKeySetter(key, setter) {
			store(async (action) => await action.setByKeySetter(key, setter));
		},

		async setByPair(pair) {
			store(async (action) => await action.setByPair(pair));
		},

		async setBySetter(setter) {
			store(async (action) => await action.setBySetter(setter));
		},

		async set(first: unknown, second?: unknown) {
			store(async (action) => await action.set(first as never, second as never));
		},
	};
}

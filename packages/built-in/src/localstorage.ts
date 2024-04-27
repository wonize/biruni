import type { Persister, Plugin, StoreData } from '@biruni/core';

class LocalStoragePersister<S extends StoreData> implements Persister<S> {
	public constructor(private $$key: string) { }

	public async set<T extends string, K extends string>(tag: {
		$$value: T;
		$$key?: K;
	}): Promise<void> {
		return new Promise((resolve) => {
			const $$key = tag.$$key ?? this.$$key;
			localStorage.setItem($$key, tag.$$value);
			return resolve();
		});
	}

	public async get<T extends string, K extends string>(tag: {
		$$key?: K;
	}): Promise<{ $$value: T }> {
		return new Promise((resolve) => {
			const $$key = tag.$$key ?? this.$$key;
			const $$value = localStorage.getItem($$key) as T;
			return resolve({ $$value });
		});
	}
}

const localstorage: Plugin<[key: string]> = (key: string) => {
	return function <TData extends StoreData>() {
		const $$instance = new LocalStoragePersister<TData>(key);

		return {
			$$type: 'persister',
			$$instance: $$instance,
		};
	};
}

export default localstorage;
export {
	localstorage as LocalStoragePlugin,
	localstorage
};

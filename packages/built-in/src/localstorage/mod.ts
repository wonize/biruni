import type { Plugin } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import type { Persister } from '@biruni/core/persister';

class LocalStoragePersister<Data extends StoreData> implements Persister<Data> {
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

const localstorage = (key: string): Plugin.Function => {
	return function <Data extends StoreData>() {
		const $$instance = new LocalStoragePersister<Data>(key);

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

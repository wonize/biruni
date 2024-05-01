import type { Plugin } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import type { Persister } from '@biruni/core/persister';

class LocalStoragePersister<Data extends StoreData> implements Persister<Data> {
	private readonly _storage: Storage;
	public constructor(private $$key: string) {
		this._storage = this._whichLocalStorage();
	}

	public async set<T extends string, K extends string>(tag: {
		$$value: T;
		$$key?: K;
	}): Promise<void> {
		const $$key = tag.$$key ?? this.$$key;
		this._storage.setItem($$key, tag.$$value);
	}

	public async get<T extends string, K extends string>(tag: {
		$$key?: K;
	}): Promise<{ $$value: T }> {
		const $$key = tag.$$key ?? this.$$key;
		const $$value = this._storage.getItem($$key) as T;
		return { $$value };
	}

	private _whichLocalStorage = () => {
		try {
			let stamp = (new Date()).toString();
			const storage = window.localStorage;
			storage.setItem(stamp, stamp);
			const fail = storage.getItem(stamp) != stamp;
			storage.removeItem(stamp);
			return storage;
		} catch (err: unknown) {
			return localStorage;
		}
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
export { localstorage as LocalStoragePlugin, localstorage };

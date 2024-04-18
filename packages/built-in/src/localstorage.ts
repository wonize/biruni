import type { Persister, Plugin } from "@biruni/core";

export class LocalStoragePersister<V extends object> implements Persister<V> {
	public constructor(private $$key: string) { }

	public async set<TValue extends string, TKey extends string>(tag: { $$value: TValue, $$key?: TKey }): Promise<void> {
		return new Promise((resolve) => {
			const $$key = tag.$$key ?? this.$$key;
			localStorage.setItem($$key, tag.$$value);
			return resolve();
		});
	}

	public async get<TValue extends string, TKey extends string>(tag: { $$key?: TKey; }): Promise<{ $$value: TValue; }> {
		return new Promise((resolve) => {
			const $$key = tag.$$key ?? this.$$key;
			const $$value = localStorage.getItem($$key) as TValue;
			return resolve({ $$value });
		});
	}
}

const localPersist: Plugin<[key: string]> = (key: string) => function <TValue extends object>() {
	const $$instance = new LocalStoragePersister<TValue>(key);

	return {
		$$type: 'persister',
		$$instance: $$instance,
	}
}

export {
	localPersist as LocalStoragePlugin,
	localPersist,
	localPersist as localPersistTo,
	localPersist as localstorage
};


import type { Persister } from "../persister/mod";
import type { Plugin } from "../plugin/mod";

class LocalStoragePersister<V extends object> implements Persister<V> {
	public async set<TValue extends string, TKey extends string>(tag: { $$value: TValue, $$key: TKey }): Promise<void> {
		return new Promise(function set(resolve) {
			localStorage.setItem(tag.$$key, tag.$$value);
			return resolve();
		});
	}

	public async get<TValue extends string, TKey extends string>(tag: { $$key: TKey; }): Promise<{ $$value: TValue; }> {
		return new Promise(function get(resolve) {
			const $$value = localStorage.getItem(tag.$$key) as TValue;
			return resolve({ $$value });
		});
	}
}

const LocalStoragePlugin: Plugin<[key: string]> = (key: string) => function <TValue extends object>() {
	const $$instance = new LocalStoragePersister<TValue>();

	return {
		$$type: 'persister',
		$$instance: $$instance,
	}
}

export { LocalStoragePlugin };


import { clone, mergeFresh, type StoreData } from './helpers/mod';
import * as Plugin from './plugin/mod';

import * as Getter from './get/mod';
import * as Listener from './listener/mod';
import * as Setter from './set/mod';

class Store<Data extends StoreData> implements StoreInterface<Data> {
	public constructor(
		initializer: () => Data,
		protected pluginStack: Plugin.Stack<Data>
	) {
		this.get().then((persisted_data) => {
			const comming_data = initializer();
			const data = mergeFresh<Readonly<Data>>(persisted_data, comming_data);
			this.setByEntire(data);
		});
	}

	#data!: Data;
	get data(): Readonly<Data> {
		return clone(this.#data);
	}
	set data(data: Data) {
		this.#data = data;
	}

	// @ts-expect-error the keyof `Data` should be `string`
	has = (key: string): key is keyof Data => {
		if (Object.prototype['hasOwnProperty']?.call(this.data, key)) return true;
		if (Object['hasOwnProperty']?.call(this.data, key)) return true;
		if (Object['keys']?.(this.data)?.indexOf(key) != -1) return true;
		if (Object['hasOwn']?.(this.data, key)) return true;
		return key in this.data;
	};

	// @ts-expect-error the typescript confused `get` accessor of `data` with `get` method
	get: Getter.Overloads<Data> = async (first?: unknown, second?: unknown) => {
		if (Getter.isByEntire<Data>(first)) {
			return this.getByEntire();
		} else if (Getter.isKeyOfData<Data>(first)) {
			if (Getter.isByKeyMapper<Data>(second)) {
				return this.getByKeyMapper(first, second);
			} else if (Getter.isByKey<Data>(second)) {
				return this.getByKey(first);
			} else {
				throw 'Store.get not match to any overloads (+6)';
			}
		} else if (Getter.isByMapper<Data>(first)) {
			return this.getByMapper(first);
		} else if (Getter.isByKeys<Data>(first)) {
			return this.getByKeys(first);
		} else if (Getter.isByTruthy<Data>(first)) {
			return this.getByTruthy(first);
		} else {
			throw 'Store.get not match to any overlaods (+6)';
		}
	};

	getByEntire: Getter.ByEntire<Data> = async () => {
		this.data = await Plugin.preprocess(this.data, this.pluginStack);
		return Getter.getByEntire(this.data);
	};

	getByKey: Getter.ByKey<Data> = async (key) => {
		this.data = await Plugin.preprocess(this.data, this.pluginStack);
		return Getter.getByKey(this.data, key);
	};

	getByKeyMapper: Getter.ByKeyMapper<Data> = async (key, mapper) => {
		this.data = await Plugin.preprocess(this.data, this.pluginStack);
		return Getter.getByKeyMapper(this.data, key, mapper);
	};

	getByKeys: Getter.ByKeys<Data> = async (keys) => {
		this.data = await Plugin.preprocess(this.data, this.pluginStack);
		return Getter.getByKeys(this.data, keys);
	};

	getByMapper: Getter.ByMapper<Data> = async (mapper) => {
		this.data = await Plugin.preprocess(this.data, this.pluginStack);
		return Getter.getByMapper(this.data, mapper);
	};

	getByTruthy: Getter.ByTruthy<Data> = async (truthy) => {
		this.data = await Plugin.preprocess(this.data, this.pluginStack);
		return Getter.getByTruthy(this.data, truthy);
	};

	set: Setter.Overloads<Data> = async (first: unknown, second?: unknown) => {
		if (Setter.isKeyOfData<Data>(first)) {
			if (Setter.isByKeySetter<Data>(second)) {
				return this.setByKeySetter(first, second);
			} else if (Setter.isByKeyValue<Data>(second)) {
				return this.setByKeyValue(first, second);
			}
		} else if (Setter.isBySetter<Data>(first)) {
			return this.setBySetter(first);
		} else if (Setter.isByPair<Data>(first)) {
			return this.setByPair(first);
		} else {
			throw 'Store.set not match to any overlaods (+4)';
		}
	};

	setByKeySetter: Setter.ByKeySetter<Data> = async (key, setter) => {
		this.data = Setter.setByKeySetter(this.data, key, setter);
		await Plugin.postprocess(this.data, this.pluginStack);
	};

	setByKeyValue: Setter.ByKeyValue<Data> = async (key, value) => {
		this.data = Setter.setByKeyValue(this.data, key, value);
		await Plugin.postprocess(this.data, this.pluginStack);
	};

	setByPair: Setter.ByPair<Data> = async (pair) => {
		this.data = Setter.setByPair(this.data, pair);
		await Plugin.postprocess(this.data, this.pluginStack);
	};

	setBySetter: Setter.BySetter<Data> = async (setter) => {
		this.data = Setter.setBySetter(this.data, setter);
		await Plugin.postprocess(this.data, this.pluginStack);
	};

	protected setByEntire = async (data: Data) => {
		this.data = data;
		await Plugin.postprocess(this.data, this.pluginStack);
	};

	addListener: Listener.Add<Data> = (event, listener) => {
		for (const plugin of this.pluginStack) {
			if ('addListener' in plugin && typeof plugin.addListener === 'function') {
				plugin.addListener.call(this, event, listener);
			}
		}
	};
	on: Listener.Add<Data> = (event, listener) => {
		for (const plugin of this.pluginStack) {
			if ('addListener' in plugin && typeof plugin.addListener === 'function') {
				plugin.addListener.call(this, event, listener);
			}
		}
	};

	removeListener: Listener.Remove<Data> = (event, listener) => {
		for (const plugin of this.pluginStack) {
			if ('removeListener' in plugin && typeof plugin.removeListener === 'function') {
				plugin.removeListener.call(this, event, listener);
			}
		}
	};
	off: Listener.Remove<Data> = (event, listener) => {
		for (const plugin of this.pluginStack) {
			if ('removeListener' in plugin && typeof plugin.removeListener === 'function') {
				plugin.removeListener.call(this, event, listener);
			}
		}
	};
}

interface StoreInterface<Data extends StoreData>
	extends Listener.Methods<Data>,
		Getter.Methods<Data>,
		Setter.Methods<Data> {}

export { Store, type StoreInterface };

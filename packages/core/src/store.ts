import { clone, mergeFresh, type StoreData } from './helpers/mod.ts';
import type * as Plugin from './plugin/mod.ts';

import * as Getter from './get/mod.ts';
import type { EmitListener } from './listener/emit.ts';
import * as Listener from './listener/mod.ts';
import * as Setter from './set/mod.ts';

class Store<Data extends StoreData> implements StoreInterface<Data> {
	public constructor(
		initializer: () => Data,
		protected pluginStruct: Plugin.Struct<Data>
	) {
		this.get().then((persisted_data) => {
			const comming_data = initializer();
			const data = mergeFresh<Readonly<Data>>(persisted_data, comming_data);
			this.data = data;
		});
	}

	#data!: Data;
	get data(): Readonly<Data> {
		return clone(this.#data);
	}
	set data(data: Data) {
		this.#data = data;
	}

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
		return Getter.getByEntire(this.data);
	};

	getByKey: Getter.ByKey<Data> = async (key) => {
		return Getter.getByKey(this.data, key);
	};

	getByKeyMapper: Getter.ByKeyMapper<Data> = async (key, mapper) => {
		return Getter.getByKeyMapper(this.data, key, mapper);
	};

	getByKeys: Getter.ByKeys<Data> = async (keys) => {
		return Getter.getByKeys(this.data, keys);
	};

	getByMapper: Getter.ByMapper<Data> = async (mapper) => {
		return Getter.getByMapper(this.data, mapper);
	};

	getByTruthy: Getter.ByTruthy<Data> = async (truthy) => {
		return Getter.getByTruthy(this.data, truthy);
	};

	set: Setter.Overloads<Data> = async (first: unknown, scond?: unknown) => {
		if (Setter.isKeyOfData<Data>(first)) {
			if (Setter.isByKeySetter<Data>(scond)) {
				return this.setByKeySetter(first, scond);
			} else if (Setter.isByKeyValue<Data>(scond)) {
				return this.setByKeyValue(first, scond);
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
	};

	setByKeyValue: Setter.ByKeyValue<Data> = async (key, value) => {
		this.data = Setter.setByKeyValue(this.data, key, value);
	};

	setByPair: Setter.ByPair<Data> = async (pair) => {
		this.data = Setter.setByPair(this.data, pair);
	};

	setBySetter: Setter.BySetter<Data> = async (setter) => {
		this.data = Setter.setBySetter(this.data, setter);
	};

	addListener: Listener.Add<Data> = (event, listener) => {
		// TODO: this.events.map((ev) => ev.on(event, listener));
		this.pluginStruct.synchronizer.$$instance.addListener({
			$$event: event,
			$$listener: listener,
		});
	};
	on: Listener.Add<Data> = (event, listener) => {
		// TODO: this.events.map((ev) => ev.on(event, listener));
		this.pluginStruct.synchronizer.$$instance.addListener({
			$$event: event,
			$$listener: listener,
		});
	};

	removeListener: Listener.Remove<Data> = (event, listener) => {
		this.pluginStruct.synchronizer.$$instance.removeListener({
			$$event: event,
			$$listener: listener,
		});
	};
	off: Listener.Remove<Data> = (event, listener) => {
		this.pluginStruct.synchronizer.$$instance.removeListener({
			$$event: event,
			$$listener: listener,
		});
	};

	protected emit: EmitListener<Data> = (event, payload) => {
		this.pluginStruct.synchronizer.$$instance.emit({
			$$event: event,
			$$payload: payload,
		});
	};
}

interface StoreInterface<Data extends StoreData>
	extends Listener.Methods<Data>,
		Getter.Methods<Data>,
		Setter.Methods<Data> {}

export { Store, type StoreInterface };

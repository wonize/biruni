import { clone, hasOwn, isEmptyObject, mergeFresh, type StoreData } from './helpers/mod';
import type * as Plugin from "./plugin/mod";

import * as Getter from "./get/mod.ts";
import * as Listener from './listener';
import * as Setter from "./set/mod.ts";

class Store<Data extends StoreData> implements StoreInterface<Data> {
	public constructor(
		initializer: () => Data,
		protected pluginStruct: Plugin.Struct<Data>,
	) {
		this.get().then((persisted_data) => {
			const comming_data = initializer();
			const data = mergeFresh<Readonly<Data>>(persisted_data, comming_data);
			this.#data = data;
			this._set(data);
		});
	}

	#data!: Data;
	get data(): Readonly<Data> {
		return clone(this.#data);
	}

	// @ts-expect-error the typescript confused `get` accessor of `data` with `get` method
	get: Getter.Overloads<Data> = (first?: unknown, second?: unknown) => {
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

	public readonly set: Setter.Overloads<Data> = async (a: unknown, b?: unknown) => {
		if (Setter.isKeyOfData<Data>(a)) {
			if (Setter.isKeySetter<Data>(b)) {
				await this.setByKeySetter(a, b);
			} else if (Setter.isKeyValue<Data>(b)) {
				await this.setByKeyValue(a, b);
			}
		} else if (Setter.isSetter<Data>(a)) {
			await this.setBySetter(a);
		} else if (Setter.isPartialData<Data>(a)) {
			await this.setByPartialData(a);
		} else {
			throw 'Store.set not match to any overlaods (+4)';
		}
	};

	private setByKeySetter: Setter.KeySetter<Data> = async (key, mapper) => {
		const old_value = await this.get(key);
		const new_value = mapper(old_value as unknown as Readonly<Parameters<typeof mapper>[number]>);
		const new_data = { [key]: new_value } as unknown as Partial<Data>;
		await this._set(new_data);
	};

	private setByKeyValue: Setter.KeyValue<Data> = async (key, value) => {
		const new_data = { [key]: value } as unknown as Partial<Data>;
		await this._set(new_data);
	};

	private setByPartialData: Setter.PartialData<Data> = async (data) => {
		await this._set(data);
	};

	private setBySetter: Setter.Setter<Data> = async (mapper) => {
		const old_data = await this.get();
		const new_data = mapper(old_data);
		await this._set(new_data);
	};

	private _set = async (newData: Partial<Data>) => {
		const old_data = await this.get();
		const merged_new_data = Object.assign({}, old_data, newData) as unknown as Readonly<Data>;

		this.emitPreChange(newData, old_data, merged_new_data);

		const $$parser = this.pluginStruct?.parser;
		const stringified_data = $$parser.$$instance.stringify(merged_new_data);

		const $$persister = this.pluginStruct?.persister;
		await $$persister.$$instance.set({ $$value: stringified_data });

		this.emitPostChange(newData, old_data, merged_new_data);
	};

	public on: Listener.AddListener<Data> = (event, listener): void => {
		this.pluginStruct.synchronizer.$$instance.addListener({
			$$event: event,
			$$listener: listener
		});
	}

	public addListener: Listener.AddListener<Data> = (event, listener): void => {
		this.pluginStruct.synchronizer.$$instance.addListener({
			$$event: event,
			$$listener: listener
		});
	}

	public off: Listener.RemoveListener<Data> = (event, listener): void => {
		this.pluginStruct.synchronizer.$$instance.removeListener({
			$$event: event,
			$$listener: listener
		});
	}

	public removeListener: Listener.RemoveListener<Data> = (event, listener): void => {
		this.pluginStruct.synchronizer.$$instance.removeListener({
			$$event: event,
			$$listener: listener
		});
	}

	private emitPreChange = <
		NewData extends Partial<Data>
	>(comeData: NewData, oldData: Data, mergedData: Data) => {
		const diffs = this._diff(comeData, oldData, mergedData);
		this.emit('preChange', {
			oldData: diffs.oldData,
			newData: diffs.newData,
			keyDiff: diffs.keyDiff,
			diff: diffs.diff,
			event: 'preChange'
		});
	}

	private emitPostChange = <
		NewData extends Partial<Data>
	>(comeData: NewData, oldData: Data, mergedData: Data) => {
		const diffs = this._diff(comeData, oldData, mergedData);
		this.emit('postChange', {
			oldData: diffs.oldData,
			newData: diffs.newData,
			keyDiff: diffs.keyDiff,
			diff: diffs.diff,
			event: 'postChange'
		});
	}

	private emit: Listener.Emit<Data> = (event, payload) => {
		this.pluginStruct.synchronizer.$$instance.emit({
			$$event: event,
			$$payload: payload
		})
	}

	private _diff = (comeData: Partial<Data>, oldData: Data, mergedData: Data) => {
		return {
			oldData: oldData,
			newData: mergedData,
			keyDiff: Object.keys(comeData) as Array<keyof typeof comeData>,
			diff: Object.keys(comeData).reduce((diff_data, key) => {
				return Object.assign({}, diff_data, {
					[key]: {
						oldValue: isEmptyObject(oldData) ? null : hasOwn(oldData, key) ? oldData[key as keyof Data] : null,
						newValue: isEmptyObject(mergedData) ? null : hasOwn(mergedData, key) ? mergedData[key as keyof Data] : null,
					}
				});
			}, {})
		}
	}
}

interface StoreInterface<Data extends StoreData>
	extends Listener.Methods<Data>,
		Getter.Methods<Data> {
	readonly set: Setter.Overloads<Data>;
}

export { Store, type StoreInterface };

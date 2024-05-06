import { hasOwn, isEmptyObject, mergeFresh, type StoreData } from "./helpers/mod";
import type * as Plugin from "./plugin/mod";

import * as Getter from "./get/mod.ts";
import * as Listener from './listener';
import * as Setter from "./set/mod.ts";

class Store<Data extends StoreData> implements StoreInterface<Data> {
	public constructor(
		initializer: () => Data,
		protected pluginStruct: Plugin.Struct<Data>,
	) {
		this._get().then((persisted_data) => {
			const comming_data = initializer();
			const data = mergeFresh<Readonly<Data>>(persisted_data, comming_data);
			this.#initialData = data;
			this._set(data);
		})
	}

	#initialData!: Readonly<Data>;
	get initialData(): Readonly<Data> {
		return this.#initialData;
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
	}

	// @ts-expect-error 'the unknown is include in mapper types'
	public readonly get: Getter.Overloads<Data> = async (a?: unknown, b?: unknown) => {
		if (Getter.isWholeData<Data>(a)) {
			return this.getByWholeData();
		} else if (Getter.isKeyOfData<Data>(a)) {
			if (Getter.isSingleKeyMapper<Data>(b)) {
				return this.getBySingleKeyMapper(a, b);
			} else if (Getter.isSingleKey<Data>(b)) {
				return this.getByKey(a);
			} else {
				throw ('Store.get not match to any overloads (+6)')
			}
		} else if (Getter.isMapper<Data>(a)) {
			return this.getByMapper(a);
		} else if (Getter.isKeyList<Data>(a)) {
			return this.getByKeyList(a);
		} else if (Getter.isTruthyKeys<Data>(a)) {
			return this.getByTruthyKeys(a);
		} else {
			throw ('Store.get not match to any overlaods (+6)')
		}
	}

	private getByWholeData: Getter.WholeData<Data> = async () => {
		const data = await this._get();
		return data;
	};

	private getBySingleKeyMapper: Getter.KeyMapper<Data> = async (key, mapper) => {
		const data = await this._get();
		return mapper(data[key]);
	}

	private getByKey: Getter.SingleKey<Data> = async (key) => {
		const data = await this._get();
		return data[key];
	}

	private getByMapper: Getter.Mapper<Data> = async (mapper) => {
		const data = await this._get();
		return mapper(data);
	}

	private getByKeyList: Getter.KeyList<Data> = async (keys) => {
		const data = await this._get();
		const filtered_data = (keys as unknown as Array<keyof Data>).reduce((filtered_pairs, key) => {
			return Object.assign({}, filtered_pairs, { [key]: data[key] });
		}, {});
		type Result = Getter.KeyListReturnType<Data, typeof keys>;
		return filtered_data as unknown as Result;
	}

	private getByTruthyKeys: Getter.TruthyKeys<Data> = async (keyPairs) => {
		const data = await this._get();
		const filtered_data = Object.keys(keyPairs).reduce((filtered_pairs, key) => {
			return keyPairs[key as keyof Data] === true
				? Object.assign({}, filtered_pairs, { [key]: data[key as keyof Data] })
				: Object.assign({}, filtered_pairs);
		}, {});
		type Result = Getter.TruthyKeysReturnType<Data, typeof keyPairs>;
		return filtered_data as unknown as Result;
	}

	private _get = async (): Promise<Data> => {
		const $$persister = this.pluginStruct?.persister;
		const $$data = await $$persister.$$instance.get({});

		const $$parser = this.pluginStruct?.parser;
		const parsed_data = $$parser.$$instance.parse($$data.$$value);

		return parsed_data;
	}

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

interface StoreInterface<Data extends StoreData> extends Listener.Methods<Data> {
	readonly set: Setter.Overloads<Data>
	readonly get: Getter.Overloads<Data>
}

export { Store, type StoreInterface };

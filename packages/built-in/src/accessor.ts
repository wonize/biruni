import type { Core } from '@biruni/core';
import { DataFlow } from '@biruni/core/flow';
import type { DataObject as StoreData } from '@biruni/core/helpers';
import { Plugin } from '@biruni/core/plugin';
import * as Getter from './get/mod';
import { hasOwnPropertyPath, type HasOwnPropertyPath } from './has/mod';
import * as Setter from './set/mod';

class GetAccessor<Data extends StoreData> extends Plugin<Data> {
	public constructor() {
		super('accessor.getter');
	}

	public override setup(core: Core<Data, string>): void {
		super.setup(core);
		core.bound('get', this.get.bind(this));
		core.bound('getByKey', this.getByKey.bind(this));
		core.bound('getByKeys', this.getByKeys.bind(this));
		core.bound('getByMapper', this.getByMapper.bind(this));
		core.bound('getByEntire', this.getByEntire.bind(this));
		core.bound('getByTruthy', this.getByTruthy.bind(this));
		core.bound('getByKeyMapper', this.getByKeyMapper.bind(this));
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public get: Getter.Overloads<Data> = (first?: unknown, second?: unknown): any => {
		if (Getter.isByEntire(first)) {
			return this.getByEntire();
		} else if (Getter.isKeyOfData<Data>(first)) {
			if (Getter.isByKeyMapper<Data>(second)) {
				return this.getByKeyMapper(first, second);
			} else if (Getter.isByKey<Data>(second)) {
				return this.getByKey(first);
			} else {
				throw 'Core.get not match to any overloads (+6)';
			}
		} else if (Getter.isByMapper<Data>(first)) {
			return this.getByMapper(first);
		} else if (Getter.isByKeys<Data>(first)) {
			return this.getByKeys(first);
		} else if (Getter.isByTruthy<Data>(first)) {
			return this.getByTruthy(first);
		} else {
			throw 'Core.get not match to any overlaods (+6)';
		}
	};

	public getByKey: Getter.ByKey<Data> = (key) => {
		return this.core.process(DataFlow.OUTPUT, function by_key(data) {
			return Getter.getByKey(data, key);
		}) as unknown as Getter.ByKeyReturnType<Data, typeof key>;
	};

	public getByKeyMapper: Getter.ByKeyMapper<Data> = (key, mapper) => {
		return this.core.process(DataFlow.OUTPUT, function by_key_mapper(data) {
			return Getter.getByKeyMapper(data, key, mapper);
		});
	};

	public getByMapper: Getter.ByMapper<Data> = (mapper) => {
		return this.core.process(DataFlow.OUTPUT, function by_mapper(data) {
			return Getter.getByMapper(data, mapper);
		});
	};

	public getByKeys: Getter.ByKeys<Data> = (keys) => {
		return this.core.process(DataFlow.OUTPUT, function by_keys(data) {
			return Getter.getByKeys(data, keys);
		});
	};

	public getByEntire: Getter.ByEntire<Data> = () => {
		return this.core.process(DataFlow.OUTPUT, function by_entire(data) {
			return Getter.getByEntire(data);
		});
	};

	public getByTruthy: Getter.ByTruthy<Data> = (truthy) => {
		return this.core.process(DataFlow.OUTPUT, function by_truthy(data) {
			return Getter.getByTruthy(data, truthy);
		}) as unknown as Getter.ByTruthyReturnType<Data, typeof truthy>;
	};
}

class SetAccessor<Data extends StoreData> extends Plugin<Data> {
	public constructor() {
		super('accessor.setter');
	}

	public override setup(core: Core<Data, string>): void {
		super.setup(core);
		core.bound('set', this.set.bind(this));
		core.bound('setByPair', this.setByPair.bind(this));
		core.bound('setBySetter', this.setBySetter.bind(this));
		core.bound('setByKey', this.setByKeyValue.bind(this));
		core.bound('setByKeyValue', this.setByKeyValue.bind(this));
		core.bound('setByKeySetter', this.setByKeySetter.bind(this));
	}

	public set: Setter.Overloads<Data> = (first: unknown, second?: unknown) => {
		if (Setter.isKeyOfData<Data>(first)) {
			if (Setter.isByKeySetter<Data>(second)) {
				return this.setByKeySetter(first, second);
			} else if (Setter.isByKeyValue<Data>(second)) {
				return this.setByKeyValue(first, second as never);
			}
		} else if (Setter.isBySetter<Data>(first)) {
			return this.setBySetter(first);
		} else if (Setter.isByPair<Data>(first)) {
			return this.setByPair(first);
		} else {
			throw 'Core.set not match to any overlaods (+4)';
		}
	};

	public setByPair: Setter.ByPair<Data> = (pair) => {
		return this.core.process(DataFlow.INPUT, function by_pair(data) {
			return Setter.setByPair(data, pair);
		});
	};

	public setBySetter: Setter.BySetter<Data> = (setter) => {
		return this.core.process(DataFlow.INPUT, function by_setter(data) {
			return Setter.setBySetter(data, setter);
		});
	};

	public setByKeyValue: Setter.ByKeyValue<Data> = (key, value) => {
		return this.core.process(DataFlow.INPUT, function by_key_value(data) {
			return Setter.setByKeyValue(data, key, value);
		});
	};

	public setByKeySetter: Setter.ByKeySetter<Data> = (key, setter) => {
		return this.core.process(DataFlow.INPUT, function by_key_setter(data) {
			return Setter.setByKeySetter(data, key, setter);
		});
	};
}

class HasAccessor<Data extends StoreData> extends Plugin<Data> {
	public constructor() {
		super('accessor.has');
	}

	public override setup(core: Core<Data, string>): void {
		super.setup(core);
		core.bound('has', this.has.bind(this));
	}

	public has: HasOwnPropertyPath<Data> = (path) => {
		return this.core.process(DataFlow.OUTPUT, function has_property(data) {
			return hasOwnPropertyPath(data, path);
		}) as unknown as boolean;
	};
}

class PropertyAccessor<Data extends StoreData> extends Plugin<Data> {
	public constructor() {
		super('accessor.property');
	}

	public override setup(core: Core<Data, string>): void {
		super.setup(core);
		this.produce_boundaries(core);
	}

	private produce_boundaries(core: Core<Data>): void {
		for (const key in (core as unknown as { data: Data }).data) {
			this.produce_boundary.call(core, key);
		}
	}

	private produce_boundary<Key extends keyof Data>(this: Core<Data>, key: Key) {
		type Value = Data[Key];

		const boundary = function (this: Core<Data>) {
			function boundary(this: Core<Data>, value: Value | null = null) {
				if (value === null) {
					this.process(DataFlow.INPUT, (data) => {
						Object.assign(data, { [key]: value });
						return data;
					});
				}
				return this.process(DataFlow.OUTPUT, (data) => data[key]);
			}

			return boundary.bind(this);
		}.bind(this)();
		this.bound(key as string, boundary);
	}
}

export { GetAccessor, HasAccessor, PropertyAccessor, SetAccessor };

import { Plugin } from './plugin';
import { DataFlow } from './flow';
import type { StoreData } from './helpers/mod';
import type { Core } from './core';
import * as Getter from './get/mod';
import * as Setter from './set/mod';
import { hasOwnPropertyPath, type HasOwnPropertyPath } from './has/mod';

class GetAccessor<Data extends StoreData> extends Plugin<Data> {
	public constructor() {
		super('getter');
	}

	public override setup(core: Core<Data, string>): void {
		super.setup(core);
		core.bound('getByKey', this.getByKey.bind(this));
		core.bound('getByKeys', this.getByKeys.bind(this));
		core.bound('getByMapper', this.getByMapper.bind(this));
		core.bound('getByEntire', this.getByEntire.bind(this));
		core.bound('getByTruthy', this.getByTruthy.bind(this));
		core.bound('getByKeyMapper', this.getByKeyMapper.bind(this));
	}

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
		super('setter');
	}

	public override setup(core: Core<Data, string>): void {
		super.setup(core);
		core.bound('setByPair', this.setByPair.bind(this));
		core.bound('setBySetter', this.setBySetter.bind(this));
		core.bound('setByKey', this.setByKeyValue.bind(this));
		core.bound('setByKeyValue', this.setByKeyValue.bind(this));
		core.bound('setByKeySetter', this.setByKeySetter.bind(this));
	}

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

class HasAcessor<Data extends StoreData> extends Plugin<Data> {
	public constructor() {
		super('has');
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

export { GetAccessor, HasAcessor, SetAccessor };

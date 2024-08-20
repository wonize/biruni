import type { Core } from '@biruni/core';
import { DataFlow } from '@biruni/core/flow';
import type { DataObject as StoreData } from '@biruni/core/helpers';
import { Plugin } from '@biruni/core/plugin';
import * as Getter from './_mod';

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
				throw 'Core.get not match to any overloads (+5)';
			}
		} else if (Getter.isByMapper<Data>(first)) {
			return this.getByMapper(first);
		} else if (Getter.isByKeys<Data>(first)) {
			return this.getByKeys(first);
		} else if (Getter.isByTruthy<Data>(first)) {
			return this.getByTruthy(first);
		} else {
			throw 'Core.get not match to any overlaods (+5)';
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

export { GetAccessor };

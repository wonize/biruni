import type { Core } from '@biruni/core';
import { DataFlow } from '@biruni/core/flow';
import type { DataObject } from '@biruni/core/helpers';
import { Plugin } from '@biruni/core/plugin';
import * as Setter from './_mod';

export class SetAccessor<Data extends DataObject> extends Plugin<Data> {
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

export function setter<Data extends DataObject = DataObject>() {
	return new SetAccessor<Data>();
}

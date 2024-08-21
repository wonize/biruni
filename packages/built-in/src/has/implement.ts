import type { Core } from '@biruni/core';
import { DataFlow } from '@biruni/core/flow';
import type { DataObject, DataObject as StoreData } from '@biruni/core/helpers';
import { Plugin } from '@biruni/core/plugin';
import { hasOwnPropertyPath, type HasOwnPropertyPath } from './has';

export class HasAccessor<Data extends StoreData> extends Plugin<Data> {
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

export function has<Data extends DataObject = DataObject>() {
	return new HasAccessor<Data>();
}

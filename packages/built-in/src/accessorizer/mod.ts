import { DataFlow, Plugin, type Core } from '@biruni/core';
import type { DataObject } from '@biruni/core/helpers';

export class PropertyAccessor<Data extends DataObject> extends Plugin<Data> {
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

export function accessorizer<Data extends DataObject>() {
	return new PropertyAccessor<Data>();
}

export default accessorizer;

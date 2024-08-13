import { Core } from './core';
import { DataFlow } from './flow';
import type { StoreData } from './helpers/mod';

export abstract class Plugin<Data extends StoreData> {
	public readonly flow: DataFlow = DataFlow.NONE;
	public constructor(public readonly name: string) {}

	protected core!: Core<Data>;
	public setup(core: Core<Data>) {
		this.core = core;
	}

	public process(data: Data): Data {
		return data;
	}
}

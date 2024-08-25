import { Core, DataFlow, Plugin } from '@biruni/core';
import type { DataObject } from '@biruni/core/helpers';
import type { ZodSchema } from 'zod';

export class ZodPlugin<Data extends DataObject> extends Plugin<Data> {
	public constructor(private schema: ZodSchema) {
		super('biruni.zod');
	}

	public override flow: DataFlow = DataFlow.INPUT;

	public override setup(core: Core<Data>) {
		super.setup(core);
	}

	public override process(data: Data): Data {
		return this.schema.parse(data);
	}
}

export function zod<Data extends DataObject>(schema: ZodSchema): Plugin<Data> {
	return new ZodPlugin<Data>(schema);
}

export default zod;

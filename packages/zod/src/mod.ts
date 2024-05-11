import type { ContextType } from '@biruni/core/context';
import type { StoreData } from '@biruni/core/helpers';
import * as Plugin from '@biruni/core/plugin';
import type { ZodSchema } from 'zod';

class ZodPlugin<Data extends StoreData> extends Plugin.BiruniPlugin<Data> {
	override type: ContextType = 'validator';
	override name: 'biruni/zod' = 'biruni/zod';

	public constructor(private schema: ZodSchema) {
		super();
	}

	override postprocess: (data: Data) => Promise<Data> = async (data) => {
		return this.schema.parse(data);
	};

	override preprocess: (data: Data) => Promise<Data> = async (data) => {
		return this.schema.parse(data);
	};
}

const zod = <Data extends StoreData>(schema: ZodSchema) => {
	return new ZodPlugin<Data>(schema);
};

export default zod;
export { zod as ZodPlugin, zod };

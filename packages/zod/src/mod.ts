import type { StoreData } from '@biruni/core/helpers';
import * as Plugin from '@biruni/core/plugin';
import type { ZodSchema } from 'zod';

class ZodPlugin<Data extends StoreData> extends Plugin.BiruniPlugin<Data> {
	override type: Plugin.ContextType = 'validator';
	override name = 'biruni/zod' as const;

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

const zod = <Data extends StoreData>(schema: ZodSchema): Plugin.BiruniPlugin<Data> => {
	return new ZodPlugin<Data>(schema);
};

export default zod;
export { zod as ZodPlugin, zod };

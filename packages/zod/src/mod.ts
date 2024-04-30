import type { Plugin } from '@biruni/core';
import { StoreData } from '@biruni/core/helpers';
import { Validator } from '@biruni/core/validator';
import type { ZodSchema } from 'zod';

class ZodValidator<Data extends StoreData> implements Validator<Data> {
	public constructor(private schema: ZodSchema) { }

	public validate<CustomData extends Data>(data: CustomData): boolean {
		return Boolean(this.schema.parse(data));
	}
}

const zod = (schema: ZodSchema): Plugin.Function => {
	return function <Data extends StoreData>() {
		const $$instance = new ZodValidator<Data>(schema);
		return {
			$$type: 'validator',
			$$instance: $$instance,
		};
	};
}

export default zod;
export { zod as ZodPlugin, zod };

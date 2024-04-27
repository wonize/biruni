import type { Plugin } from '@biruni/core';
import type { ZodSchema } from 'zod';

const zod: Plugin<[schema: ZodSchema]> = (schema: ZodSchema) => {
	return function () {
		return {
			$$type: 'validator',
			$$instance: {
				validate(data) {
					return !!schema.parse(data);
				},
			},
		};
	};
}

export default zod;
export { zod as ZodPlugin, zod };

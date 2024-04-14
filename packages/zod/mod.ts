import type { Fn } from '@/core/chain';
import type { ValidatorContext } from '@/core/validator';
import type { ZodSchema } from 'zod';

export function ZodPlugin<TSchema extends ZodSchema, V extends object>(schema: TSchema): Fn<ValidatorContext<V>> {
	return function () {
		return {
			'$$type': 'validator',
			'$$instance': {
				validate(data) {
					return !!schema.parse(data)
				}
			}
		}
	}
}

export * from 'zod';

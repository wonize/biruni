import { ZodSchema, z } from 'zod';
import { mockData } from '@repo/mocks';
import type { StoreData } from '@biruni/core/helpers';
import { BiruniPlugin } from '@biruni/core/plugin';
import * as mod from '@/mod';

describe('zod/mod.ts', () => {
	describe('Module Boundary', () => {
		it('should export <zod> plugin function', () => {
			expect(mod).toHaveProperty('zod');
			expect(mod.zod).toBeTypeOf('function');
		})

		it('should export <zod> function as <ZodPlugin> name', () => {
			expect(mod).toHaveProperty('ZodPlugin');
			expect(mod.ZodPlugin).toStrictEqual(mod.zod);
		})

		it('should export <zod> plugin function as <default>', () => {
			expect(mod).toHaveProperty('default');
			expect(mod.default).toStrictEqual(mod.zod);
		})
	})

	describe('Signature', () => {
		it('should be function', () => {
			expect(mod.zod).toBeTypeOf('function');
			expectTypeOf(mod.zod).toBeFunction();
			expectTypeOf(mod.zod).parameter(0).toEqualTypeOf<ZodSchema>();
			expectTypeOf(mod.zod).returns.toBeObject();
			expectTypeOf(mod.zod).returns.toEqualTypeOf<BiruniPlugin<StoreData>>();
		})

		it('should be have <preprocess> method', () => {
			const mockSchema = z.object({})
			const mockZod = mod.ZodPlugin(mockSchema)
			expect(mockZod).toHaveProperty('preprocess');
			expect(mockZod.preprocess).toBeTypeOf('function');
		})

		it('should be have <postprocess> method', () => {
			const mockSchema = z.object({})
			const mockZod = mod.ZodPlugin(mockSchema)
			expect(mockZod).toHaveProperty('postprocess');
			expect(mockZod.postprocess).toBeTypeOf('function');
		})

		it('should be have <type> property', () => {
			const mockSchema = z.object({})
			const mockZod = mod.ZodPlugin(mockSchema)
			expect(mockZod).toHaveProperty('type');
			expect(mockZod.type).toBeTypeOf('string');
		})

		it('should be have <name> property', () => {
			const mockSchema = z.object({})
			const mockZod = mod.ZodPlugin(mockSchema)
			expect(mockZod).toHaveProperty('name');
			expect(mockZod.name).toBeTypeOf('string');
		})

		it('should be have <namespace> property', () => {
			const mockSchema = z.object({})
			const mockZod = mod.ZodPlugin(mockSchema)
			expect(mockZod).toHaveProperty('namespace');
			expectTypeOf(mockZod.namespace).toMatchTypeOf<string | undefined>();
		})
	})

	describe('Functionality', () => {
		it('should return parsed object from <data> input with same schema', async () => {
			const mockSchema = z.object({
				lang: z.string(),
				value: z.number(),
				theme: z.enum(['DARK', 'LIGHT']),
				currency: z.object({
					amount: z.number().min(0).max(10_000),
					code: z.enum(['USD', 'EUR', 'RUB'])
				})
			})
			const mockZod = mod.ZodPlugin(mockSchema)
			const expected = expect.objectContaining({ ...mockData });
			await expect(mockZod.preprocess(mockData))
				.resolves.toStrictEqual(expected);
			await expect(mockZod.postprocess(mockData))
				.resolves.toStrictEqual(expected);
		})

		it('should return parsed object from <data> input with emit properties not exists in schema', async () => {
			const mockSchema = z.object({
				theme: z.enum(['DARK', 'LIGHT']),
				currency: z.object({
					amount: z.number().min(0).max(10_000),
				})
			})
			const mockZod = mod.ZodPlugin(mockSchema)
			const expected = expect.objectContaining({
				theme: mockData['theme'],
				currency: {
					amount: mockData['currency']['amount'],
				}
			})
			await expect(mockZod.preprocess(mockData))
				.resolves.toStrictEqual(expected);
			await expect(mockZod.postprocess(mockData))
				.resolves.toStrictEqual(expected);
		})

		it('should throw an error when required key in schema is not exists in input object', async () => {
			const mockSchema = z.object({
				lang: z.string(),
				value: z.number(),
				theme: z.enum(['DARK', 'LIGHT']),
				currency: z.object({
					amount: z.number().min(0).max(10_000),
					code: z.enum(['USD', 'EUR', 'RUB'])
				}),
				nonkey: z.string(),
			})
			const mockZod = mod.ZodPlugin(mockSchema)
			await expect(mockZod.preprocess(mockData)).rejects.toThrow();
			await expect(mockZod.postprocess(mockData)).rejects.toThrow();
		})
	})
})

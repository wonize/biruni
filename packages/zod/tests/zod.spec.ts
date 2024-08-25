import * as mod from '@/mod';
import { ZodPlugin } from '@/mod';
import { DataFlow } from '@biruni/core';
import { Plugin } from '@biruni/core/plugin';
import { type MockData, mockData } from '@repo/mocks';
import { ZodSchema, z } from 'zod';

describe('zod', function () {
	it('should have re-export in <mod.ts>', function () {
		expect(mod).toHaveProperty('zod');
	});

	it('is a <function>', function () {
		expectTypeOf(mod.zod).toBeFunction();
		expect(mod.zod).toBeTypeOf('function');
	});

	it('required a <ZodSchema> in first argument', function () {
		expectTypeOf(mod.zod).parameters.toEqualTypeOf<[schema: ZodSchema]>();
	});

	it('return an instance of <Plugin> interface', function () {
		expectTypeOf(mod.zod<MockData>).returns.toMatchTypeOf<Plugin<MockData>>();
	});
});

describe('ZodPlugin', function () {
	it('should have re-export in <mod.ts>', function () {
		expect(mod).toHaveProperty('ZodPlugin');
	});

	it('should have re-export as <default> in <mod.ts>', function () {
		expect(mod).toHaveProperty('default');
		expect(mod['default']).toStrictEqual(mod.ZodPlugin);
	});

	it('have an instance where is compatible with <Plugin> interface', function () {
		expectTypeOf(mod.ZodPlugin<MockData>).instance.toMatchTypeOf<Plugin<MockData>>();
	});

	it('<flow> property is initialized to <INPUT>', function () {
		const instance = new ZodPlugin<MockData>(z.object({}));
		expect(instance.flow).toStrictEqual(DataFlow.INPUT);
	});

	it('process data that matches to the defined <schema>', function () {
		const schema = z.object({
			lang: z.string(),
			value: z.number(),
			theme: z.enum(['DARK', 'LIGHT']),
			currency: z.object({
				amount: z.number().min(0).max(10_000),
				code: z.enum(['USD', 'EUR', 'RUB']),
			}),
		});
		const instance = new ZodPlugin<MockData>(schema);
		expect(instance.process(mockData)).toMatchObject(mockData);
	});

	it('return an object with excluding keys not defined in <schema>', function () {
		const schema = z.object({
			theme: z.enum(['DARK', 'LIGHT']),
			currency: z.object({
				amount: z.number().min(0).max(10_000),
			}),
		});
		const instance = new ZodPlugin<MockData>(schema);
		expect(instance.process(mockData)).toMatchObject({
			theme: mockData['theme'],
			currency: {
				amount: mockData['currency']['amount'],
			},
		});
	});

	it('throws error when input contains invalid value that defined in <schema>', function () {
		const schema = z.object({ theme: z.enum(['DARK', 'LIGHT']) });
		const instance = new ZodPlugin<MockData>(schema);
		// @ts-expect-error the non-typed value accepted
		expect(() => instance.process({ theme: 'DIM_DARK' })).toThrowError();
	});

	it('throws error for missing required keys in <schema>', function () {
		const schema = z.object({ lang: z.enum(['EN', 'FR', 'ES']) });
		const instance = new ZodPlugin<MockData>(schema);
		// @ts-expect-error the non-exists key accepted
		expect(() => instance.process({ langauge: 'EN' })).toThrowError();
	});
});

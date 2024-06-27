import { describe, expect, expectTypeOf, it } from 'vitest';
import { mockData, type MockData } from '@repo/mocks';

import {
	getByEntire,
	isByEntire,
	type GetByEntire,
	type GetByEntireReturnType,
} from '@/get/by-entire';

describe('get/by-entire.ts', () => {
	describe('Verify Signature', () => {
		it('Verify the Function Signature and Return Type of the <isByEntire>', () => {
			expectTypeOf(isByEntire).toBeFunction();
			expectTypeOf(isByEntire).parameter(0).toBeUnknown();
			expectTypeOf(isByEntire).returns.toBeBoolean();
		});

		it('Verify the Type Signature of the <getByEntire> Helper Function', () => {
			expectTypeOf(getByEntire<MockData>).toBeFunction();
			expectTypeOf(getByEntire<MockData>)
				.parameter(0)
				.toEqualTypeOf<MockData>();
			expectTypeOf(getByEntire<MockData>)
				.parameter(1)
				.toBeVoid();
			expectTypeOf(getByEntire<MockData>).returns.toEqualTypeOf<Readonly<MockData>>();
		});

		it('Verify the Type Signature of the <SetByPair> Method Interface', () => {
			expectTypeOf<GetByEntire<MockData>>().toBeFunction();
			expectTypeOf<GetByEntire<MockData>>().parameter(0).toBeVoid();
			expectTypeOf<GetByEntire<MockData>>().returns.toEqualTypeOf<
				Promise<Readonly<MockData>>
			>();
		});

		it('Verify the Return Type Signature of the <SetByPair> Method Interface', () => {
			expectTypeOf<GetByEntireReturnType<MockData>>().toBeObject();
			expectTypeOf<GetByEntireReturnType<MockData>>().toEqualTypeOf<Readonly<MockData>>();
		});
	});

	describe('Test Functionality', () => {
		it('should return cloned base object when is exists and object', () => {
			const base = mockData;
			const result = getByEntire(base);
			expect(result).toMatchObject(base);
			expect(result).not.toBe(base);
			expect(JSON.stringify(result)).toHaveLength(JSON.stringify(base).length);
		});

		it('should return empty object when base object is empty', () => {
			const base = {};
			const result = getByEntire(base);
			expect(result).toMatchObject(base);
			expect(result).not.toBe(base);
			expect(JSON.stringify(result)).toHaveLength(2);
		});

		it('should return empty object when base is non-object', () => {
			const base = 'non-object';
			// @ts-expect-error to test non-object base
			const result = getByEntire(base);
			expect(result).toMatchObject({});
			expect(JSON.stringify(result)).toHaveLength(2);
		});
	});
});

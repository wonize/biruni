import { mockData, type MockData } from '@repo/mocks';
import { describe, expect, expectTypeOf, it } from 'vitest';

import type { Path } from '@/path/mod';
import {
	isByKeyValue,
	isKeyOfData,
	setByKeyValue,
	type SetByKeyValue,
} from '@/set/by-key-value.ts';
import type { DeepPartial } from '@/helpers/deep-partial';

describe('set/by-key-value.ts', () => {
	describe('Verify Signature', () => {
		it('Verify the Function Signature and Return Type of the <isByKeyValue>', () => {
			expectTypeOf(isByKeyValue).toBeFunction();
			expectTypeOf(isByKeyValue).parameter(0).toBeUnknown();
			expectTypeOf(isByKeyValue).returns.toBeBoolean();
		});

		it('Verify the Function Signature and Return Type of the <isKeyOfData>', () => {
			expectTypeOf(isKeyOfData).toBeFunction();
			expectTypeOf(isKeyOfData).parameter(0).toBeUnknown();
			expectTypeOf(isKeyOfData).returns.toBeBoolean();
		});

		it('Verify the Type Signature of the <setByKeyValue> Helper Function', () => {
			expectTypeOf(setByKeyValue<MockData>).toBeFunction();
			expectTypeOf(setByKeyValue<MockData>)
				.parameter(0)
				.toEqualTypeOf<MockData>();
			expectTypeOf(setByKeyValue<MockData>)
				.parameter(1)
				.toEqualTypeOf<Path.From<MockData>>();
			expectTypeOf(setByKeyValue<MockData>)
				.parameter(2)
				.toEqualTypeOf<DeepPartial<Path.At<MockData, Path.From<MockData>>>>();
			expectTypeOf(setByKeyValue<MockData>).returns.toEqualTypeOf<MockData>();
		});

		it('Verify the Type Signature of the <SetByKeyValue> Method Interface', () => {
			expectTypeOf<SetByKeyValue<MockData>>().toBeFunction();
			expectTypeOf<SetByKeyValue<MockData>>()
				.parameter(0)
				.toEqualTypeOf<Path.From<MockData>>();
			expectTypeOf<SetByKeyValue<MockData>>()
				.parameter(1)
				.toEqualTypeOf<DeepPartial<Path.At<MockData, Path.From<MockData>>>>();
			expectTypeOf<SetByKeyValue<MockData>>().returns.toEqualTypeOf<Promise<void>>();
		});
	});

	describe('Test Functionality', () => {
		it('should return updated value with single key and primitive value', () => {
			const expected = { ...mockData, lang: 'FR' };
			const result = setByKeyValue(mockData, 'lang', 'FR');
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		});

		it('should return updated value with single key and nested value', () => {
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			const result = setByKeyValue(mockData, 'currency', { amount: 5000 });
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		});

		it('should return updated value with path key and primitive value', () => {
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			const result = setByKeyValue(mockData, 'currency.amount', 5000);
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		});
	});

	describe('Edge Case', () => {
		it('should avoid add non-exists key to base object', () => {
			const expected = { ...mockData };
			// @ts-expect-error to test non-exists key
			const result = setByKeyValue(mockData, 'nonexists', 'value')
			expect(result).toMatchObject(expected);
		});

		it('should avoid new key even base is empty object', () => {
			// @ts-expect-error to test emtpy data
			const result = setByKeyValue({}, 'newkey', 'value');
			expect(result).toMatchObject({});
		});

		it('should throw an error when setting a value with a non-string key', () => {
			const fn = setByKeyValue;
			// @ts-expect-error to test non-string key
			expect(() => fn(mockData, 123, 'value')).toThrow();
			// @ts-expect-error to test non-string key
			expect(() => fn(mockData, {}, 'value')).toThrow();
		});

		it('should create new base object when base is non-object', () => {
			// @ts-expect-error to test non-object base
			const result = setByKeyValue('non-object', 'lang', 'FR');
			expect(result).toMatchObject({ lang: "FR" });
		});
	});
});

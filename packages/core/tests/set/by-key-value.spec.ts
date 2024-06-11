import { mockData, type MockData } from '@repo/mocks';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

import type { Path } from '@/path/mod';
import {
	isByKeyValue,
	isKeyOfData,
	setByKeyValue,
	type SetByKeyValue,
} from '@/set/by-key-value.ts';

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
				.toEqualTypeOf<Path.At<MockData, Path.From<MockData>>>();
			expectTypeOf(setByKeyValue<MockData>).returns.toEqualTypeOf<MockData>();
		});

		it('Verify the Type Signature of the <SetByKeyValue> Method Interface', () => {
			expectTypeOf<SetByKeyValue<MockData>>().toBeFunction();
			expectTypeOf<SetByKeyValue<MockData>>()
				.parameter(0)
				.toEqualTypeOf<Path.From<MockData>>();
			expectTypeOf<SetByKeyValue<MockData>>()
				.parameter(1)
				.toEqualTypeOf<Path.At<MockData, Path.From<MockData>>>();
			expectTypeOf<SetByKeyValue<MockData>>().returns.toEqualTypeOf<Promise<void>>();
		});
	});

	describe('Test Functionality', () => {
		it('should accept a string key and a non-nullable value', () => {
			// @ts-expect-error key path not exactly infinite
			const fn = vi.fn(setByKeyValue);
			const expected = { ...mockData, lang: 'FR' };
			const result = fn(mockData, 'lang', 'FR');
			expect(fn).toBeCalledTimes(1);
			expect(fn).toBeCalledWith(expect.objectContaining(mockData), 'lang', 'FR');
			expect(fn).toReturnWith(expect.objectContaining(expected));
			expect(result).toMatchObject(expected);
			expect(result).not.toMatchObject(mockData);
			expect(expected).not.toMatchObject(mockData);
		});

		it('should accept a nested key and a value with the correct type', () => {
			const fn = vi.fn(setByKeyValue);
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			/// ts-expect-error to test nested key
			const result = fn(mockData, 'currency', { amount: 5000 });
			expect(result).toMatchObject(expected);
			expect(result).not.toMatchObject(mockData);
			expect(expected).not.toMatchObject(mockData);
			expect(fn).toBeCalledTimes(1);
			expect(fn).toBeCalledWith(
				expect.objectContaining(mockData),
				'currency',
				expect.objectContaining({ amount: 5000 })
			);
			expect(fn).toReturnWith(expect.objectContaining(expected));
		});

		it('should accept a path key and a value with the correct type', () => {
			const fn = vi.fn(setByKeyValue);
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			/// ts-expect-error to test path key
			const result = fn(mockData, 'currency.amount', 5000);
			expect(result).toMatchObject(expected);
			expect(result).not.toMatchObject(mockData);
			expect(expected).not.toMatchObject(mockData);
			expect(fn).toBeCalledTimes(1);
			expect(fn).toBeCalledWith(expect.objectContaining(mockData), 'currency.amount', 5000);
			expect(fn).toReturnWith(expect.objectContaining(expected));
		});
	});

	describe('Edge Case', () => {
		it('should handle when setting a value with a non-exists key', () => {
			const fn = setByKeyValue;
			const expected = { ...mockData, nonexists: 'value' };
			// @ts-expect-error to test non-exists key
			expect(fn(mockData, 'nonexists', 'value')).toMatchObject(expected);
		});

		it('should handle when setting a value with a empty base', () => {
			const fn = setByKeyValue;
			// @ts-expect-error to test emtpy data
			expect(fn({}, 'newkey', 'value')).toMatchObject({ newkey: 'value' });
		});

		it('should throw an error when setting a value with a non-string key', () => {
			const fn = setByKeyValue;
			// @ts-expect-error to test non-string key
			expect(() => fn(mockData, 123, 'value')).toThrow();
			// @ts-expect-error to test non-string key
			expect(() => fn(mockData, {}, 'value')).toThrow();
		});

		it('should throw an error when setting a value with a non-object base', () => {
			const fn = setByKeyValue;
			// @ts-expect-error to test non-object base
			expect(() => fn('non-object', 'key', 'value')).toThrow();
		});
	});
});

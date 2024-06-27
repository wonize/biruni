import { describe, expect, expectTypeOf, it } from 'vitest';
import { mockData, type MockData } from '@repo/mocks';
import { getByKey, isByKey, isKeyOfData } from '@/get/by-key-value';
import type { Path } from '@/path/mod';

describe('get/by-key-value.ts', () => {
	describe('Verify Signature', () => {
		it('Verify the Function Signature and Return Type of the <isByKey>', () => {
			expectTypeOf(isByKey<MockData>).toBeFunction();
			expectTypeOf(isByKey<MockData>)
				.parameter(0)
				.toBeUnknown();
			expectTypeOf(isByKey<MockData>).returns.toBeBoolean();
		});

		it('Verify the Function Signature and Return Type of the <isKeyOfData>', () => {
			expectTypeOf(isKeyOfData<MockData>).toBeFunction();
			expectTypeOf(isKeyOfData<MockData>)
				.parameter(0)
				.toBeUnknown();
			expectTypeOf(isKeyOfData<MockData>).returns.toBeBoolean();
		});

		it('Verify the Type Signature of the <getByKeyValue> Helper Function', () => {
			expectTypeOf(getByKey<MockData>).toBeFunction();
			expectTypeOf(getByKey<MockData>)
				.parameter(0)
				.toEqualTypeOf<MockData>();
			expectTypeOf(getByKey<MockData>)
				.parameter(1)
				.toEqualTypeOf<Path.From<MockData>>();
			expectTypeOf(getByKey<MockData>).returns.toEqualTypeOf<
				Path.At<MockData, Path.From<MockData>> | undefined
			>();
		});
	});

	describe('Test Functionality', () => {
		it('should return single key from base object', () => {
			const base = mockData;
			const result = getByKey(base, 'lang');
			expect(result).toStrictEqual('EN');
		});

		it('should return path key from base object', () => {
			const base = mockData;
			const result = getByKey(base, 'currency.amount');
			expect(result).toStrictEqual(1000);
		});

		it('should return object value from base object', () => {
			const base = mockData;
			const result = getByKey(base, 'currency');
			expect(result).toMatchObject(mockData['currency']);
		});
	});

	describe('Edge Case', () => {
		it('should return <undefined> when key is not exists in base object', () => {
			const base = mockData;
			// @ts-expect-error to be non-exists key
			const result = getByKey(base, 'nonexists');
			expect(result).toBeUndefined();
		});

		it('should return <undefined> when base is empty object', () => {
			const base = {};
			// @ts-expect-error to be empty base object
			const result = getByKey(base, 'lang');
			expect(result).toBeUndefined();
		});

		it('should return <undefined> when base is not object', () => {
			const base = 'mockData';
			// @ts-expect-error to be non-object base
			const result = getByKey(base, 'lang');
			expect(result).toBeUndefined();
		});
	});
});

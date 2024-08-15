import { describe, expect, expectTypeOf, it } from 'vitest';
import { mockData, type MockData } from '@repo/mocks';
import { getByKeys, isByKeys } from '@/get/by-keys';
import type { Path } from '@/path/mod';

describe('get/by-keys.ts', () => {
	describe('Verify Signature', () => {
		it('Verify the Function Signature and Return Type of the <isByKeys>', () => {
			expectTypeOf(isByKeys<MockData>).toBeFunction();
			expectTypeOf(isByKeys<MockData>)
				.parameter(0)
				.toBeUnknown();
			expectTypeOf(isByKeys<MockData>).returns.toBeBoolean();
		});

		it('Verify the Type Signature of the <getByKeys> Helper Function', () => {
			expectTypeOf(getByKeys<MockData>).toBeFunction();
			expectTypeOf(getByKeys<MockData>)
				.parameter(0)
				.toEqualTypeOf<MockData>();
			expectTypeOf(getByKeys<MockData>)
				.parameter(1)
				.toEqualTypeOf<Partial<Array<Path.From<MockData>>>>();
			expectTypeOf(getByKeys<MockData>).returns.toBeObject();
		});
	});

	describe('Test Type-Gaurd', () => {
		it('should return true when input is an Array (indexed object)', () => {
			expect(isByKeys(['index0', 'index1'])).toBeTruthy();
			expect(isByKeys(['index0', 'index1'])).not.toBeFalsy();
			expect(isByKeys(new Array(['index0', 'index1']))).toBeTruthy();
			expect(isByKeys(new Array(['index0', 'index1']))).not.toBeFalsy();
			expect(isByKeys(Array(['index0', 'index1']))).toBeTruthy();
			expect(isByKeys(Array(['index0', 'index1']))).not.toBeFalsy();
		})

		it('should return false when input is not Array (indexed object)', () => {
			expect(isByKeys(null)).toBeFalsy();
			expect(isByKeys(null)).not.toBeTruthy();
			expect(isByKeys(mockData)).toBeFalsy();
			expect(isByKeys(mockData)).not.toBeTruthy();
			expect(isByKeys('string')).toBeFalsy();
			expect(isByKeys('string')).not.toBeTruthy();
			expect(isByKeys(new String('string'))).toBeFalsy();
			expect(isByKeys(new String('string'))).not.toBeTruthy();
			expect(isByKeys(String('string'))).toBeFalsy();
			expect(isByKeys(String('string'))).not.toBeTruthy();
		})
	})

	describe('Test Functionality', () => {
		it('should return single key from base object', () => {
			const base = mockData;
			const result = getByKeys(base, ['lang']);
			expect(result).toMatchObject({ lang: 'EN' });
		});

		it('should return multiple key from base object', () => {
			const base = mockData;
			const result = getByKeys(base, ['lang', 'value']);
			expect(result).toMatchObject({ lang: 'EN', value: 2 });
		});

		it('should return single path key from base object', () => {
			const base = mockData;
			const result = getByKeys(base, ['currency.amount']);
			expect(result).toMatchObject({ currency: { amount: 1000 } });
		});

		it('should return nested value from base object', () => {
			const base = mockData;
			const result = getByKeys(base, ['currency']);
			expect(result).toMatchObject({ currency: { amount: 1000, code: 'USD' } });
		});

		it('should return multiple path key from base object', () => {
			const base = mockData;
			const result = getByKeys(base, ['currency.amount', 'currency.code']);
			expect(result).toMatchObject({ currency: { amount: 1000, code: 'USD' } });
		});

		it('should return mixed keys from base object', () => {
			const base = mockData;
			const result = getByKeys(base, ['currency.amount', 'lang']);
			expect(result).toMatchObject({ currency: { amount: 1000 }, lang: 'EN' });
		});
	});

	describe('Edge Case', () => {
		it('should return empty object when keys is empty', () => {
			const base = mockData;
			const result = getByKeys(base, []);
			expect(result).toStrictEqual({});
		});

		it('should return empty object when base is non-object and keys is empty', () => {
			// @ts-expect-error to test non-object base
			const result = getByKeys('non-object', []);
			expect(result).toStrictEqual({});
		});

		it('should return empty object when base is non-object and keys is not empty', () => {
			// @ts-expect-error to test non-object base
			const result = getByKeys('non-object', ['lang']);
			expect(result).toStrictEqual({});
		});

		it('should return empty object when keys is non-array', () => {
			const base = mockData;
			// @ts-expect-error to test non-object base
			const result = getByKeys(base, 'lang');
			expect(result).toStrictEqual({});
		});
	});
});

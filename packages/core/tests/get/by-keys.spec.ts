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
	});
});

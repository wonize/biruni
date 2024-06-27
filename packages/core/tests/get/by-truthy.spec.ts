import { describe, expect, expectTypeOf, it } from 'vitest';
import { mockData, type MockData } from '@repo/mocks';
import { getByTruthy, isByTruthy } from '@/get/by-truthy';

describe('get/by-truthy.ts', () => {
	describe('Verify Signature', () => {
		it('Verify the Function Signature and Return Type of the <isByTruthy>', () => {
			expectTypeOf(isByTruthy<MockData>).toBeFunction();
			expectTypeOf(isByTruthy<MockData>)
				.parameter(0)
				.toBeUnknown();
			expectTypeOf(isByTruthy<MockData>).returns.toBeBoolean();
		});

		it('Verify the Type Signature of the <getByTruthy> Helper Function', () => {
			expectTypeOf(getByTruthy<MockData>).toBeFunction();
			expectTypeOf(getByTruthy<MockData>)
				.parameter(0)
				.toEqualTypeOf<MockData>();
			expectTypeOf(getByTruthy<MockData>)
				.parameter(1)
				.toBeObject();
			expectTypeOf(getByTruthy<MockData>).returns.toBeObject();
		});
	});

	describe('Test Functionality', () => {
		it('should return single key when is true key', () => {
			const base = mockData;
			const result = getByTruthy(base, { lang: true });
			expect(result).toMatchObject({ lang: 'EN' });
		});

		it('should return nested value when is true key', () => {
			const base = mockData;
			const result = getByTruthy(base, { currency: true });
			expect(result).toMatchObject({ currency: { amount: 1000, code: 'USD' } });
		});

		it('should return nested key when is true key', () => {
			const base = mockData;
			const result = getByTruthy(base, { currency: { amount: true } });
			expect(result).toMatchObject({ currency: { amount: 1000 } });
		});

		it('should return path key when is true key', () => {
			const base = mockData;
			const result = getByTruthy(base, { 'currency.amount': true });
			expect(result).toMatchObject({ currency: { amount: 1000 } });
		});

		it('should return merged multiple path key when is true key', () => {
			const base = mockData;
			const result = getByTruthy(base, { 'currency.amount': true, 'currency.code': true });
			expect(result).toMatchObject({ currency: { amount: 1000, code: 'USD' } });
		});

		it('should return merged conflict false parent path and true nested path keys', () => {
			const base = mockData;
			const result = getByTruthy(base, { currency: false, 'currency.amount': true });
			expect(result).toMatchObject({ currency: { amount: 1000 } });
		});

		it('should return merged conflict false parent nested and true nested keys', () => {
			const base = mockData;
			const result1 = getByTruthy(base, {
				currency: { amount: false },
				'currency.amount': true,
			});
			const result2 = getByTruthy(base, {
				currency: { amount: true },
				'currency.amount': false,
			});
			expect(result1).toMatchObject({ currency: { amount: 1000 } });
			expect(result2).toMatchObject({ currency: { amount: 1000 } });
		});

		it('should return merged mixed true keys', () => {
			const base = { ...mockData, deepest: { deep: { key: 'value' } } };
			const result = getByTruthy(base, {
				currency: { amount: true },
				'deepest.deep.key': true,
				lang: true,
			});
			expect(result).toMatchObject({
				currency: { amount: 1000 },
				deepest: { deep: { key: 'value' } },
				lang: 'EN',
			});
		});

		it('should merge true keys and return deep nested value', () => {
			const base = { ...mockData, deepest: { deep: { key: 'value' } } };
			const result = getByTruthy(base, { deepest: { 'deep.key': true } });
			expect(result).toMatchObject({ deepest: { deep: { key: 'value' } } });
		});
	});

	describe.todo('Edge Case', () => {
		it('should return key include <dot> symbol', () => {
			const base = { ...mockData, 'deep.key': 'value' };
			const result = getByTruthy(base, { 'deep.key': true });
			expect(result).toMatchObject({ 'deep.key': 'value' });
		});
	});
});

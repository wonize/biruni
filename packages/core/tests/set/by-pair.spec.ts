import { describe, it, expect, expectTypeOf } from 'vitest';
import { setByPair, isByPair, type SetByPair } from '@/set/by-pair';
import { mockData, type MockData } from '@repo/mocks';
import type { DeepPartial } from '@/helpers/deep-partial';

describe('set/by-pair.ts', () => {
	describe('Verify Signature', () => {
		it('Verify the Function Signature and Return Type of the <isByPair>', () => {
			expectTypeOf(isByPair<MockData>).toBeFunction();
			expectTypeOf(isByPair<MockData>).parameter(0).toBeUnknown();
			expectTypeOf(isByPair<MockData>).returns.toBeBoolean();
		});

		it('Verify the Type Signature of the <setByPair> Helper Function', () => {
			expectTypeOf(setByPair<MockData>).toBeFunction();
			expectTypeOf(setByPair<MockData>)
				.parameter(0)
				.toEqualTypeOf<MockData>();
			expectTypeOf(setByPair<MockData>)
				.parameter(1)
				.toEqualTypeOf<DeepPartial<MockData>>();
			expectTypeOf(setByPair<MockData>).returns.toEqualTypeOf<MockData>();
		});

		it('Verify the Type Signature of the <SetByPair> Method Interface', () => {
			expectTypeOf<SetByPair<MockData>>().toBeFunction();
			expectTypeOf<SetByPair<MockData>>()
				.parameter(0)
				.toEqualTypeOf<DeepPartial<MockData>>();
			expectTypeOf<SetByPair<MockData>>().returns.toEqualTypeOf<Promise<void>>();
		});
	});

	describe('Test Functionality', () => {
		it('should merge base object to single pair object', () => {
			const expected = { ...mockData, lang: 'FR' };
			const result = setByPair(mockData, { lang: 'FR' });
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should merge base object to nested pair object', () => {
			const expected = { ...mockData, currency: { amount: 5000 } };
			const result = setByPair(mockData, { currency: { amount: 5000 } });
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should return base object when pair is empty object', () => {
			const expected = { ...mockData };
			const result = setByPair(mockData, {});
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should return pair object when base is empty object', () => {
			const expected = { ...mockData };
			const result = setByPair({}, mockData);
			expect(result).toMatchObject(expected);
		})

		it('should return base object when pair is non-object', () => {
			const expected = { ...mockData };
			// @ts-expect-error to test non-object pair
			const result = setByPair(mockData, 'non-object');
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should return pair object when base is non-object', () => {
			const expected = { ...mockData };
			// @ts-expect-error to test non-object base
			const result = setByPair('non-object', mockData);
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should return empty object with non-object both base and pair', () => {
			const expected = {};
			// @ts-expect-error to test non-object base
			const result = setByPair('non-object', 'non-object');
			expect(result).toMatchObject(expected);
		})

		it('should return original base object when pair have non-exists key of base', () => {
			const expected = { ...mockData };
			// @ts-expect-error to test non-exists key
			const result = setByPair(mockData, { 'non-exists': 'value' });
			expect(result).toMatchObject(expected);
			expect(result).not.toMatchObject({ 'non-exists': 'value' });
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})
	});
})

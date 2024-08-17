import { getByTruthy, isByTruthy } from '@/get/by-truthy';
import { mockData, type MockData } from '@repo/mocks';

describe('get/by-truthy.ts', () => {
	describe('Verify Signature', () => {
		it('Verify the Function Signature and Return Type of the <isByTruthy>', () => {
			expectTypeOf(isByTruthy<MockData>).toBeFunction();
			expectTypeOf(isByTruthy<MockData>)
				.parameter(0)
				.toBeUnknown();
			expectTypeOf(isByTruthy<MockData>).returns.toBeBoolean();
			expectTypeOf(isByTruthy<MockData>).guards.toEqualTypeOf<object>();
		});

		it('Verify the Type Signature of the <getByTruthy> Helper Function', () => {
			const truthy = expectTypeOf(getByTruthy<MockData>);
			truthy.toBeFunction();
			truthy.parameter(0).toEqualTypeOf<MockData>();
			truthy.parameter(1).toEqualTypeOf<object>();
			truthy.returns.toEqualTypeOf<object>();
		});
	});

	describe('Test Type-Gaurd', () => {
		it('should return true when input is an object', () => {
			expect(isByTruthy(mockData)).toBeTruthy();
			expect(isByTruthy(mockData)).not.toBeFalsy();
		});

		it('should return false when input is not object', () => {
			expect(isByTruthy(['index0', 'index1'])).toBeFalsy();
			expect(isByTruthy(['index0', 'index1'])).not.toBeTruthy();
			expect(isByTruthy(new Array(['index0', 'index1']))).toBeFalsy();
			expect(isByTruthy(new Array(['index0', 'index1']))).not.toBeTruthy();
			expect(isByTruthy(Array(['index0', 'index1']))).toBeFalsy();
			expect(isByTruthy(Array(['index0', 'index1']))).not.toBeTruthy();
			expect(isByTruthy(null)).toBeFalsy();
			expect(isByTruthy(null)).not.toBeTruthy();
			expect(isByTruthy('string')).toBeFalsy();
			expect(isByTruthy('string')).not.toBeTruthy();
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

	describe('Edge Case', () => {
		it('should return emtpy object when base is non-object', () => {
			const base = 'non-object';
			const result = getByTruthy(base, { lang: 'FR' });
			expect(result).toStrictEqual(expect.objectContaining({}));
		});

		it('should return empty object when truthy is non-object', () => {
			const base = { ...mockData };
			const result = getByTruthy(base, 'non-object');
			expect(result).toStrictEqual(expect.objectContaining({}));
		});

		it('should return empty object when truthy is key is not exists in base', () => {
			const base = { ...mockData };
			const result = getByTruthy(base, { nonexists: true });
			expect(result).toStrictEqual(expect.objectContaining({}));
		});

		it('should return empty object when truthy is empty object', () => {
			const base = { ...mockData, deep: { key: 'value' } };
			const result = getByTruthy(base, { deep: {} });
			expect(result).toStrictEqual(expect.objectContaining({}));
		});

		it.todo('should return key include <dot> symbol', () => {
			const base = { ...mockData, 'deep.key': 'value' };
			const result = getByTruthy(base, { 'deep.key': true });
			expect(result).toMatchObject({ 'deep.key': 'value' });
		});
	});
});

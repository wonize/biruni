import { mockData, type MockData } from '@repo/mocks';
import lodash_merge from 'lodash.merge';
import lodash_clone from 'lodash.clonedeep';
import { describe, it, vi, expect, expectTypeOf } from 'vitest';
import { isBySetter, setBySetter, type SetBySetter, type SetBySetterFunction } from '@/set/by-setter';

describe('set/by-setter.ts', () => {
	describe('Verify Signature', () => {
		it('Verify the Function Signature and Return Type of the <isBySetter>', () => {
			expectTypeOf(isBySetter).toBeFunction();
			expectTypeOf(isBySetter).parameter(0).toBeUnknown();
			expectTypeOf(isBySetter).returns.toBeBoolean();
		});

		it('Verify the Type Signature of the <setBySetter> Helper Function', () => {
			expectTypeOf(setBySetter<MockData>).toBeFunction();
			expectTypeOf(setBySetter<MockData>)
				.parameter(0)
				.toEqualTypeOf<MockData>();
			expectTypeOf(setBySetter<MockData>)
				.parameter(1)
				.toEqualTypeOf<SetBySetterFunction<MockData>>();
			expectTypeOf(setBySetter<MockData>).returns.toEqualTypeOf<MockData>();
		});

		it('Verify the Type Signature of the <SetBySetter> Method Interface', () => {
			expectTypeOf<SetBySetter<MockData>>().toBeFunction();
			expectTypeOf<SetBySetter<MockData>>()
				.parameter(0)
				.toEqualTypeOf<SetBySetterFunction<MockData>>();
			expectTypeOf<SetBySetter<MockData>>().returns.toEqualTypeOf<Promise<void>>();
		});
	});

	describe('Test Functionality', () => {
		it('should merge base object to object from setter return single pair', () => {
			const setter = vi.fn().mockReturnValue({ lang: 'FR' });
			const expected = { ...mockData, lang: 'FR' };
			const result = setBySetter(mockData, setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toReturnWith({ lang: 'FR' });
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should merge base object to oject from setter return nested pair', () => {
			const setter = vi.fn().mockReturnValue({ currency: { amount: 5000 } });
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			const result = setBySetter(mockData, setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toReturnWith({ currency: { amount: 5000 } });
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should return base object when setter return emtpy object', () => {
			const setter = vi.fn().mockReturnValue({});
			const expected = { ...mockData };
			const result = setBySetter(mockData, setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toReturnWith({});
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should return object from setter return when base is non-object', () => {
			const setter = vi.fn().mockReturnValue(mockData);
			const expected = { ...mockData };
			// @ts-expect-error to test non-object base
			const result = setBySetter('non-object', setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith({});
			expect(setter).toReturnWith(expect.objectContaining(mockData));
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should return base object when setter return non-object', () => {
			const expected = { ...mockData };
			let result;

			const setter_string = vi.fn(() => 'non-object');
			// @ts-expect-error to test non-object value from setter
			result = setBySetter(mockData, setter_string);
			expect(setter_string).toBeCalledTimes(1);
			expect(setter_string).toBeCalledWith(expect.objectContaining(mockData));
			expect(result).toMatchObject(expected);

			const setter_function = vi.fn(() => () => ({ lang: "FR" }));
			// @ts-expect-error to test non-object value from setter
			result = setBySetter(mockData, setter_function);
			expect(setter_function).toBeCalledTimes(1);
			expect(setter_function).toBeCalledWith(expect.objectContaining(mockData));
			expect(result).toMatchObject(expected);
		})

		it('should return base object when setter return non-exist keys in base', () => {
			const setter = vi.fn().mockReturnValue({ 'nonexists': { 'deepnonexists': 'value' } });
			const expected = { ...mockData };
			const result = setBySetter(mockData, setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toReturnWith({ 'nonexists': { 'deepnonexists': 'value' } });
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})
	});
})

describe('Verify Lodash <clonedeep> and <merge> Functionality', () => {
	const base = { lang: 'EN', currency: { amount: 1000, code: 'USD' } };

	it('should merge <source> to <base>', () => {
		const cloned_base = lodash_clone(base);
		const source = lodash_clone({ lang: 'FR' });
		const expected = lodash_clone({ lang: 'FR', currency: { amount: 1000, code: 'USD' } });
		const result = lodash_merge(cloned_base, source);
		expect(result).toMatchObject(expected);
		expect(result).not.toBe(base);
		expect(result).not.toBe(source);
	})

	it('should merge deep <source> to <base>', () => {
		const cloned_base = lodash_clone(base);
		const source = lodash_clone({ currency: { amount: 5000 } });
		const expected = lodash_clone({ lang: 'EN', currency: { amount: 5000, code: 'USD' } });
		const result = lodash_merge(cloned_base, source);
		expect(result).toMatchObject(expected);
		expect(result).not.toBe(base);
		expect(result).not.toBe(source);
	})
});

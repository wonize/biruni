import { isBySetter, setBySetter, type SetBySetter, type SetBySetterFunction } from '@/set/by-setter';
import { mockData, type MockData } from '@repo/mocks';
import lodash_merge from 'lodash.merge';
import lodash_clone from 'lodash.clonedeep';
import { describe, it, vi, expect, expectTypeOf } from 'vitest';

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
		it('should call the setter with merge returned values', () => {
			const setter = vi.fn().mockReturnValue({ lang: 'FR' });
			const expected = { ...mockData, lang: 'FR' };
			const result = setBySetter(mockData, setter);
			// FIXME: should pass cloned `mockData` to `setter` but pass `{ ...mockData, lang: "FR" }`
			// // BUT, in `console.log` the `lang: 'FR'` not detected. what???
			// expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toBeCalledTimes(1);
			expect(setter).toReturnWith({ lang: 'FR' });
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should call the setter with nested merge returned values', () => {
			const setter = vi.fn().mockReturnValue({ currency: { amount: 5000 } });
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			const result = setBySetter(mockData, setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toBeCalledTimes(1);
			expect(setter).toReturnWith({ currency: { amount: 5000 } });
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should return original base when setter return empty object', () => {
			const setter = vi.fn().mockReturnValue({});
			const expected = { ...mockData };
			const result = setBySetter(mockData, setter);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toBeCalledTimes(1);
			expect(setter).toReturnWith({});
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		})

		it('should throw for non-object base', () => {
			// @ts-expect-error to test non-object base
			expect(() => setBySetter('non-object', vi.fn())).toThrowError();
		})

		it('should throw for non-object return setter', () => {
			const strg_fn = vi.fn(() => 'non-object');

			// @ts-expect-error to test non-object value from setter
			expect(() => setBySetter(mockData, strg_fn)).toThrowError();
			expect(strg_fn).toBeCalledWith(mockData);
			expect(strg_fn).toBeCalledTimes(1);

			const func_fn = vi.fn(() => () => ({ lang: "FR" }));

			// @ts-expect-error to test non-object value from setter
			expect(() => setBySetter(mockData, func_fn)).toThrowError();
			expect(func_fn).toBeCalledWith(mockData);
			expect(func_fn).toBeCalledTimes(1);
		})

		it('should keep no change when object are non-exist keys shape', () => {
			const setter = vi.fn().mockReturnValue({ 'nonexistskey': { 'deepnonexistskey': 'value' } });
			const expected = { ...mockData };
			const result = setBySetter(mockData, setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toReturnWith({ 'nonexistskey': { 'deepnonexistskey': 'value' } });
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

import { mockData, type MockData } from '@repo/mocks';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

import type { Path } from '@/path/mod';
import {
	isByKeySetter,
	type SetByKeySetterFunction,
	setByKeySetter,
	type SetByKeySetter,
} from '@/set/by-key-setter.ts';
import { isKeyOfData } from '@/set/by-key-value.ts';

describe('set/by-key-setter.ts', () => {
	describe('Verify Signature', () => {
		it('Verify the Function Signature and Return Type of the <isByKeySetter>', () => {
			expectTypeOf(isByKeySetter).toBeFunction();
			expectTypeOf(isByKeySetter).parameter(0).toBeUnknown();
			expectTypeOf(isByKeySetter).returns.toBeBoolean();
		});

		it('Verify the Function Signature and Return Type of the <isKeyOfData>', () => {
			expectTypeOf(isKeyOfData).toBeFunction();
			expectTypeOf(isKeyOfData).parameter(0).toBeUnknown();
			expectTypeOf(isKeyOfData).returns.toBeBoolean();
		});

		it('Verify the Type Signature of the <setByKeySetter> Helper Function', () => {
			expectTypeOf(setByKeySetter<MockData>).toBeFunction();
			expectTypeOf(setByKeySetter<MockData>)
				.parameter(0)
				.toEqualTypeOf<MockData>();
			expectTypeOf(setByKeySetter<MockData>)
				.parameter(1)
				.toEqualTypeOf<Path.From<MockData>>();
			expectTypeOf(setByKeySetter<MockData>)
				.parameter(2)
				.toEqualTypeOf<SetByKeySetterFunction<Path.At<MockData, Path.From<MockData>>, MockData>>();
			expectTypeOf(setByKeySetter<MockData>).returns.toEqualTypeOf<MockData>();
		});

		it('Verify the Type Signature of the <SetByKeySetter> Method Interface', () => {
			expectTypeOf<SetByKeySetter<MockData>>().toBeFunction();
			expectTypeOf<SetByKeySetter<MockData>>()
				.parameter(0)
				.toEqualTypeOf<Path.From<MockData>>();
			expectTypeOf<SetByKeySetter<MockData>>()
				.parameter(1)
				.toEqualTypeOf<SetByKeySetterFunction<Path.At<MockData, Path.From<MockData>>, MockData>>();
			expectTypeOf<SetByKeySetter<MockData>>().returns.toEqualTypeOf<Promise<void>>();
		});
	});

	describe('Test Functionality', () => {
		it('should return changed key in base object with value of setter return', () => {
			const setter = vi.fn().mockReturnValue('FR');
			const expected = { ...mockData, lang: 'FR' };
			const result = setByKeySetter(mockData, 'lang', setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith('EN');
			expect(setter).toReturnWith('FR');
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		});

		it('should return changed nested key in base object with value of setter return', () => {
			const setter = vi.fn().mockReturnValue({ amount: 5000 });
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			const result = setByKeySetter(mockData, 'currency', setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith(expect.objectContaining({ amount: 1000, code: 'USD' }));
			expect(setter).toReturnWith(expect.objectContaining({ amount: 5000 }));
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		});

		it('should return changed path key in base object with value of setter return', () => {
			const setter = vi.fn().mockReturnValue(5000);
			const expected = { ...mockData, currency: { ...mockData['currency'], amount: 5000 } };
			const result = setByKeySetter(mockData, 'currency.amount', setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith(1000);
			expect(setter).toReturnWith(5000);
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		});

		it('should return original object if the setter function does not return value', () => {
			const setter = vi.fn().mockImplementation(() => { });
			const expected = { ...mockData };
			const result = setByKeySetter(mockData, 'lang', setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith('EN');
			expect(setter).toReturnWith(undefined);
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		});

		it('should not call the setter function when the key does not exist', () => {
			const setter = vi.fn().mockReturnValue('value');
			const expected = { ...mockData };
			// @ts-expect-error to test non-exists key
			const result = setByKeySetter(mockData, 'nonexists', setter);
			expect(setter).toBeCalledTimes(0);
			expect(result).toMatchObject(expected);
		});

		it('should return updated object when base is non-object', () => {
			const setter = vi.fn().mockReturnValue('FR');
			const expected = { lang: 'FR' };
			// @ts-expect-error to test non-object base
			const result = setByKeySetter('non-object', 'lang', setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith(undefined);
			expect(setter).toReturnWith('FR');
			expect(result).toMatchObject(expected);
		});

		it('should pass whole entire base object to setter when called with a non-string key', () => {
			const setter = vi.fn().mockReturnValue({ lang: 'FR' });
			// @ts-expect-error to test non-string key
			const result = setByKeySetter(mockData, {}, setter);
			expect(result).toMatchObject({ lang: 'FR' });
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith(expect.objectContaining(mockData));
			expect(setter).toReturnWith({ lang: 'FR' });
		});

		it.todo('should return resolved value if setter function is a Promise', () => {
			const setter = vi.fn().mockImplementation(async () => ('FR'));
			const expected = { ...mockData, lang: 'FR' };
			const result = setByKeySetter(mockData, 'lang', setter);
			expect(setter).toBeCalledTimes(1);
			expect(setter).toBeCalledWith(mockData['lang']);
			expect(setter).toReturnWith(expected['lang']);
			expect(result).toMatchObject(expected);
			expect(result).not.toBe(mockData);
			expect(expected).not.toBe(mockData);
		});
	});
});

import { describe, expect, expectTypeOf, it } from 'vitest';
import { type MockData, mockData } from '@repo/mocks';
import { hasOwnPropertyPath } from '@/has/mod.ts';
import type { Path } from '@/path/mod.ts';

describe('hasOwnPropertyPath', () => {
	it('should verify', () => {
		expectTypeOf(hasOwnPropertyPath<MockData>).toBeFunction();
		expectTypeOf(hasOwnPropertyPath<MockData>).parameter(0).toEqualTypeOf<MockData>();
		expectTypeOf(hasOwnPropertyPath<MockData>).parameter(1).toEqualTypeOf<Path.From<MockData>>();
		expectTypeOf(hasOwnPropertyPath<MockData>).returns.toEqualTypeOf<boolean>();
	})

	it('should pass', () => {
		const result = hasOwnPropertyPath(mockData, 'lang');
		expectTypeOf(result).toBeBoolean();
		expect(result).toBeTruthy();
		expect(result).toStrictEqual(true);
	})

	it('should pass deeply path', () => {
		const result = hasOwnPropertyPath(mockData, 'currency.amount');
		expectTypeOf(result).toBeBoolean();
		expect(result).toBeTruthy();
		expect(result).toStrictEqual(true);
	})


	it('should not pass', () => {
		// @ts-expect-error to test non-exists key
		const result = hasOwnPropertyPath(mockData, 'nonexists');
		expectTypeOf(result).toBeBoolean();
		expect(result).toBeFalsy();
		expect(result).toStrictEqual(false);
	})

	it('throw non-object base', () => {
		// @ts-expect-error to test non-object base
		expect(() => hasOwnPropertyPath('non-object', 'key')).toThrow();
	})
})

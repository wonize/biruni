import type { StoreInterface } from '@biruni/core';
import type * as Path from '@biruni/core/helpers/path-key';
import { mockStore, type MockData } from '@repo/mocks';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

describe('Biruni Has/Have Methods', () => {
	const spy_has = vi.spyOn(mockStore, 'has');

	describe('Verify <mockStore>', () => {
		it('should match the type of StoreInterface<MockData>', async () => {
			expectTypeOf(mockStore).toMatchTypeOf<StoreInterface<MockData>>();
		});
	});

	it('should have the <has> method and be a function', () => {
		expect(mockStore).toHaveProperty('has');
		expect(mockStore.has).toBeTypeOf('function');
		expectTypeOf(mockStore.has).toBeFunction();
		expectTypeOf(mockStore.has).parameter(0).toBeString();
		expectTypeOf(mockStore.has).parameter(0).toMatchTypeOf<Path.From<MockData>>();
	});

	it('should return true for existing path key', () => {
		const result = mockStore.has('currency.amount');
		expect(result).toBeTypeOf('boolean');
		expectTypeOf(result).toBeBoolean();
		expect(result).toBeTruthy();
		expect(result).toEqual(true);
		expect(spy_has).toHaveBeenCalled();
		expect(spy_has).toHaveBeenCalledWith('currency.amount');
		expect(spy_has).toHaveReturned();
		expect(spy_has).toHaveReturnedWith(true);
	});

	it('should return false for non-existing path key', () => {
		// @ts-expect-error wrong path-key for edge case
		const result = mockStore.has('wrong.nonexists.key');
		expect(result).toBeTypeOf('boolean');
		expectTypeOf(result).toBeBoolean();
		expect(result).toBeFalsy();
		expect(result).toEqual(false);
		expect(spy_has).toHaveBeenCalled();
		expect(spy_has).toHaveBeenCalledWith('currency.amount');
		expect(spy_has).toHaveReturned();
		expect(spy_has).toHaveReturnedWith(false);
	});
});

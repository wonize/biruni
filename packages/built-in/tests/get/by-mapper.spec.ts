import { describe, expect, expectTypeOf, it } from 'vitest';
import { mockData, type MockData } from '@repo/mocks';
import { getByMapper, isByMapper } from '@/get/by-mapper';

describe('get/by-mapper.ts', () => {
	describe('Verify Signature', () => {
		it('Verify the Function Signature and Return Type of the <isByMapper>', () => {
			expectTypeOf(isByMapper<MockData>).toBeFunction();
			expectTypeOf(isByMapper<MockData>)
				.parameter(0)
				.toBeUnknown();
			expectTypeOf(isByMapper<MockData>).returns.toBeBoolean();
		});

		it('Verify the Type Signature of the <getByMapper> Helper Function', () => {
			expectTypeOf(getByMapper<MockData>).toBeFunction();
			expectTypeOf(getByMapper<MockData>)
				.parameter(0)
				.toEqualTypeOf<MockData>();
			expectTypeOf(getByMapper<MockData>)
				.parameter(1)
				.toBeFunction();
			expectTypeOf(getByMapper<MockData>).returns.toBeUnknown();
		});
	});

	describe('Test Type-Gaurd', () => {
		it('should return true when input is function', () => {
			const mapper = vi.fn();
			expect(isByMapper(mapper)).toBeTruthy();
			expect(isByMapper(mapper)).not.toBeFalsy();
			expect(mapper).toBeCalledTimes(0);
		})

		it('should return false when input is not function', () => {
			expect(isByMapper('string')).toBeFalsy();
			expect(isByMapper('string')).not.toBeTruthy();
			expect(isByMapper(mockData)).toBeFalsy();
			expect(isByMapper(mockData)).not.toBeTruthy();
		})
	})

	describe('Test Functionality', () => {
		it('should return mapper argument', () => {
			const base = mockData;
			const mapper = vi.fn().mockImplementation((data) => data);
			const result = getByMapper(base, mapper);
			expect(mapper).toBeCalledTimes(1);
			expect(mapper).toBeCalledWith(expect.objectContaining(mockData));
			expect(mapper).toReturnWith(expect.objectContaining(mockData));
			expect(result).toMatchObject(mockData);
		});

		it('should return single value from mapper argument', () => {
			const base = mockData;
			const mapper = vi.fn().mockImplementation((data) => data['lang']);
			const result = getByMapper(base, mapper);
			expect(mapper).toBeCalledTimes(1);
			expect(mapper).toBeCalledWith(expect.objectContaining(mockData));
			expect(mapper).toReturnWith('EN');
			expect(result).toMatchObject('EN');
		});
	});

	describe('Edge Case', () => {
		it('should return base object when mapper is non-function', () => {
			const base = mockData;
			const mapper = 'non-function';
			// @ts-expect-error to test non-function mapper
			const result = getByMapper(base, mapper);
			expect(result).toMatchObject(mockData);
		});
	});
});

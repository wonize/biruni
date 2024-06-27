import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { mockData, type MockData } from '@repo/mocks';
import { getByKeyMapper, isByKeyMapper, type GetByKeyMapper } from '@/get/by-key-mapper';

describe('get/by-key-mapper.ts', () => {
	describe('Verify Signature', () => {
		it('Verify the Function Signature and Return Type of the <isByKeyMapper>', () => {
			expectTypeOf(isByKeyMapper).toBeFunction();
			expectTypeOf(isByKeyMapper).parameter(0).toBeUnknown();
			expectTypeOf(isByKeyMapper).returns.toBeBoolean();
		});

		it('Verify the Type Signature of the <getByKeyMapper> Helper Function', () => {
			expectTypeOf(getByKeyMapper<MockData>).toBeFunction();
			expectTypeOf(getByKeyMapper<MockData>)
				.parameter(0)
				.toEqualTypeOf<MockData>();
			expectTypeOf(getByKeyMapper<MockData>)
				.parameter(1)
				.toBeString();
			expectTypeOf(getByKeyMapper<MockData>)
				.parameter(2)
				.toBeFunction();
			expectTypeOf(getByKeyMapper<MockData>).returns.toEqualTypeOf<unknown>();
		});

		it('Verify the Type Signature of the <SetByKeyMapper> Method Interface', () => {
			expectTypeOf<GetByKeyMapper<MockData>>().toBeFunction();
			expectTypeOf<GetByKeyMapper<MockData>>().parameter(0).toBeString();
			expectTypeOf<GetByKeyMapper<MockData>>().parameter(1).toBeFunction();
			expectTypeOf<GetByKeyMapper<MockData>>().returns.toEqualTypeOf<Promise<unknown>>();
		});
	});

	describe('Test Functionality', () => {
		it('should return same argument of mapper in single key', () => {
			const base = mockData;
			const mapper = vi.fn().mockImplementation((lang) => lang);
			const result = getByKeyMapper(base, 'lang', mapper);
			expect(mapper).toBeCalledTimes(1);
			expect(mapper).toBeCalledWith('EN');
			expect(mapper).toReturnWith('EN');
			expect(result).toStrictEqual('EN');
		});

		it('should return custom string from mapper argument single key', () => {
			const base = mockData;
			const mapper = vi.fn().mockImplementation((lang) => `LANG=${lang}`);
			const result = getByKeyMapper(base, 'lang', mapper);
			expect(mapper).toBeCalledTimes(1);
			expect(mapper).toBeCalledWith('EN');
			expect(mapper).toReturnWith('LANG=EN');
			expect(result).toStrictEqual('LANG=EN');
		});

		it('should return same arguemtn of mappper in nested value', () => {
			const base = mockData;
			const mapper = vi.fn().mockImplementation((currency) => currency);
			const result = getByKeyMapper(base, 'currency', mapper);
			expect(mapper).toBeCalledTimes(1);
			expect(mapper).toBeCalledWith({ amount: 1000, code: 'USD' });
			expect(mapper).toReturnWith({ amount: 1000, code: 'USD' });
			expect(result).toMatchObject({ amount: 1000, code: 'USD' });
		});

		it('should return same argument of mapper in path key', () => {
			const base = mockData;
			const mapper = vi.fn().mockImplementation((currency_amount) => currency_amount);
			const result = getByKeyMapper(base, 'currency.amount', mapper);
			expect(mapper).toBeCalledTimes(1);
			expect(mapper).toBeCalledWith(1000);
			expect(mapper).toReturnWith(1000);
			expect(result).toStrictEqual(1000);
		});
	});

	describe('Edge Case', () => {
		it('should return same value of single when mapper is not function', () => {
			const base = mockData;
			// @ts-expect-error to test non-function mapper
			const result = getByKeyMapper(base, 'lang', 'non-function');
			expect(result).toStrictEqual('EN');
		});

		it('should return same value of single when mapper is not function', () => {
			const base = mockData;
			// @ts-expect-error to test non-function mapper
			const result = getByKeyMapper(base, 'lang', 'non-function');
			expect(result).toStrictEqual('EN');
		});
	});
});

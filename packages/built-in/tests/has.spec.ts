import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { mockData, mockStore, type MockData } from '@repo/mocks';
import * as has from '@/has/mod';
import type { Path } from '@/path/mod.ts';
import type { StoreInterface } from '@/store.ts';


describe.todo('Method <has>', () => {
	describe('mocked has', () => {
		const spy = vi.spyOn(has, 'hasOwnPropertyPath');

		it('should pass', () => {
			const result = mockStore.has('lang');
			expect(result).toBe(true);
			expect(spy).toBeCalledTimes(1);
			expect(spy).toBeCalledWith(mockData, 'lang');
		})
	})

	describe('has spy', () => {
		class BoundedStore {
			constructor() {
				this.data = mockData;
				this.has = has.hasOwnPropertyPath.bind(this, this.data) as unknown as has.HasOwnPropertyPath<MockData>;
			}
			data: MockData;
			has: has.HasOwnPropertyPath<MockData>;

		}

		const stubStore = {
			has: has.hasOwnPropertyPath.bind(null, mockData) as unknown as has.HasOwnPropertyPath<MockData>,
		}

		const mockBoundedStore = new BoundedStore();

		it('should pass', () => {
			const result = stubStore.has('lang');
			expect(result).toBe(true);
		})

		it('should be also pass', () => {
			const result = mockBoundedStore.has('lang');
			expect(result).toBe(true);
		})

	})
});

/* describe.todo('Biruni Has/Have Methods', () => {
	const spy_has = vi.spyOn(mockStore, 'has');

	console.log({ mockStore: mockStore.has.toString() });

	it('should match the type of StoreInterface<MockData>', async () => {
		expectTypeOf(mockStore).toMatchTypeOf<StoreInterface<MockData>>();
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
}); */

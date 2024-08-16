import type { GetByEntire } from '@/get/by-entire';
import type { GetByKeyMapper } from '@/get/by-key-mapper';
import type { GetByKey } from '@/get/by-key-value';
import type { GetByKeys } from '@/get/by-keys';
import type { GetByMapper } from '@/get/by-mapper';
import type { GetByTruthy } from '@/get/by-truthy';
import type { GetInterface } from '@/get/methods';
import type { GetOverloads } from '@/get/overloads';
import type { MockData } from '@repo/mocks';

describe('get/methods.ts', () => {
	it('should have 5 method related started with "get" keyword', () => {
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('get');
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('getByEntire');
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('getByKey');
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('getByKeyMapper');
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('getByMapper');
	});

	it('should match <get> overloaded signature method', () => {
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('get');
		expectTypeOf<GetInterface<MockData>['get']>().toBeFunction();
		expectTypeOf<GetInterface<MockData>['get']>().toEqualTypeOf<GetOverloads<MockData>>();
	});

	it('should match <getByEntire> signature method', () => {
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('getByEntire');
		expectTypeOf<GetInterface<MockData>['getByEntire']>().toBeFunction();
		expectTypeOf<GetInterface<MockData>['getByEntire']>().toEqualTypeOf<
			GetByEntire<MockData>
		>();
	});

	it('should match <getByKeyValue> signature method', () => {
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('getByKey');
		expectTypeOf<GetInterface<MockData>['getByKey']>().toBeFunction();
		expectTypeOf<GetInterface<MockData>['getByKey']>().toEqualTypeOf<GetByKey<MockData>>();
	});

	it('should match <getByKeyMapper> signature method', () => {
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('getByKeyMapper');
		expectTypeOf<GetInterface<MockData>['getByKeyMapper']>().toBeFunction();
		expectTypeOf<GetInterface<MockData>['getByKeyMapper']>().toEqualTypeOf<
			GetByKeyMapper<MockData>
		>();
	});

	it('should match <getByMapper> signature method', () => {
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('getByMapper');
		expectTypeOf<GetInterface<MockData>['getByMapper']>().toBeFunction();
		expectTypeOf<GetInterface<MockData>['getByMapper']>().toEqualTypeOf<
			GetByMapper<MockData>
		>();
	});

	it('should match <getByKeys> signature method', () => {
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('getByKeys');
		expectTypeOf<GetInterface<MockData>['getByKeys']>().toBeFunction();
		expectTypeOf<GetInterface<MockData>['getByKeys']>().toEqualTypeOf<GetByKeys<MockData>>();
	});

	it('should match <getByTruthy> signature method', () => {
		expectTypeOf<GetInterface<MockData>>().toHaveProperty('getByTruthy');
		expectTypeOf<GetInterface<MockData>['getByTruthy']>().toBeFunction();
		expectTypeOf<GetInterface<MockData>['getByTruthy']>().toEqualTypeOf<
			GetByTruthy<MockData>
		>();
	});
});

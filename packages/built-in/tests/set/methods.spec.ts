import { expectTypeOf, describe, it } from 'vitest';
import type { MockData } from '@repo/mocks';
import type { SetInterface } from '@/set/methods';
import type { SetOverloads } from '@/set/overloads';
import type { SetByPair } from '@/set/by-pair';
import type { SetByKeyValue } from '@/set/by-key-value';
import type { SetByKeySetter } from '@/set/by-key-setter';
import type { SetBySetter } from '@/set/by-setter';

describe('set/methods.ts', () => {
	it('should have 5 method related started with "set" keyword', () => {
		expectTypeOf<SetInterface<MockData>>().toHaveProperty('set');
		expectTypeOf<SetInterface<MockData>>().toHaveProperty('setByPair');
		expectTypeOf<SetInterface<MockData>>().toHaveProperty('setByKeyValue');
		expectTypeOf<SetInterface<MockData>>().toHaveProperty('setByKeySetter');
		expectTypeOf<SetInterface<MockData>>().toHaveProperty('setBySetter');
	});

	it('should match <set> overloaded signature method', () => {
		expectTypeOf<SetInterface<MockData>>().toHaveProperty('set');
		expectTypeOf<SetInterface<MockData>['set']>().toBeFunction();
		expectTypeOf<SetInterface<MockData>['set']>().toEqualTypeOf<SetOverloads<MockData>>();
	});

	it('should match <setByPair> signature method', () => {
		expectTypeOf<SetInterface<MockData>>().toHaveProperty('setByPair');
		expectTypeOf<SetInterface<MockData>['setByPair']>().toBeFunction();
		expectTypeOf<SetInterface<MockData>['setByPair']>().toEqualTypeOf<SetByPair<MockData>>();
	});

	it('should match <setByKeyValue> signature method', () => {
		expectTypeOf<SetInterface<MockData>>().toHaveProperty('setByKeyValue');
		expectTypeOf<SetInterface<MockData>['setByKeyValue']>().toBeFunction();
		expectTypeOf<SetInterface<MockData>['setByKeyValue']>().toEqualTypeOf<SetByKeyValue<MockData>>();
	});

	it('should match <setByKeySetter> signature method', () => {
		expectTypeOf<SetInterface<MockData>>().toHaveProperty('setByKeySetter');
		expectTypeOf<SetInterface<MockData>['setByKeySetter']>().toBeFunction();
		expectTypeOf<SetInterface<MockData>['setByKeySetter']>().toEqualTypeOf<SetByKeySetter<MockData>>();
	});

	it('should match <setBySetter> signature method', () => {
		expectTypeOf<SetInterface<MockData>>().toHaveProperty('setBySetter');
		expectTypeOf<SetInterface<MockData>['setBySetter']>().toBeFunction();
		expectTypeOf<SetInterface<MockData>['setBySetter']>().toEqualTypeOf<SetBySetter<MockData>>();
	});
});

import { describe, expect, expectTypeOf, test } from 'vitest';
import { getByPath } from '@/core/get/by-path.ts';
import type { ToPathKey, ValueOfPathKey } from '@/core/helpers/path-key.ts';

describe('getByPath', () => {
	interface FakeObject {
		parent: {
			child: readonly ['FIRST_TUPLE', 'SECOND_TUPLE'];
			nested: {
				child: 'FIRST_UNION' | 'SECOND_UNION';
			}
		};
		sibling: {
			value: 'FIRST_VALUE' | 'SECOND_VALUE';
		};
	}

	type FakeObjectPathWithDotSeparated =
		| 'parent'
		| 'parent.child'
		| 'parent.child.0'
		| 'parent.child.1'
		| 'parent.nested'
		| 'parent.nested.child'
		| 'sibling'
		| 'sibling.value'

	type FakeObjectPathWithSlashSeparated =
		| 'parent'
		| 'parent/child'
		| 'parent/child/0'
		| 'parent/child/1'
		| 'parent/nested'
		| 'parent/nested/child'
		| 'sibling'
		| 'sibling/value'

	const fakeObject: FakeObject = {
		parent: {
			child: ['FIRST_TUPLE', 'SECOND_TUPLE'],
			nested: {
				child: 'FIRST_UNION'
			}
		},
		sibling: {
			value: 'SECOND_VALUE'
		}
	} as const

	describe('Type-Safety', () => {
		test('should be Union of Path String seperated by default "."', () => {
			expectTypeOf<ToPathKey<FakeObject>>().toBeString();
			expectTypeOf<ToPathKey<FakeObject>>().toEqualTypeOf<FakeObjectPathWithDotSeparated>()
		})

		test('should be Union of Path String seperated by passed "/"', () => {
			expectTypeOf<ToPathKey<FakeObject, '/'>>().toBeString();
			expectTypeOf<ToPathKey<FakeObject, '/'>>().toEqualTypeOf<FakeObjectPathWithSlashSeparated>()
		})

		test('should be Value of passed path separated with default "."', () => {
			expectTypeOf<ValueOfPathKey<FakeObject, 'parent.nested'>>().toBeObject();
			expectTypeOf<ValueOfPathKey<FakeObject, 'parent.nested'>>().toEqualTypeOf<FakeObject['parent']['nested']>()
		})

		test('should be Value of passed path separated with passed "/"', () => {
			expectTypeOf<ValueOfPathKey<FakeObject, 'parent/nested', '/'>>().toBeObject();
			expectTypeOf<ValueOfPathKey<FakeObject, 'parent/nested', '/'>>().toEqualTypeOf<FakeObject['parent']['nested']>()
		})
	})

	test('Return Value separated with default "."', () => {
		expect(getByPath(fakeObject, 'parent.nested')).toBeTypeOf('object');
		expect(getByPath(fakeObject, 'parent.nested')).toMatchObject(fakeObject.parent.nested);
		expectTypeOf(getByPath(fakeObject, 'parent.nested')).toEqualTypeOf<FakeObject['parent']['nested']>()
	})

	test('Return Value separated with passed "/"', () => {
		expect(getByPath(fakeObject, 'parent/nested', '/')).toBeTypeOf('object');
		expect(getByPath(fakeObject, 'parent/nested', '/')).toMatchObject(fakeObject.parent.nested);
		expectTypeOf(getByPath(fakeObject, 'parent/nested', '/')).toEqualTypeOf<FakeObject['parent']['nested']>()
	})
})
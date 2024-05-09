import { describe, expect, expectTypeOf, test } from 'vitest';
import { getByPath } from '@/core/get/by-path-value.ts';
import type * as Path from '@/core/helpers/path-key.ts';

describe.todo('Core/getByPath()', () => {
	interface FakeObject {
		parent: {
			child: readonly ['FIRST_TUPLE', 'SECOND_TUPLE'];
			nested: {
				child: 'FIRST_UNION' | 'SECOND_UNION';
			};
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
		| 'sibling.value';

	type FakeObjectPathWithSlashSeparated =
		| 'parent'
		| 'parent/child'
		| 'parent/child/0'
		| 'parent/child/1'
		| 'parent/nested'
		| 'parent/nested/child'
		| 'sibling'
		| 'sibling/value';

	const fakeObject: FakeObject = {
		parent: {
			child: ['FIRST_TUPLE', 'SECOND_TUPLE'],
			nested: {
				child: 'FIRST_UNION',
			},
		},
		sibling: {
			value: 'SECOND_VALUE',
		},
	} as const;

	describe('Type Checking', () => {
		test('should be Union of Path String seperated by default "."', () => {
			expectTypeOf<Path.From<FakeObject>>().toBeString();
			expectTypeOf<Path.From<FakeObject>>().toEqualTypeOf<FakeObjectPathWithDotSeparated>();
		});

		test('should be Union of Path String seperated by passed "/"', () => {
			expectTypeOf<Path.From<FakeObject, '/'>>().toBeString();
			expectTypeOf<
				Path.From<FakeObject, '/'>
			>().toEqualTypeOf<FakeObjectPathWithSlashSeparated>();
		});

		test('should be Value of passed path separated with default "."', () => {
			expectTypeOf<Path.At<FakeObject, 'parent.nested'>>().toBeObject();
			expectTypeOf<Path.At<FakeObject, 'parent.nested'>>().toEqualTypeOf<
				FakeObject['parent']['nested']
			>();
		});

		test('should be Value of passed path separated with passed "/"', () => {
			expectTypeOf<Path.At<FakeObject, 'parent/nested', '/'>>().toBeObject();
			expectTypeOf<Path.At<FakeObject, 'parent/nested', '/'>>().toEqualTypeOf<
				FakeObject['parent']['nested']
			>();
		});
	});

	test('Default Delimiter <".">', () => {
		expect(getByPath(fakeObject, 'parent.nested')).toBeTypeOf('object');
		expect(getByPath(fakeObject, 'parent.nested')).toMatchObject(fakeObject.parent.nested);
		expectTypeOf(getByPath(fakeObject, 'parent.nested')).toEqualTypeOf<
			FakeObject['parent']['nested']
		>();
	});

	test('Custom Delimiter <"/">', () => {
		expect(getByPath(fakeObject, 'parent/nested', '/')).toBeTypeOf('object');
		expect(getByPath(fakeObject, 'parent/nested', '/')).toMatchObject(fakeObject.parent.nested);
		expectTypeOf(getByPath(fakeObject, 'parent/nested', '/')).toEqualTypeOf<
			FakeObject['parent']['nested']
		>();
	});
});

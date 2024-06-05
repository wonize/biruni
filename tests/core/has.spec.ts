import { expectTypeOf, describe, it, expect } from 'vitest';
import { biruni } from 'biruni';
import { recommended } from 'biruni/built-in';
import { hasOwnPropertyPath } from '@biruni/core/has/mod';

// TODO: replace the actual `biruni` with mocked plain object: `{ has: hasOwnPropertyByPath.bind(null, data); }`

describe.only('Core/Has', function () {
	interface MockData {
		parent: {
			child: 'value-1' | 'value-2';
		};
		sibling: 'value-a' | 'value-b';
	}

	it('should accept string as first index of string', function () {
		const store = biruni<MockData, 'mock-namespace'>('mock-namespace')
			.plug(recommended())
			.init(function initialize() {
				return {
					parent: {
						child: 'value-1',
					},
					sibling: 'value-b',
				};
			});

		expect(store.has).toBeTypeOf('function');
		expectTypeOf(store.has).toBeFunction();
		expect(store.has('parent.child')).toBeTypeOf('boolean');
		expectTypeOf(store.has('parent.child')).toBeBoolean();
		expect(store.has('parent.child')).toStrictEqual(true);
	});
});

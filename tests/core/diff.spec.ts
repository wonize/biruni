import { diff, type Diff } from '@/core/listener/diff.ts';
import type { MockData } from '__mocks__/mock-store.ts';
import { describe, expect, test } from 'vitest';

describe.todo('Core/diff()', () => {
	test('Indication Diff Keys and Values', () => {
		const source: MockData = {
			lang: 'EN', // changed
			theme: 'DARK',
			value: 2,
		};

		const target: MockData = {
			lang: 'ES', // changed
			theme: 'DARK',
			value: 2,
		};

		const diffExpect: Diff<typeof source, typeof target, MockData> = {
			source: source,
			target: target,
			keys: ['lang'] as never,
			diff: {
				lang: {
					source: source['lang'],
					target: target['lang'],
				},
			},
		};

		expect(diff(source, target)).toMatchObject(diffExpect);
	});

	test('Typecheck', () => {
		type DiffInput = Diff<
			{ lang: 'EN'; theme: 'DARK' },
			{ lang: 'ES'; theme: 'DARK' },
			{ lang: 'EN' | 'ES'; theme: 'DARK' }
		>;

		interface DiffExpect {
			source: { lang: 'EN'; theme: 'DARK' };
			target: { lang: 'ES'; theme: 'DARK' };
			diff: { lang: { source: 'EN'; target: 'ES' } };
			keys: ['lang'];
		}

		// @ts-expect-error the `keys` property should be keyof diff property
		expectTypeOf<DiffInput>().toEqualTypeOf<DiffExpect>();
	});
});

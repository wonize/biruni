import { diff, type Diff } from '@/listener/diff';
import { mockData, type MockData } from '@repo/mocks';

describe('listener/diff.ts', () => {
	describe('Verify Signature', () => {
		it('Verify Parameters and Returns', () => {
			expect(diff<MockData, MockData>).toBeTypeOf('function');
			expectTypeOf(diff<MockData, MockData>).toBeFunction();
			expectTypeOf(diff<MockData, MockData>)
				.parameter(0)
				.toBeObject();
			expectTypeOf(diff<MockData, MockData>)
				.parameter(1)
				.toBeObject();
			expectTypeOf(diff<MockData, MockData>).returns.toBeObject();
		});
	});

	it('should detect chenged key and produce diff return object', () => {
		const source = { ...mockData } satisfies MockData;
		const target = { ...mockData, lang: 'FR' } satisfies MockData;
		const expected = {
			source: source,
			target: target,
			keys: ['lang'] as never,
			diff: {
				lang: {
					source: source['lang'],
					target: target['lang'],
				},
			},
		} satisfies Diff<typeof source, typeof target, MockData>;
		const result = diff(source, target);
		expect(result).toStrictEqual(expected);
	});

	it('Verify <Diff> type shape', () => {
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

import type { MockData } from '@repo/mocks';
import type { DeepPartial } from '@/helpers/deep-partial';
import { it, describe, expectTypeOf } from 'vitest';

describe('helpers/deep-partial.ts', () => {
	it('should reproduce object deeply partial(optional) type', () => {
		expectTypeOf<DeepPartial<MockData>>().toEqualTypeOf<{
			lang?: MockData['lang'];
			value?: MockData['value'];
			theme?: MockData['theme'];
			currency?: {
				amount?: MockData['currency']['amount'];
				code?: MockData['currency']['code'];
			}
		}>();

		const currency_amount = { currency: { amount: 1000 } };
		expectTypeOf(currency_amount).toMatchTypeOf<DeepPartial<MockData>>;

		// test in function
		const fn = vi.fn((_arg: DeepPartial<MockData>) => void {});
		fn(currency_amount);
		expect(fn).toBeCalledWith(currency_amount);
		expectTypeOf<typeof fn>().parameter(0).toEqualTypeOf<DeepPartial<MockData>>();
	})
})

import type { DeepPartial } from '@/helpers/deep-partial';
import type { MockData } from '@repo/mocks';

describe('helpers/deep-partial.ts', () => {
	it('should reproduce object deeply partial(optional) type', () => {
		const deeply = expectTypeOf<DeepPartial<MockData>>();

		const lang = deeply.toHaveProperty('lang');
		lang.toEqualTypeOf<MockData['lang'] | undefined>();
		lang.toBeNullable();

		const value = deeply.toHaveProperty('value');
		value.toBeNullable();
		value.toEqualTypeOf<MockData['value'] | undefined>();

		const theme = deeply.toHaveProperty('theme');
		theme.toBeNullable();
		theme.toEqualTypeOf<MockData['theme'] | undefined>();

		const currency = deeply.toHaveProperty('currency');
		currency.toBeNullable();
		currency.toEqualTypeOf<Partial<MockData['currency']> | undefined>();

		deeply.toEqualTypeOf<{
			lang?: MockData['lang'];
			value?: MockData['value'];
			theme?: MockData['theme'];
			currency?: {
				amount?: MockData['currency']['amount'];
				code?: MockData['currency']['code'];
			};
		}>();

		const currency_amount = { currency: { amount: 1000 } };
		expectTypeOf(currency_amount).toMatchTypeOf<DeepPartial<MockData>>;

		// test in function
		const fn = vi.fn((_arg: DeepPartial<MockData>) => void {});
		fn(currency_amount);
		expect(fn).toBeCalledWith(currency_amount);
		expectTypeOf<typeof fn>().parameter(0).toEqualTypeOf<DeepPartial<MockData>>();
	});
});

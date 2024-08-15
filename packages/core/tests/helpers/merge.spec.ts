import { mergeFresh } from '@/helpers/merge';
import { mockData } from '@repo/mocks';

describe('helpers/merge.ts', () => {
	it('should produce object from <source> and <target> without change when only value was changed', () => {
		const source = { ...mockData };
		const target = { ...mockData, lang: 'FR' };
		const result = mergeFresh(source, target);
		expect(result).toStrictEqual(expect.objectContaining(mockData));
	});

	it('should produce object from <source> and <target> by remove keys not exists in <target>', () => {
		const source = { ...mockData, additionkey: 'value' };
		const target = { ...mockData, lang: 'FR' };
		const result = mergeFresh(source, target);
		expect(result).toStrictEqual(expect.objectContaining(mockData));
	});

	it('should produce object from <source> and <target> by add keys not exists in <source>', () => {
		const source = { ...mockData };
		const target = { ...mockData, additionkey: 'value', lang: 'FR' };
		const result = mergeFresh(source, target);
		expect(result).toStrictEqual(
			expect.objectContaining({ ...mockData, additionkey: 'value' })
		);
	});

	it('should produce object from <source> and <target> by update value of key when switched to primitive in <target>', () => {
		const source = { ...mockData };
		const target = { ...mockData, currency: '1000 USD' };
		const result = mergeFresh(source, target);
		expect(result).toStrictEqual(
			expect.objectContaining({ ...mockData, currency: '1000 USD' })
		);
	});

	it('should produce object from <source> and <target> by update value of key when switched from primitive in <target>', () => {
		const source = { ...mockData };
		const target = { ...mockData, theme: { mode: 'DARK' } };
		const result = mergeFresh(source, target);
		expect(result).toStrictEqual(
			expect.objectContaining({ ...mockData, theme: { mode: 'DARK' } })
		);
	});

	it('should produce object from <source> and <target> when <target> is empty', () => {
		const source = { ...mockData };
		const target = {};
		const result = mergeFresh(source, target);
		expect(result).toStrictEqual(expect.objectContaining({ ...mockData }));
	});
});

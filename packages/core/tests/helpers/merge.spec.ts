import { mockData } from "@repo/mocks";
import { mergeFresh } from "@/helpers/merge";

describe('helpers/merge.ts', () => {
	it('should produce object from <source> and <target> without change when only value was changed', () => {
		const source = { ...mockData };
		const target = { ...mockData, lang: 'FR' };
		const result = mergeFresh(source, target);
		expect(result).toStrictEqual(expect.objectContaining(mockData));
	})

	it('should produce object from <source> and <target> by remove keys not exists in <target>', () => {
		const source = { ...mockData, additionkey: 'value' };
		const target = { ...mockData, lang: 'FR' };
		const result = mergeFresh(source, target);
		expect(result).toStrictEqual(expect.objectContaining(mockData));
	})

	it('should produce object from <source> and <target> by add keys not exists in <source>', () => {
		const source = { ...mockData };
		const target = { ...mockData, additionkey: 'value', lang: 'FR' };
		const result = mergeFresh(source, target);
		expect(result).toStrictEqual(expect.objectContaining({ ...mockData, additionkey: 'value' }));
	})
});

import { shouldFreshInitializing } from '@/helpers/fresh-initialize';
import { mockData } from '@repo/mocks';

describe('helpers/fresh-initialize.ts', () => {
	it('should return true when two inputs have difference in values', () => {
		const source = { ...mockData };
		const target = { ...mockData, lang: 'FR' };
		const result = shouldFreshInitializing(source, target);
		expect(result).toBeTruthy();
	});

	it('should return true when two inputs have difference in keys', () => {
		const source = { ...mockData };
		const target = { ...mockData, language: 'FR' };
		const result = shouldFreshInitializing(source, target);
		expect(result).toBeTruthy();
	});
});

import { keyOf } from "@/helpers/keyOf";
import { mockData } from "@repo/mocks";

describe('helpers/keyOf.ts', () => {
	it('should return Array of shalow keys of input object', () => {
		const result = keyOf(mockData);
		expect(result).toStrictEqual(expect.arrayContaining([
			'lang',
			'value',
			'currency',
			'theme',
		]));
	})
})

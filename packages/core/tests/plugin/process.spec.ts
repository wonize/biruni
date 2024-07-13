import { preprocess, postprocess } from '@/plugin/process';
import { mockData, mockPluginStack } from '@repo/mocks';

describe('plugin/process.ts', () => {
	describe('Verify Signature', () => {
		it('should be function', () => {
			expect(preprocess).toBeTypeOf('function');
			expectTypeOf(preprocess).toBeFunction();
			expect(postprocess).toBeTypeOf('function');
			expectTypeOf(postprocess).toBeFunction();
		})

		it('should be run', async () => {
			const result = await preprocess(mockData, mockPluginStack as never);
			expect(result).toStrictEqual(expect.objectContaining(mockData));
		})
	})
})

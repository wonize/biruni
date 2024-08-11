import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

const include = configDefaults.include
	.concat('packages/core')
	.concat('packages/factory')
	.concat('packages/built-in')
	.concat('packages/biruni');

const exclude = configDefaults.exclude
	.concat('_ignored_')
	.concat('**/build/**')
	.concat('**/scripts/**')
	.concat('**/docs/**')
	.concat('**/examples/**');

const reporter = ['html', 'json', 'text', 'clover'];

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		name: 'unit',
		globals: true,
		environment: 'jsdom',
		mockReset: false,
		exclude: exclude,
		coverage: {
			provider: 'v8',
			reporter: reporter,
			// FIXME: include: include,
			exclude: exclude.concat('**/tests/**'),
		},
	},
});

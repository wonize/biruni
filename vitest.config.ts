import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

const include = /* configDefaults.include */ ([] as string[])
	.concat('src/**')
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
		typecheck: {
			enabled: true,
		},
		/* browser: {
			enabled: true,
			isolate: true,
			name: 'brave-browser',
		}, */
		coverage: {
			all: true,
			provider: 'v8',
			reporter: reporter,
			include: include,
			exclude: exclude.concat('**/tests/**'),
		},
	},
});

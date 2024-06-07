import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
	plugins: [
		tsconfigPaths({
			projects: ['tests/tsconfig.json'],
		}),
	],
	test: {
		name: 'unit',
		globals: true,
		environment: 'jsdom',
		mockReset: false,
		setupFiles: ['./tests/__setups__/localstorage.js'],
		exclude: configDefaults.exclude.concat('_ignored_'),
	},
});

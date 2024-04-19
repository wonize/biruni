import { defineConfig } from 'tsup';

export default defineConfig({
	dts: true,
	clean: true,
	shims: true,
	bundle: true,
	sourcemap: true,
	splitting: true,
	skipNodeModulesBundle: true,
	minify: 'terser',
	treeshake: 'safest',
	entry: ['src/mod.ts'],
	format: ['cjs', 'esm'],
	external: ['@biruni/core'],
	outExtension: (o) => ({
		'js': o.format === 'esm'
			? '.mjs'
			: '.cjs'
	}),
});

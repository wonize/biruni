import { defineConfig } from 'tsup';

export default defineConfig((option) => ({
	outDir: 'dist',
	entry: { 'index': 'src/mod.ts' },
	dts: true,
	clean: true,
	sourcemap: true,
	format: ['cjs', 'esm'],
	minify: option.watch ? false : 'terser',
}));

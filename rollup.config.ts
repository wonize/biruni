import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';
import { default as resolve } from '@rollup/plugin-node-resolve';
import { default as json } from '@rollup/plugin-json';
import { default as terser } from '@rollup/plugin-terser';
import { default as typescript } from '@rollup/plugin-typescript';
import { default as commonjs } from '@rollup/plugin-commonjs'
import pkg from './package.json' assert { type: 'json' };

const r = (p: string, base?: string): string => {
	return fileURLToPath(new URL(p, base ?? import.meta.url))
}

export default defineConfig({
	input: 'src/mod.ts',
	output: [
		{
			file: 'dist/mod.esm.js',
			format: 'esm',
			sourcemap: true,
			// plugins: [
			// 	typescript({
			// 		tsconfig: r(`tsconfig.${'esm' ?? 'cjs'}.json`),
			// 	})
			// ]
		},
		{
			file: 'dist/mod.cjs.js',
			format: 'cjs',
			sourcemap: true,
		},
		{
			name: pkg.name.replace('@', '').replace('/', '-'),
			file: `dist/${pkg.name.replace('@', '').replace('/', '-')}.umd.js`,
			format: 'umd',
			sourcemap: true,
		},
	],
	external: Object.keys(pkg.dependencies),
	plugins: [
		json(),
		typescript(),
		resolve({
			moduleDirectories: ['node_modules']
		}),
		commonjs(),
		terser(),
	],
});

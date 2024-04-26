import { default as process } from 'node:process';
import { fileURLToPath, format } from 'node:url';
import type { Options } from 'tsup';
import { $ } from 'zx';

/** @param workspace {string} 'packages/core' */
const TSUP_COMMON_OPTIONS: Options = {
	dts: false,
	shims: true,
	clean: false,
	sourcemap: true,
	bundle: false,
	splitting: false,
	skipNodeModulesBundle: true,
	minify: 'terser',
	treeshake: 'safest',
}

const r = (path: string, base?: string) => {
	return fileURLToPath(
		format({
			protocol: 'file',
			hostname: base ?? process.cwd(),
			pathname: path,
		}),
	);
};

type Config = Partial<Omit<Options, 'entryPoints' | 'outDir' | 'clean'>>;


function cjs(workspace: string, config?: Config): Options {
	const cwd = process.cwd();
	const base = r(workspace, cwd);
	const outDir = r('dist/cjs', base);
	const tsconfig = r('tsconfig.json', base);

	const entry = (() => {
		if (typeof config?.entry === 'undefined' || config.entry === null) {
			return [r('src/mod.ts', base)];
		} else if (typeof config.entry === 'string') {
			return [r(config.entry, base)];
		} else if (typeof config.entry === 'object' && config.entry instanceof Array) {
			return config.entry.map((e) => r(e, base));
		} else {
			return [r('src/mod.ts', base)];
		}
	})()

	delete config?.entry;

	return Object.assign({}, TSUP_COMMON_OPTIONS, {
		name: workspace,
		outDir: outDir,
		entry: entry,
		format: ['cjs'],
		tsconfig: tsconfig,
		outExtension: () => ({ js: '.js' })
	}, config ?? {}) as Options;
}

function esm(workspace: string, config?: Config): Options {
	const cwd = process.cwd();
	const base = r(workspace, cwd);
	const outDir = r('dist/esm', base);
	const tsconfig = r('tsconfig.json', base);

	const entry = (() => {
		if (typeof config?.entry === 'undefined' || config.entry === null) {
			return [r('src/mod.ts', base)];
		} else if (typeof config.entry === 'string') {
			return [r(config.entry, base)];
		} else if (typeof config.entry === 'object' && config.entry instanceof Array) {
			return config.entry.map((e) => r(e, base));
		} else {
			return [r('src/mod.ts', base)];
		}
	})()

	delete config?.entry;

	return Object.assign({}, TSUP_COMMON_OPTIONS, {
		name: workspace,
		outDir: outDir,
		entry: entry,
		format: ['esm'],
		tsconfig: tsconfig,
		outExtension: () => ({ js: '.js' })
	}, config ?? {}) as Options;
}

function umd(workspace: string, config?: Config): Options {
	const cwd = process.cwd();
	const base = r(workspace, cwd);
	const outDir = r('dist/umd', base);
	const tsconfig = r('tsconfig.json', base);

	const entry = (() => {
		if (typeof config?.entry === 'undefined' || config.entry === null) {
			return [r('src/mod.ts', base)];
		} else if (typeof config.entry === 'string') {
			return [r(config.entry, base)];
		} else if (typeof config.entry === 'object' && config.entry instanceof Array) {
			return config.entry.map((e) => r(e, base));
		} else {
			return [r('src/mod.ts', base)];
		}
	})()

	delete config?.entry;

	return Object.assign({}, TSUP_COMMON_OPTIONS, {
		name: workspace,
		outDir: outDir,
		entry: entry,
		format: ['iife'],
		tsconfig: tsconfig,
		outExtension: () => ({ js: '.global.js' }),

		// specifice iife
		bundle: true
	}, config ?? {}) as Options;
}

async function dts(workspace: string): Promise<void> {
	const cwd = process.cwd();
	const base = r(workspace, cwd);
	const outDir = r('dist/types', base);
	await $`cd ${base} && npx tsc --declarationDir ${outDir} --emitDeclarationOnly --declaration --noEmit false`
}

function b(workspace: string, config?: Config): Options {
	const cwd = process.cwd();
	const base = r(workspace, cwd);
	const outDir = r('dist', base);
	const tsconfig = r('tsconfig.json', base);

	const entry = (() => {
		if (typeof config?.entry === 'undefined' || config.entry === null) {
			return [r('src/mod.ts', base)];
		} else if (typeof config.entry === 'string') {
			return [r(config.entry, base)];
		} else if (typeof config.entry === 'object' && config.entry instanceof Array) {
			return config.entry.map((e) => r(e, base));
		} else {
			return [r('src/mod.ts', base)];
		}
	})()

	delete config?.entry;

	return Object.assign({}, TSUP_COMMON_OPTIONS, {
		name: workspace,
		outDir: outDir,
		entry: entry,
		format: ['esm', 'cjs', 'iife'],
		tsconfig: tsconfig,
	}, config ?? {}) as Options;
}

export { b, cjs, dts, esm, umd };
export default b;

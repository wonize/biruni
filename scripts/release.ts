import { default as process } from 'node:process';
import { fileURLToPath, format } from 'node:url';
import type { Options } from 'tsup';

const TSUP_COMMON_OPTIONS: Options = {
	dts: true,
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

/** @param workspace {string} 'packages/core' */
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
		outExtension: () => ({ js: '.cjs', dts: '.d.cts' })
	}, config ?? {}) as Options;
}

/** @param workspace {string} 'packages/core' */
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
		outExtension: () => ({ js: '.mjs', dts: '.d.mts' })
	}, config ?? {}) as Options;
}

/** @param workspace {string} 'packages/core' */
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
		outExtension: () => ({ js: '.umd.js', dts: '.umd.d.ts' }),

		// specifice iife
		bundle: true,
	}, config ?? {}) as Options;
}

/** @param workspace {string} 'packages/core' */
function dts(workspace: string, config?: Config): Options {
	const cwd = process.cwd();
	const base = r(workspace, cwd);
	const outDir = r('dist/types', base);
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
		tsconfig: tsconfig,
		outExtension: () => ({ dts: '.d.ts' }),

		// specifice dts
		bundle: true,
		dts: { only: true }
	}, config ?? {}) as Options;
}

/** @param workspace {string} 'packages/core' */
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

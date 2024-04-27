import { default as process } from 'node:process';
import { fileURLToPath, format } from 'node:url';
import { build as tsup, type Options } from 'tsup';
import { $, echo, fs } from 'zx';

async function prepublish(workspace: string) {
	await checkType(workspace);
	await build(workspace);
}

// ========== Builders ==========

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

async function build(workspace: string, config?: Config): Promise<void> {
	await clr(workspace);
	await esm(workspace, { entry: ['src/'], ...config });
	await cjs(workspace, { entry: ['src/'], ...config });
	await umd(workspace, { entry: ['src/mod.ts'], ...config });
	await dts(workspace);
}

async function esm(workspace: string, config?: Config): Promise<void> {
	await tsup(resolveTsupOptions(workspace, Object.assign({}, {
		format: ['esm'],
		outDir: 'dist/esm',
	}, config)));
}

async function cjs(workspace: string, config?: Config): Promise<void> {
	await tsup(resolveTsupOptions(workspace, Object.assign({}, {
		format: ['cjs'],
		outDir: 'dist/cjs',
	}, config)));
}

async function umd(workspace: string, config?: Config): Promise<void> {
	await tsup(resolveTsupOptions(workspace, Object.assign({}, {
		format: ['iife'],
		outDir: 'dist/umd',

		// specifice iife
		outExtension: () => ({ js: '.global.js' }),
		bundle: true
	}, config)));
}

async function dts(workspace: string): Promise<void> {
	const o = resolveConfigs(workspace, { outDir: 'dist/types' });
	await $`cd ${o.base} && npx tsc --declarationDir ${o.outDir} --emitDeclarationOnly --declaration --noEmit false`
	echo(`DTS [${workspace}] ${o.outDir}`)
}

type Config = Partial<Omit<Options, 'entryPoints' | 'clean'>>;

// ========== Commands ==========

async function checkType(workspace: string): Promise<void> {
	const o = resolveConfigs(workspace, {
		outDir: 'dist'
	});
	const output = await $`cd ${o.base} && npx tsc --noEmit`;
	if (output.exitCode !== 0) {
		echo(output.stdout);
	}
	echo(`CHK [${workspace}] ${o.outDir}`);
}

async function clr(workspace: string, config?: Config): Promise<void> {
	const o = resolveConfigs(workspace, {
		outDir: config?.outDir ?? 'dist'
	})
	await $`cd ${o.base} && rm -rf ${o.outDir}`
	echo(`CLR [${workspace}] ${o.outDir}`)
}

// ========== Resolvers ==========

function resolveTsupOptions(workspace: string, config?: Config): Options {
	const o = resolveConfigs(workspace, {
		outDir: config!.outDir as string,
		entry: config?.entry
	});

	delete config?.entry;
	delete config?.outDir;

	return Object.assign({}, TSUP_COMMON_OPTIONS, {
		name: workspace,
		outDir: o.outDir,
		entry: o.entry,
		tsconfig: o.tsconfig,
		outExtension: () => ({ js: '.js' })
	}, config ?? {}) as Options;
}

function resolveConfigs(workspace: string, config: { outDir: string, entry?: Options['entry'] | string }) {
	const cwd = process.cwd();
	const base = resolvePath(workspace, cwd);
	const outDir = resolvePath(config.outDir, base);
	const tsconfig = resolvePath('tsconfig.json', base);
	const packagejson_path = resolvePath('package.json', base);
	const packagejson_raw = (fs.readFileSync(packagejson_path, 'utf-8') ?? '').toString();
	const packagejson = JSON.parse(packagejson_raw);

	const entry = (() => {
		if (typeof config?.entry === 'undefined' || config.entry === null) {
			return [resolvePath('src/mod.ts', base)];
		} else if (typeof config.entry === 'string') {
			return [resolvePath(config.entry, base)];
		} else if (typeof config.entry === 'object' && config.entry instanceof Array) {
			return config.entry.map((e) => resolvePath(e, base));
		} else {
			return [resolvePath('src/mod.ts', base)];
		}
	})();

	return {
		base,
		outDir,
		tsconfig,
		packagejson,
		entry
	};
}

function resolvePath(path: string, base?: string) {
	return fileURLToPath(
		format({
			protocol: 'file',
			hostname: base ?? process.cwd(),
			pathname: path,
		})
	);
}

// ========== Exports ==========

export { build, checkType, cjs, clr as clear, dts, esm, prepublish, umd };
export default build;

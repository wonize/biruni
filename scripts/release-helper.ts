import { default as process } from 'node:process';
import { fileURLToPath, format } from 'node:url';
import { default as task } from 'tasuku';
import { build as tsup, type Options } from 'tsup';
import { $, echo, fs } from 'zx';

$.verbose = false;

async function prepublish(workspace: string) {
	await checkType(workspace);
	await build(workspace);
}

// ========== Builders ==========

const TSUP_COMMON_OPTIONS: Options = {
	silent: true,
	dts: false,
	shims: true,
	clean: false,
	sourcemap: true,
	bundle: false,
	splitting: false,
	skipNodeModulesBundle: true,
	minify: 'terser',
	treeshake: 'safest',
	env: { NODE_ENV: 'production' },
};

let index: number = 0;
async function build(workspace: string, config?: Config) {
	await task(`${++index} START [${workspace}]`, async ({ setTitle, setError, setStatus }) => {
		try {
			setTitle(`(DIR) CLEAR     [${workspace}]`);
			await clr(workspace);

			setTitle(`(ESM) BUILD     [${workspace}]`);
			await esm(workspace, { entry: ['src/'], ...config });

			setTitle(`(CJS) BUILD     [${workspace}]`);
			await cjs(workspace, { entry: ['src/'], ...config });

			setTitle(`(UMD) BUILD     [${workspace}]`);
			await umd(workspace, { entry: ['src/mod.ts'], ...config });

			setTitle(`(DTS) BUILD     [${workspace}]`);
			await dts(workspace);

			setTitle(`( ${index} ) COMPLETED [${workspace}]`);
		} catch (error: any) {
			setStatus('error');
			const stderr = Object.hasOwn(error, '_stdout') ? error._stdout : error;
			setError(stderr);
			throw stderr;
		}
	});
}

async function esm(workspace: string, config?: Config) {
	await tsup(
		resolveTsupOptions(
			workspace,
			Object.assign(
				{},
				{
					format: ['esm'],
					outDir: 'dist/esm',
				},
				config
			)
		)
	);
}

async function cjs(workspace: string, config?: Config) {
	await tsup(
		resolveTsupOptions(
			workspace,
			Object.assign(
				{},
				{
					format: ['cjs'],
					outDir: 'dist/cjs',
				},
				config
			)
		)
	);
}

async function umd(workspace: string, config?: Config) {
	await tsup(
		resolveTsupOptions(
			workspace,
			Object.assign(
				{},
				{
					format: ['iife'],
					outDir: 'dist/umd',

					// specifice iife
					outExtension: () => ({ js: '.global.js' }),
					bundle: true,
				},
				config
			)
		)
	);
}

async function dts(workspace: string) {
	const o = resolveConfigs(workspace, { outDir: 'dist/types' });
	await $`cd ${o.base} && npx tsc --declarationDir ${o.outDir} --emitDeclarationOnly --declarationMap --declaration --noEmit false`;
}

type Config = Partial<Omit<Options, 'entryPoints' | 'clean'>>;

// ========== Commands ==========

async function checkType(workspace: string) {
	const o = resolveConfigs(workspace, {
		outDir: 'dist',
	});
	const output = await $`cd ${o.base} && npx tsc --noEmit`;
	if (output.exitCode !== 0) {
		echo(output.stdout);
	}
}

async function clr(workspace: string, config?: Config) {
	const o = resolveConfigs(workspace, {
		outDir: config?.outDir ?? 'dist',
	});
	await $`cd ${o.base} && rm -rf ${o.outDir}`;
}

// ========== Resolvers ==========

function resolveTsupOptions(workspace: string, config?: Config): Options {
	const o = resolveConfigs(workspace, {
		outDir: config!.outDir as string,
		entry: config?.entry,
	});

	delete config?.entry;
	delete config?.outDir;

	return Object.assign(
		{},
		TSUP_COMMON_OPTIONS,
		{
			name: workspace,
			outDir: o.outDir,
			entry: o.entry,
			tsconfig: o.tsconfig,
			outExtension: () => ({ js: '.js' }),
		},
		config ?? {}
	) as Options;
}

function resolveConfigs(
	workspace: string,
	config: { outDir: string; entry?: Options['entry'] | string }
) {
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
		entry,
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

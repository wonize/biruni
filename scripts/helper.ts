import 'zx/globals';
import { dirname } from 'node:path';
import { fileURLToPath, format } from 'node:url';
import { default as process } from 'node:process';
import type { Options } from 'tsup';
import { default as mergePackageJson } from './packagejson';

$.verbose = false;

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
function b(workspace: string, config?: Config): Options {
	const cwd = process.cwd();
	const base = r(workspace, cwd);
	const entry = r('src/mod.ts', base);
	const outDir = r('dist', base);
	const tsconfig = r('tsconfig.json', base);

	const onSuccess = async () => {
		const path_packagejson = r('package.json', base);
		await $`cp ${path_packagejson} ${outDir.concat('/')}`;

		const path_license = r('LICENSE', base);
		await $`cp ${path_license} ${outDir.concat('/')}`;

		const path_readme = r('README.md', base);
		await $`cp ${path_readme} ${outDir.concat('/')}`;

		const raw_packagejson = await $`cat ${path_packagejson}`;
		const packagejson = JSON.parse(raw_packagejson.stdout);
		const merged_packagejson = mergePackageJson(workspace, packagejson);
		const out_packagejson = r('./package.json', outDir);
		await fs.promises.writeFile(
			out_packagejson,
			JSON.stringify(merged_packagejson, null, 2),
			'utf-8',
		);

		echo(`  PREPARE :: ${base}`);
	};

	const option: Options = {
		name: workspace,
		dts: true,
		shims: true,
		clean: true,
		bundle: true,
		sourcemap: true,
		splitting: true,
		skipNodeModulesBundle: true,
		minify: 'terser',
		treeshake: 'safest',
		outDir: outDir,
		entry: [entry],
		format: ['cjs', 'esm'],
		tsconfig: tsconfig,
		outExtension: (o) => ({
			js: o.format === 'esm' ? '.mjs' : '.cjs',
		}),
	};

	const pkgSuccess = (config?.onSuccess ?? (async () => { })) as () => Promise<void>;
	delete config?.onSuccess;
	return Object.assign({}, option, config, {
		onSuccess: async () => {
			await onSuccess();
			await pkgSuccess();
		},
	});
}

export { b };
export default b;

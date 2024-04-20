import 'zx/globals';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { default as process } from 'node:process';
import type { Options } from 'tsup';
import { default as mergePackageJson } from './packagejson';

$.verbose = false;

type Config = Partial<Omit<Options, 'entryPoints' | 'outDir' | 'clean'>>;

/** @param pkg {string} 'packages/core' */
function b(pkg: string, config?: Config): Options {
	const cwd = dirname($.cwd ?? process.cwd());
	const path = fileURLToPath(new URL(pkg, cwd));
	const entry = fileURLToPath(new URL('./src/mod.ts', path));
	const outDir = fileURLToPath(new URL('./dist', path));

	const onSuccess = async () => {
		const path_packagejson = fileURLToPath(new URL('./package.json', path));
		await $`cp ${path_packagejson} ${outDir.concat('/')}`

		const path_license = fileURLToPath(new URL('./LICENSE', path));
		await $`cp ${path_license} ${outDir.concat('/')}`

		const path_readme = fileURLToPath(new URL('./README.md', path));
		await $`cp ${path_readme} ${outDir.concat('/')}`

		const raw_packagejson = await $`cat ${path_packagejson}`
		const packagejson = JSON.parse(raw_packagejson.stdout);
		const merged_packagejson = mergePackageJson(pkg, packagejson);
		const out_packagejson = fileURLToPath(new URL('./package.json', outDir));
		await fs.promises.writeFile(out_packagejson, JSON.stringify(merged_packagejson, null, 2), 'utf-8');

		echo(`  MOVE :: ${path}`)
	}

	const option: Options = {
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
		outExtension: (o) => ({
			'js': o.format === 'esm'
				? '.mjs'
				: '.cjs'
		}),
	}

	const pkgSuccess = config?.onSuccess as (() => Promise<void>);
	delete config?.onSuccess;
	return Object.assign({}, option, config, {
		onSuccess: async () => {
			await onSuccess();
			await pkgSuccess();
		}
	});
}

export { b };
export default b;

import { default as process } from 'node:process';
import { build } from 'tsup';
import { $ } from 'zx';
import { cjs, dts, esm, umd } from './release-helper';

$.verbose = false

async function main() {
	await $`cd ./packages/core && rm -rf ./dist`
	await build(esm('packages/core', { entry: ['src/'] }))
	await build(cjs('packages/core', { entry: ['src/'] }))
	await build(umd('packages/core', { entry: ['src/mod.ts'], }))
	await dts('packages/core');

	// keep-order,,
	//	b('packages/factory'),
	//	b('packages/built-in'),
	//	b('packages/biruni'),
	//	b('packages/react'),
	//	b('packages/zod'),
}

main().catch((err: unknown) => {
	console.error(err);
	process.exit(1);
});

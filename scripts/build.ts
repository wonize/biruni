import { default as process } from 'node:process';
import build from './release-helper';

async function main() {
	await build('packages/core');
	await build('packages/built-in');
	// await build('packages/factory');
	// await build('packages/biruni');
	// await build('packages/react');
	// await build('packages/zod');
}

main().catch((err: unknown) => {
	console.error(err);
	process.exit(1);
});

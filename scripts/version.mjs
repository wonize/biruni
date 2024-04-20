import 'zx/globals';
import { dirname } from 'node:path';
import { default as process } from 'node:process';

$.verbose = false;

async function main() {
	// await spinner('<version>', () => version());
	version();
}

if (process.argv[1].endsWith('zx/build/cli.js')) {
	main().catch((err) => console.log(err));
}

async function version() {
	const root_packagejson_raw = await $`cat ./package.json`;
	const root_packagejson = JSON.parse(root_packagejson_raw.stdout);
	const root_version = root_packagejson['version'];

	const ws_packagejson_paths = await glob(['packages/**/package.json'], {
		cwd: process.cwd(),
		gitignore: true,
		ignore: ['**/node_modules', '**/.tsup', '**/dist'],
	});

	await Promise.all(
		ws_packagejson_paths.map(async (p) => {
			const raw_packagejson = await $`cat ${p}`;
			const packagejson = JSON.parse(raw_packagejson.stdout);
			const pkg_name = packagejson['name'];
			const pkg_version = packagejson['version'];
			$`printf ' [ OK ] :: VERSION :: %-25s :: [%s] -> [%s]\n' ${[
				pkg_name,
				pkg_version,
				root_version,
			]}`.pipe(process.stdout);
		}),
	);
}

export { version };
export default main;

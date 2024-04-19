#!/usr/bin/env node
import { glob } from 'glob';
import fs from 'node:fs';
import { resolve } from 'node:path';
import { default as process } from 'node:process';

function path_of_process_start() {
	return resolve(process.cwd());
}

async function file_read(p) {
	return await fs.promises.readFile(resolve(path_of_process_start(), './', p), 'utf-8');
}

async function file_write(p, c) {
	return await fs.promises.writeFile(resolve(path_of_process_start(), './', p), c, 'utf-8');
}

async function packagejson(k = null, p = 'package.json') {
	const raw = await file_read(p);
	const json = JSON.parse(raw);
	return k !== null ? json[k] : json;
}

async function main() {
	const version = await packagejson('version');

	console.log(` [ OK ] :: <root> :: ${version}`);

	const pkgpaths = await glob('./packages/**/package.json', {
		cwd: path_of_process_start(),
		ignore: ['**/node_modules/**', '**/dist/**', '**/.turbo/**', '**/*.config.ts'],
	});

	await Promise.all(
		pkgpaths.map(async (p) => {
			const pkg = await packagejson(null, p);
			const pkgname = pkg['name'];
			const old = pkg['version'];
			const str = JSON.stringify(pkg, null, 4).replace(
				/"version"\s*:\s*"(.*?)",/,
				() => `"version": "${version}",`,
			);
			await file_write(p, str);
			console.log(` [ OK ] :: <${pkgname}> :: [${old}] -> [${version}]`);
		}),
	);

	console.log(' [ OK ] :: DONE');
}

main().catch((err) => console.error(err));

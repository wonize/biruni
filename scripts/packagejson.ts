type PackageJsonKey =
	// in workspace
	| 'name'
	| 'type'
	| 'version'
	| 'description'
	| 'keywords'
	| 'exports'
	| 'main'
	| 'module'
	| 'types'
	| 'dependencies'
	| 'devDependencies'
	| 'peerDependencies'
	| 'peerDependenciesMeta'

	// in common
	| 'author'
	| 'license'
	| 'homepage'
	| 'repository'
	| 'bugs'
	| 'sideEffects'
	| 'files'
	| 'packageManager'
	| 'engines';

type PackageJson = Partial<
	Record<PackageJsonKey, unknown | string> & {
		[K: string]: unknown | string;
	}
>;

export default (workspace: string, pkgjson?: PackageJson): PackageJson => {
	return Object.assign({}, pkgjson, {
		author: 'mikoloism <mikoloism@gmail.com>',
		license: 'GPL-3.0-only',
		homepage: `https://github.com/wonize/biruni/tree/main/${workspace}#readme`,
		repository: {
			type: 'git',
			url: 'git+https://github.com/wonize/biruni.git',
			directory: `${workspace}`,
		},
		bugs: {
			url: 'https://github.com/wonize/biruni/issues',
		},
		publishConfig: {
			access: 'public',
		},
		sideEffects: false,
		exports: JSON.parse(JSON.stringify(pkgjson?.exports ?? {}).replaceAll('/dist', '')),
		main: ((pkgjson?.main ?? '') as string).replace('dist', '.'),
		module: ((pkgjson?.module ?? '') as string).replace('dist', '.'),
		types: ((pkgjson?.types ?? '') as string).replace('dist', '.'),
		files: ['./*', 'LICENSE', 'README.md', 'package.json'],
		packageManager: 'pnpm@8.9.0',
		engines: {
			node: '>=18',
		},
		dependencies: pkgjson?.dependencies ?? {},
		devDependencies: pkgjson?.devDependencies ?? {},
		peerDependencies: pkgjson?.peerDependencies ?? {},
		peerDependenciesMeta: pkgjson?.peerDependenciesMeta ?? {},
	});
};

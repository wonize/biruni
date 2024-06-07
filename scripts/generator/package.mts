const pkg = `
{
	"$schema": "https://json.schemastore.org/package",
	"name": "{{pkgname}}",
	"type": "module",
	"version": "0.0.0",
	"description": "(Al-Biruni) {{pkgdescription}}",
	"keywords": [
		"wonize",
		"biruni",
		"al-biruni"
	],
	"exports": {
		".": {
			"import": {
				"types": "./dist/mod.d.ts",
				"default": "./dist/mod.mjs"
			},
			"require": {
				"types": "./dist/mod.d.cts",
				"default": "./dist/mod.cjs"
			},
			"default": "./dist/mod.mjs",
			"types": "./dist/mod.d.ts"
		},
		"./*": "./*"
	},
	"author": "mikoloism <mikoloism@gmail.com>",
	"license": "GPL-3.0-only",
	"homepage": "https://wonize.github.io/biruni/",
	"bugs": "https://github.com/wonize/biruni/issues",
	"repository": {
	  "type": "git",
	  "url": "git+https://github.com/wonize/biruni.git",
	  "directory": "{{workspace}}"
	},
	"publishConfig": {
	  "access": "public"
	},
	"sideEffects": false,
	"main": "dist/mod.cjs",
	"module": "dist/mod.mjs",
	"types": "dist/mod.d.ts",
	"files": [
	  "dist",
	  "LICENSE",
	  "README.md",
	  "package.json"
	],
	"packageManager": "pnpm@9.2.0",
	"engines": {
	  "node": ">=18"
	},
	"scripts": {},
	"dependencies": {},
	"devDependencies": {},
	"peerDependencies": {},
	"peerDependenciesMeta": {}
}`;

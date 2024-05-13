import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import vitest from 'eslint-plugin-vitest';
import * as path from 'node:path';
import * as process from 'node:process';
import tseslint from 'typescript-eslint';

const project = path.resolve(process.cwd(), 'tsconfig.json');

/** @param {ConfigOption} option */
function defineConfig(option) {
	let configs = [].concat(withFiles(eslint.configs.recommended));

	if (option.prettier) {
		configs = configs.concat(withFiles(prettier));
	}

	if (option.typescript) {
		configs = configs
			.concat(withFiles(tseslint.configs.strict))
			.concat(withFiles(tseslint.configs.stylistic))
			.concat({
				plugins: {
					'typescript-eslint': tseslint.plugin,
				},
				languageOptions: {
					parserOptions: {
						project,
						parser: tseslint.parser,
						sourceType: 'module',
					},
				},
				rules: {
					'@typescript-eslint/prefer-function-type': 'off',
				},
			});
	}

	if (option.vitest) {
		configs = configs.concat({
			files: ['tests/**'],
			plugins: { vitest },
			rules: vitest.configs.recommended.rules,
			settings: { vitest: { typecheck: true } },
		});
	}

	return tseslint.config(...configs);
}

export default defineConfig;
export { defineConfig };

/** @typedef ConfigOption
 * @prop { 'all' | 'recommended' } base
 * @prop { boolean } typescript
 * @prop { boolean } prettier
 * @prop { boolean } vitest
 **/

/** @param {*} config */
function withFiles(configs) {
	let $configs = configs;
	if (
		typeof $configs === 'object' &&
		$configs !== null &&
		(!($configs instanceof Array) || Array.isArray($configs) === false)
	) {
		$configs = [$configs];
	}

	return $configs.map((config) => Object.assign({}, { files: ['**/*.?(m|c)[jt]s?(x)'] }, config));
}

export { withFiles };

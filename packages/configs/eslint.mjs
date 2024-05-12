// import * as globals from 'globals';
import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import vitest from 'eslint-plugin-vitest';
import tseslint from 'typescript-eslint';

/** @param {ConfigOption} option */
function defineConfig(option) {
	let configs = [].concat(assignFiles(eslint.configs.recommended));

	if (option.prettier) {
		configs = configs.concat(assignFiles(prettier));
	}

	if (option.typescript) {
		configs = configs
			.concat(assignFiles(tseslint.configs.strict))
			.concat(assignFiles(tseslint.configs.stylistic))
			.concat({ rules: { '@typescript-eslint/prefer-function-type': 'off' } });
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
function assignFiles(configs) {
	let $configs = configs;
	if (
		typeof $configs === 'object' &&
		$configs !== null &&
		(!($configs instanceof Array) || Array.isArray($configs) === false)
	) {
		$configs = [$configs];
	}

	return $configs.map((config) =>
		Object.assign(
			{},
			{
				files: ['**/*.{ts,tsx}'],
				ignores: [
					'**/*.spec.{js,jsx,ts,tsx}',
					'**/*.test.{js,jsx,ts,tsx}',
					'.*.{js,ts,mjs,mts,cjs,cts}',
					'**/node_modules',
					'**/dist',
					'**/tests',
					'**/scripts',
				],
			},
			config
		)
	);
}

// import * as globals from 'globals';
import * as eslint from '@eslint/js';
import * as prettier from 'eslint-plugin-prettier/recommended';
import * as vitest from 'eslint-plugin-vitest';
import * as tseslint from 'typescript-eslint';

/** @typedef ConfigOption
 * @prop { 'all' | 'recommended' } base
 * @prop { boolean } typescript
 * @prop { boolean } prettier
 * @prop { boolean } vitest
 **/

/** @param {ConfigOption} option */
function defineConfig(option) {
	let configs = [eslint.configs.recommended];

	if (option.prettier) {
		configs = configs.concat(prettier);
	}

	if (option.typescript) {
		configs = configs
			// recommended
			.concat(tseslint.configs.strict)
			.concat(tseslint.configs.stylistic);
	}

	if (option.vitest) {
		configs = configs.concat({
			files: ['tests/**'],
			plugins: { vitest },
			rules: vitest.configs.recommended.rules,
			settings: { vitest: { typecheck: true } },
		});
	}

	return configs;
}

export default defineConfig;
export { defineConfig };

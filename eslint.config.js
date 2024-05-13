import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import * as path from 'node:path';
import * as process from 'node:process';
import tseslint from 'typescript-eslint';
import { withFiles } from '@repo/configs/eslint';

const project = path.resolve(process.cwd(), 'tsconfig.json');

export default tseslint.config(
	...withFiles(eslint.configs.recommended),
	...withFiles(prettier),
	...withFiles(tseslint.configs.strict),
	...withFiles(tseslint.configs.stylistic),
	...withFiles({
		plugins: { 'typescript-eslint': tseslint.plugin },
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
	}),
	{
		ignores: [
			'**/.*',
			'**/.*/**',
			'**/*.config.?(m|c)[jt]s?(x)',
			'**/*.spec.?(m|c)[jt]s?(x)',
			'**/*.test.?(m|c)[jt]s?(x)',
			'**/tests/**',
			'**/.git/**',
			'**/.vscode/**',
			'**/_ignored_/**',
			'**/node_modules/**',
			'**/dist/**',
			'**/docs/**',
			'**/scripts/**',
			'**/examples/**',
		],
	}
);

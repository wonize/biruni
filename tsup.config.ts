import { defineConfig } from 'tsup';
import { b } from './scripts/helper';

export default defineConfig([
	// keep-order
	b('packages/core'),
	b('packages/factory'),
	b('packages/built-in'),
	b('packages/biruni'),
]);

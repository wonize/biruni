import { defineConfig } from 'tsup';
import { b } from './scripts/release';

export default defineConfig([
	// keep-order
	b('packages/core'),
	b('packages/factory'),
	b('packages/built-in'),
	b('packages/biruni'),
]);

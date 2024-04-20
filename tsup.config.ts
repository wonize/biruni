import { defineConfig } from 'tsup';
import { b } from './scripts/helper';

export default defineConfig([
	b('packages/biruni'),
	b('packages/built-in'),
	b('packages/core'),
	b('packages/factory'),
])

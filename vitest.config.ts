import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: 'unit',
    globals: true,
    environment: 'jsdom',
    mockReset: false,
    exclude: configDefaults.exclude.concat('_ignored_'),
    /* coverage: {
       "provider": "v8",
       "reporter": ["html", "json", "text", "clover"],
       // vitest run --coverage
     } */
  },
});

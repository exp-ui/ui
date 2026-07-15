/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'NamaOrgUI',
      fileName: format => format === 'es' ? 'index.js' : 'index.umd.cjs',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Vue disediakan oleh aplikasi konsumen (peerDependency), jangan di-bundle.
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        // pastikan CSS keluar sebagai satu file 'ui.css' (sesuai exports package.json)
        assetFileNames: assetInfo => assetInfo.name === 'style.css' ? 'ui.css' : assetInfo.name ?? '[name][extname]'
      }
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});
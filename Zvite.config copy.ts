import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      bundleTypes: false,
      entryRoot: fileURLToPath(new URL('./src', import.meta.url)),
      include: [
        'src/index.ts',
        'src/component/commons/Avatar.vue',
        'src/component/commons/DataTableList.vue',
        'src/model/Models.ts'
      ],
      tsconfigPath: './tsconfig.app.json'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'DataTableList',
      fileName: 'data-table-list',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'bootstrap-italia'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          'bootstrap-italia': 'BootstrapItalia'
        }
      }
    }
  }
})

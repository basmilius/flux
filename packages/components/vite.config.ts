import { preset } from '@basmilius/vite-preset';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        preset({
            cssModules: {
                classNames: 'kebab'
            },
            isLibrary: true,
            tsconfigPath: resolve(import.meta.dirname, 'tsconfig.app.json')
        }),
        vue()
    ],
    experimental: {
        enableNativePlugin: true
    },
    build: {
        assetsDir: '',
        emptyOutDir: true,
        outDir: resolve(import.meta.dirname, 'dist'),
        sourcemap: true,
        lib: {
            entry: resolve(import.meta.dirname, 'src/index.ts'),
            fileName: 'index',
            formats: ['es'],
            name: 'flux'
        },
        rollupOptions: {
            external: ['luxon', 'vue'],
            output: {
                exports: 'named',
                globals: {
                    luxon: 'luxon',
                    vue: 'vue'
                },
                sourcemapIgnoreList: path => path.includes('node_modules')
            }
        }
    },
    define: {
        __VUE_OPTIONS_API__: 'false'
    },
    resolve: {
        alias: {
            '$flux': resolve(import.meta.dirname, 'src')
        }
    }
});

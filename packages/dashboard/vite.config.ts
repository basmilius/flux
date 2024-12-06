import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import preset from '@basmilius/vite-vue-preset';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({command}) => ({
    plugins: [
        preset({
            isLibrary: true
        }),
        vue()
    ],
    build: {
        assetsDir: '',
        emptyOutDir: command === 'build',
        outDir: resolve(import.meta.dirname, 'dist'),
        sourcemap: true,
        lib: {
            entry: resolve(import.meta.dirname, 'src/index.ts'),
            fileName: 'flux-dashboard',
            name: 'fluxDashboard'
        },
        rollupOptions: {
            external: ['@basmilius/flux', 'luxon', 'vue'],
            output: {
                exports: 'named',
                globals: {
                    '@basmilius/flux': 'flux',
                    luxon: 'luxon',
                    vue: 'vue'
                },
                sourcemapIgnoreList: path => path.includes('node_modules')
            }
        }
    },
    define: {
        __VUE_OPTIONS_API__: 'false'
    }
}));

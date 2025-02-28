import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import preset from '@basmilius/vite-vue-preset';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({mode}) => ({
    plugins: [
        preset({
            isLibrary: true
        }),
        vue()
    ],
    build: {
        assetsDir: '',
        emptyOutDir: mode !== 'dev',
        outDir: resolve(import.meta.dirname, 'dist'),
        sourcemap: true,
        lib: {
            entry: resolve(import.meta.dirname, 'src/index.ts'),
            fileName: 'flux',
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
    }
}));

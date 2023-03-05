import { resolve } from 'path';
import { defineConfig } from 'vite';
// @ts-ignore
import autoprefixer from 'autoprefixer';
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'FanceeFlux',
            fileName: 'fancee.flux'
        },
        outDir: resolve(__dirname, './dist'),
        rollupOptions: {
            external: ['luxon', 'pinia', 'vue'],
            output: {
                exports: 'named',
                globals: {
                    'luxon': 'luxon',
                    'pinia': 'pinia',
                    'vue': 'vue'
                }
            }
        }
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer({})
            ],
        }
    },
    optimizeDeps: {
        exclude: ['vue-demi']
    },
    plugins: [
        vue()
    ]
});

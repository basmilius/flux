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
                    'vue': 'vue'
                },
                sourcemap: true,
                sourcemapIgnoreList: relativeSourcePath => relativeSourcePath.includes('node_modules')
            }
        }
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer({})
            ]
        }
    },
    optimizeDeps: {
        exclude: ['vue-demi']
    },
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, '../flux/src/')
        }
    }
});

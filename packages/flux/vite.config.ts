import { resolve } from 'path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, './src/index.ts'),
            name: 'BMFlux',
            fileName: 'basmilius.flux'
        },
        minify: 'esbuild',
        outDir: resolve(__dirname, './dist'),
        rollupOptions: {
            external: ['luxon', 'vue'],
            output: {
                exports: 'named',
                globals: {
                    'luxon': 'luxon',
                    'vue': 'vue'
                },
                sourcemapIgnoreList: relativeSourcePath => relativeSourcePath.includes('node_modules')
            }
        },
        sourcemap: true
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer({})
            ]
        }
    },
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
});

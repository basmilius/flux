import { resolve } from 'path';
import { defineConfig } from 'vite';
// @ts-ignore
import autoprefixer from 'autoprefixer';
import vue from '@vitejs/plugin-vue2';
import { createHash } from 'crypto';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'FanceeFlux',
            fileName: 'fancee.flux'
        },
        minify: false,
        outDir: resolve(__dirname, './dist'),
        rollupOptions: {
            external: ['luxon', 'vue'],
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
        modules: {
            localsConvention: 'camelCaseOnly',
            generateScopedName(name, filename) {
                filename = filename.split('?')[0];

                const hash = createHash('sha1')
                    .update(name + filename)
                    .digest('base64url')
                    .substring(0, 4);

                return `_${hash}`;
            }
        },
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

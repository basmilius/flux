import { createHash } from 'crypto';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { patchCssModules } from 'vite-css-modules';
import vue from '@vitejs/plugin-vue';
import generateClassName from 'css-class-generator';

export default defineConfig(({command}) => ({
    build: {
        lib: {
            entry: resolve(__dirname, './src/index.ts'),
            name: 'BMFlux',
            fileName: 'basmilius.flux'
        },
        emptyOutDir: command === 'build',
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
        preprocessorMaxWorkers: true,
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        },
        modules: {
            localsConvention: 'camelCaseOnly',
            generateScopedName(name: string): string {
                if (name.startsWith('i__const_')) {
                    name = name.substring(9);
                    name = name.substring(0, name.length - 2);
                }

                const hash = createHash('sha1')
                    .update(name)
                    .digest('hex')
                    .substring(0, 5);

                return generateClassName(parseInt(hash, 16));
            }
        }
    },
    plugins: [
        patchCssModules(),
        vue()
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
}));

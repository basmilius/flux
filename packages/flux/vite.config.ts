import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { patchCssModules } from 'vite-css-modules';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import className from 'css-class-generator';

export default defineConfig(({command}) => ({
    plugins: [
        patchCssModules(),
        vue(),
        dts({
            cleanVueFileName: true,
            staticImport: true
        })
    ],
    build: {
        emptyOutDir: command === 'build',
        cssMinify: 'esbuild',
        minify: 'esbuild',
        outDir: resolve(import.meta.dirname, './dist'),
        sourcemap: true,
        lib: {
            entry: resolve(import.meta.dirname, './src/index.ts'),
            fileName: 'flux',
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
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        },
        modules: {
            generateScopedName(name: string): string {
                if (name.startsWith('i__const_')) {
                    name = name.substring(9);
                    name = name.substring(0, name.length - 2);
                }

                const hash = createHash('sha1')
                    .update(name)
                    .digest('hex')
                    .substring(0, 5);

                return className(parseInt(hash, 16));
            }
        }
    },
    define: {
        __VUE_OPTIONS_API__: 'false'
    },
    resolve: {
        alias: {
            '@': resolve(import.meta.dirname, './src')
        }
    }
}));

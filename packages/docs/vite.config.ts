import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { patchCssModules } from 'vite-css-modules';
import vue from '@vitejs/plugin-vue';
import className from 'css-class-generator';

export default defineConfig({
    plugins: [
        patchCssModules(),
        vue()
    ],
    build: {
        cssMinify: 'esbuild',
        minify: 'esbuild',
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[hash].[ext]',
                chunkFileNames: 'assets/[hash].js',
                entryFileNames: 'assets/[hash].js'
            }
        }
    },
    css: {
        preprocessorMaxWorkers: true,
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
    },
    server: {
        sourcemapIgnoreList: path => path.includes('node_modules')
    }
});

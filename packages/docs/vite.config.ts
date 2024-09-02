import { createHash } from 'crypto';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import generateClassName from 'css-class-generator';

export default defineConfig(({mode}) => ({
    build: {
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
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src/')
        }
    },
    server: {
        sourcemapIgnoreList: relativeSourcePath => relativeSourcePath.includes('node_modules')
    }
}));

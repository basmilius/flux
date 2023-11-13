import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHash } from 'crypto';

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
        modules: {
            localsConvention: 'camelCaseOnly',
            // generateScopedName(name, filename) {
            //     filename = filename.split('?')[0];
            //
            //     const hash = createHash('sha1')
            //         .update(name + filename)
            //         .digest('base64url')
            //         .substring(0, 4);
            //
            //     return `_${hash}`;
            // }
        }
    },
    plugins: [vue()],
    resolve: {
        alias: {
            '@docs': resolve(__dirname, 'src/'),
            '@': [resolve(__dirname, '../flux/src/')],
            ...(mode === 'development'
                ? {
                    '@fancee/flux/style.css': resolve(__dirname, '../flux/src/css/index.scss'),
                    '@fancee/flux': resolve(__dirname, '../flux/src/index.ts')
                }
                : {})
        }
    },
    server: {
        sourcemapIgnoreList: relativeSourcePath => relativeSourcePath.includes('node_modules')
    }
}));

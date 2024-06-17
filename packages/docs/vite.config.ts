import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

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
    plugins: [vue()],
    resolve: {
        alias: {
            '@docs': resolve(__dirname, 'src/'),
            '@': resolve(__dirname, '../flux/src/'),
            ...(mode === 'development'
                ? {
                    '@basmilius/flux/style.css': resolve(__dirname, '../flux/src/css/index.scss'),
                    '@basmilius/flux': resolve(__dirname, '../flux/src/index.ts')
                }
                : {})
        }
    },
    server: {
        sourcemapIgnoreList: relativeSourcePath => relativeSourcePath.includes('node_modules')
    }
}));

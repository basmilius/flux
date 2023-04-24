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
            '@': resolve(__dirname, 'src/'),
            ...(mode === 'development'
                ? {
                    '@fancee/flux/style.css': resolve(__dirname, '../flux/src/scss/index.scss'),
                    '@fancee/flux': resolve(__dirname, '../flux/src/index.ts')
                }
                : {})
        }
    },
    server: {
        sourcemapIgnoreList: relativeSourcePath => relativeSourcePath.includes('node_modules')
    }
}));

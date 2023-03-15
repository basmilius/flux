import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
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
            '@': resolve(__dirname, 'src/')
        }
    }
});

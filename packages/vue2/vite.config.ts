import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'FanceeFlux',
            fileName: 'fancee.flux'
        },
        outDir: resolve(__dirname, './dist'),
        rollupOptions: {
            external: ['luxon', 'pinia', 'vue'],
            output: {
                exports: 'named',
                globals: {
                    'luxon': 'luxon',
                    'pinia': 'pinia',
                    'vue': 'vue'
                }
            }
        }
    },
    optimizeDeps: {
        exclude: ['vue-demi']
    },
    plugins: [
        vue(),
        dts({
            cleanVueFileName: true,
            root: resolve(__dirname, '../flux')
        })
    ]
});

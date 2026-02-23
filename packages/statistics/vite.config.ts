import { closeBundle, preset } from '@basmilius/vite-preset';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        preset({
            cssModules: {
                classNames: 'kebab'
            },
            isLibrary: true,
            tsconfigPath: resolve(import.meta.dirname, 'tsconfig.app.json')
        }),
        vue(),
        closeBundle()
    ],
    experimental: {
        enableNativePlugin: true
    },
    build: {
        assetsDir: '',
        emptyOutDir: true,
        outDir: resolve(import.meta.dirname, 'dist'),
        sourcemap: true,
        lib: {
            entry: resolve(import.meta.dirname, 'src/index.ts'),
            fileName: 'index',
            formats: ['es'],
            name: 'fluxStatistics'
        },
        rolldownOptions: {
            experimental: {
                lazyBarrel: true
            },
            external: ['@flux-ui/components', 'apexcharts', 'lodash-es', 'vue', 'vue-i18n', 'vue3-apexcharts'],
            output: {
                exports: 'named',
                sourcemapIgnoreList: path => path.includes('node_modules')
            }
        }
    },
    define: {
        __VUE_OPTIONS_API__: 'false'
    },
    resolve: {
        alias: {
            '$flux': resolve(import.meta.dirname, '../components/src'),
            '$fluxStatistics': resolve(import.meta.dirname, 'src')
        }
    }
});

import { preset } from '@basmilius/vite-preset';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({mode}) => ({
    plugins: [
        preset({
            cssModules: {
                classNames: 'kebab'
            },
            isLibrary: true
        }),
        vue(),
        {
            closeBundle(error) {
                process.exit(error ? 1 : 0);
            }
        }
    ],
    build: {
        assetsDir: '',
        emptyOutDir: mode !== 'dev',
        outDir: resolve(import.meta.dirname, 'dist'),
        sourcemap: true,
        lib: {
            entry: resolve(import.meta.dirname, 'src/index.ts'),
            fileName: 'index',
            formats: ['es'],
            name: 'fluxDashboard'
        },
        rollupOptions: {
            external: ['@flux-ui/components', 'luxon', 'vue'],
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
    define: {
        __VUE_OPTIONS_API__: 'false'
    },
    resolve: {
        alias: {
            '$fluxDashboard': resolve(import.meta.dirname, 'src')
        }
    }
}));

import { closeBundle, preset } from '@basmilius/vite-preset';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import defineFilterMacro from './src/vite/defineFilterMacro';

export default defineConfig(({mode}) => ({
    plugins: [
        defineFilterMacro(),
        preset({
            cssModules: {
                classNames: 'kebab'
            },
            isLibrary: true,
            tsconfigPath: resolve(import.meta.dirname, 'tsconfig.app.json')
        }),
        vue(),
        mode !== 'development' && closeBundle()
    ],
    build: {
        assetsDir: '',
        emptyOutDir: true,
        outDir: resolve(import.meta.dirname, 'dist'),
        sourcemap: true,
        lib: {
            entry: {
                index: resolve(import.meta.dirname, 'src/index.ts'),
                vite: resolve(import.meta.dirname, 'src/vite/index.ts')
            },
            formats: ['es'],
            fileName: (_format, entryName) => `${entryName}.js`,
            name: 'flux'
        },
        rolldownOptions: {
            experimental: {
                lazyBarrel: true
            },
            external: ['luxon', 'vite', 'vue'],
            output: {
                assetFileNames: assetInfo => {
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'index.css';
                    }

                    return '[name][extname]';
                },
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
            '~flux/components': resolve(import.meta.dirname, 'src')
        }
    }
}));

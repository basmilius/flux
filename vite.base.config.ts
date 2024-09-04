import { createHash } from 'crypto';
import { resolve as _resolve } from 'path';
import { patchCssModules } from 'vite-css-modules';
import generateClassName from 'css-class-generator';
import vue from '@vitejs/plugin-vue';

import type { UserConfig } from 'vite';

export const build = (dirname: string, emptyOutDir: boolean, name: string, fileName: string, external: string[], globals: Record<string, string>): UserConfig['build'] => ({
    lib: {
        entry: _resolve(dirname, './src/index.ts'),
        name,
        fileName
    },
    emptyOutDir,
    minify: 'esbuild',
    outDir: _resolve(dirname, './dist'),
    rollupOptions: {
        external,
        output: {
            exports: 'named',
            globals,
            sourcemapIgnoreList: relativeSourcePath => relativeSourcePath.includes('node_modules')
        }
    },
    sourcemap: true
});

export const css = (): UserConfig['css'] => ({
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
});

export const plugins = (): UserConfig['plugins'] => [
    patchCssModules(),
    vue()
];

export const resolve = (dirname: string): UserConfig['resolve'] => ({
    alias: {
        '@': _resolve(dirname, 'src')
    }
});

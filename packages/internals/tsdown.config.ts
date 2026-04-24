import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: [
        './src/index.ts',
        './src/composable/index.ts',
        './src/data/index.ts',
        './src/directive/index.ts',
        './src/util/index.ts'
    ],
    format: 'esm',
    outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
    dts: true,
    minify: true
});

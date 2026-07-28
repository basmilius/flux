import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: [
        './src/index.ts',
        './src/composable/index.ts',
        './src/data/index.ts',
        './src/directive/index.ts',
        './src/util/index.ts'
    ],
    deps: {
        neverBundle: [
            '@flux-ui/types',
            'lodash-es',
            'luxon',
            'vue',
            'vue-i18n'
        ]
    },
    format: 'esm',
    outExtensions: () => ({js: '.js', dts: '.d.ts'}),
    dts: true,
    minify: true
});

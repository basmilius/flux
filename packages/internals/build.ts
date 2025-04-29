import { build, dts } from '@basmilius/tools';

await build({
    entrypoints: ['src/index.ts'],
    external: [
        '@basmilius/utils',
        'lodash-es',
        'luxon',
        'vue'
    ],
    plugins: [
        dts()
    ]
});

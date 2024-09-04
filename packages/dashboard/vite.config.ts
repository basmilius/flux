import { defineConfig } from 'vite';
import { build, css, plugins, resolve } from '../../vite.base.config';

const fileName = 'basmilius.flux';
const name = 'bmflux_dashboard';

const external = ['@basmilius/flux', 'luxon', 'vue'];
const globals = {
    '@basmilius/flux': 'bmflux',
    luxon: 'luxon',
    vue: 'vue'
};

export default defineConfig(({command}) => ({
    build: build(
        import.meta.dirname,
        command === 'build',
        name,
        fileName,
        external,
        globals
    ),
    css: css(),
    plugins: plugins(),
    resolve: resolve(import.meta.dirname)
}));

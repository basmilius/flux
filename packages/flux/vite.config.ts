import { defineConfig } from 'vite';
import { build, css, plugins, resolve } from '../../vite.base.config';

const fileName = 'basmilius.flux';
const name = 'bmflux';

const external = ['luxon', 'vue'];
const globals = {
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

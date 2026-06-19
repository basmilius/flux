import { flux, fluxApplication, fluxStatistics, preset } from '@basmilius/vite-preset';
import { defineFilterMacro } from '@flux-ui/components/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        defineFilterMacro(),
        preset({
            cssModules: {
                classNames: 'kebab'
            }
        }),
        flux(),
        fluxApplication(),
        fluxStatistics(),
        vue()
    ],
    server: {
        port: 5175
    }
});

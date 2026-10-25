import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
import {defineConfig} from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '~flux/ai': resolve(import.meta.dirname, '../ai/src'),
            '~flux/application': resolve(import.meta.dirname, '../application/src'),
            '~flux/components': resolve(import.meta.dirname, '../components/src'),
            '~flux/flow': resolve(import.meta.dirname, '../flow/src'),
            '~flux/statistics': resolve(import.meta.dirname, '../statistics/src'),
            '~flux/visuals': resolve(import.meta.dirname, '../visuals/src')
        }
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts']
    }
});

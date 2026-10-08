import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/react/' : '/',
    root: import.meta.dirname,
    plugins: [react()],
    build: {
        emptyOutDir: true,
        outDir: resolve(import.meta.dirname, '../../../docs/public/react')
    },
    server: {
        host: '127.0.0.1',
        port: 4173,
        strictPort: true
    }
}));

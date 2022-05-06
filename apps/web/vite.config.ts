/// <reference types="vitest/config" />
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import swc from 'unplugin-swc';

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        globals: true,
    },
    plugins: [swc.vite({ tsconfigFile: './tsconfig.json' }), vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    },
});

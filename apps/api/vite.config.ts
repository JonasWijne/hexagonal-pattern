/// <reference types="vitest/config" />
import path from 'path';
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
    test: {
        globals: true,
    },
    server: {
        port: 3001,
    },
    plugins: [
        ...VitePluginNode({
            adapter: 'nest',
            appPath: './src/main.ts',
            tsCompiler: 'swc',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    },
    optimizeDeps: {
        exclude: [
            '@nestjs/microservices',
            '@nestjs/websockets',
            'cache-manager',
            'class-transformer',
            'class-validator',
            'fastify-swagger',
            'mock-aws-s3',
            'aws-sdk',
            'nock',
        ],
    },
});

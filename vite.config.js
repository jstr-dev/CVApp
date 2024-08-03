import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import 'dotenv/config';
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    build: {
        minify: process.env.APP_ENV === 'production' ? 'esbuild' : false,
        cssMinify: process.env.APP_ENV === 'production',
    },
    plugins: [
        laravel({
            input: ['resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
                tailwindcss(),
            ]
        }
    }
});
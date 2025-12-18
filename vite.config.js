import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true, // This ensures Laravel reloads on PHP changes
        }),
        react(),
    ],
    server: {
        watch: {
            usePolling: true, // THIS IS THE MAGIC LINE FOR WSL2
        },
        host: 'localhost',
    },
});
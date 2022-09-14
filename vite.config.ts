import {defineConfig} from 'vite'
import {visualizer} from "rollup-plugin-visualizer";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer({
            brotliSize: true,
            gzipSize: true,
            template: 'list',
            filename: 'stats/rollup-stats.html',
            title: 'Rollup (Build) stats',
        })],
    build: {
        outDir: 'build',
        sourcemap: true,
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
})

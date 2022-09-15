import {defineConfig} from 'vite'
import {visualizer} from "rollup-plugin-visualizer";
import react from '@vitejs/plugin-react'
import swc from 'unplugin-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        swc.vite(),
        swc.rollup(),
        visualizer({
            brotliSize: true,
            gzipSize: true,
            template: 'sunburst',
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

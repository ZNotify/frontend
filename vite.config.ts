import {defineConfig} from 'vite'
import {visualizer} from "rollup-plugin-visualizer";
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    base: '/fs/',
    plugins: [
        react(),
        VitePWA({
            base: '/fs/',
            strategies: 'injectManifest',
            registerType: 'autoUpdate',
            srcDir: 'src',
            filename: 'serviceWorker.ts',
            workbox: {
                sourcemap: true
            },
            devOptions: {
                enabled: true,
                type: 'module'
            },
            injectRegister: 'inline',
        }),
        visualizer({
            brotliSize: true,
            gzipSize: true,
            template: 'sunburst',
            filename: 'stats/rollup-stats.html',
            title: 'Rollup (Build) stats',
        })
    ],
    build: {
        outDir: 'build',
        chunkSizeWarningLimit: 1000,
        sourcemap: true,
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2019',
        },
    },
})

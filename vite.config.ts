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
            manifest: {
                name: "Notify UI",
                short_name: "notify",
                start_url: "/",
                display: "standalone",
                theme_color: "#a1c4fd",
                scope: "/",
                lang: "zh-CN",
                prefer_related_applications: true,
                related_applications: [
                    {
                        platform: "play",
                        url: "https://play.google.com/store/apps/details?id=top.learningman.push",
                        id: "top.learningman.push"
                    }
                ]
            }
        }),
        // @ts-ignore
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
        rollupOptions:{
            output: {
                compact: true,
                entryFileNames: '[hash].js',
                chunkFileNames: '[hash].js',
                assetFileNames: '[hash][extname]',
            }
        }
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

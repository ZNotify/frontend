import {defineConfig} from 'vite'
import {visualizer} from "rollup-plugin-visualizer";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/fs/',
    plugins: [
        react(),
    ],
    build: {
        outDir: 'build',
        chunkSizeWarningLimit: 1000,
        minify: 'terser',
        terserOptions: {
            compress: {
                passes: 2,
                dead_code: true,
                drop_console: true,
                drop_debugger: true,
                ecma: 2020
            },
            format: {
                comments: false,
                ascii_only: true,
            }
        },
        rollupOptions: {
            input: {
                app: './index.html',
                serviceWorker: './src/serviceWorker.ts',
            },
            output: {
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name === 'serviceWorker') {
                        return 'serviceWorker.js';
                    }
                    return '[name].[hash].js';
                }
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
        disabled: true,
    }
})

import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) { // Example: Split vendor libraries into their own chunk
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        }
    },
    plugins: [react()],
    server: {
        allowedHosts: ['c992-2003-df-5704-3a00-dd8c-1311-91bf-2.ngrok-free.app']
    }

})

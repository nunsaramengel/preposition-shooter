import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: ['c992-2003-df-5704-3a00-dd8c-1311-91bf-2.ngrok-free.app']
    }

})

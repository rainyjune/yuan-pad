import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        front: resolve(__dirname, 'index.html'),
        acp: resolve(__dirname, 'admin.html'),
      },
    },
  },
  server: {
    port: 8000,
    proxy: {
      "/index.php": {
        target: "http://localhost/yuan-pad/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

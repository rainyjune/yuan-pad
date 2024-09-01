import path, { resolve } from "path";

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  experimental: {
    // https://vitejs.dev/guide/build.html#advanced-base-options
    renderBuiltUrl(filename, { hostId, hostType, type }) {
      const ext = path.extname(hostId);
      console.log('[filename:]', filename, ' hostId:', hostId, ' type: ', type, ' hostType: ', hostType, 'ext:', ext);
      if (type === 'public') { // Not sure when to use it.
        return 'https://www.domain.com/' + filename
      } else if (ext === '.js') { // Seems not in use
        return { runtime: `window.__assetsPath(${JSON.stringify(filename)})` }
      } else if (hostType === 'css') { // Used for font files in Bootstrap
        return filename.split('/')[1];
      } else {
        return './themes/goofish/templates/' + filename;
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: "templates", // Generate all static files into `templates` directory, which is used by PHP to show webpages
    rollupOptions: {
      input: {
        front: resolve(__dirname, "index.html"),
        acp: resolve(__dirname, "admin.html"),
      },
    },
  },
  server: {
    port: 8000,
    proxy: {
      "/index.php": {
        target: "http://localhost/yuan-pad/", // Change this value if you're serving your app with a different domain or path
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

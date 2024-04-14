import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": "http://localhost:8000",
//     },
//   },
// });

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/server/dist', // Adjust to match dist folder directory
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});

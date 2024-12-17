import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // Add this plugin to resolve paths from tsconfig.json
  ],
  server: {
    "port" :3000
  }
});

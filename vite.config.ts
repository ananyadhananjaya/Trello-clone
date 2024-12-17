import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // css: {
  //   postcss: {
  //     plugins: [
  //       require('tailwindcss'),
  //       require('autoprefixer')
  //     ],
  //   },
  // },
  server: {
    port: 3000, // Set your preferred port for local development
  },
  build: {
    outDir: 'build', // Output directory for the build
  },
});

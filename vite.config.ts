import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  server: {
    port: PORT,
  },
  preview: {
    port: PORT,
  },
});

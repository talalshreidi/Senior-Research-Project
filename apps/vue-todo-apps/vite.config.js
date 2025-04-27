import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehavior: 'local',
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.css']
  }
});
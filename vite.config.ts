import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 配置路径别名，简化导入
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    // 打包优化
    chunkSizeWarningLimit: 1000, // 增大体积警告阈值
    rollupOptions: {
      output: {
        // 拆分代码包
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios', 'zustand', 'antd'],
        },
      },
    },
  },
});

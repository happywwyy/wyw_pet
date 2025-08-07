import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量，尝试多个路径
  const env = loadEnv(mode, process.cwd(), '');
  
  console.log('=== Vite 环境变量加载检查 ===');
  console.log('Mode:', mode);
  console.log('Working Directory:', process.cwd());
  console.log('VITE_DEEPSEEK_API_KEY:', env.VITE_DEEPSEEK_API_KEY ? `${env.VITE_DEEPSEEK_API_KEY.substring(0, 10)}...` : 'undefined');
  console.log('VITE_KIMI_API_KEY:', env.VITE_KIMI_API_KEY ? `${env.VITE_KIMI_API_KEY.substring(0, 10)}...` : 'undefined');
  
  return {
    plugins: [
      react(),
      viteMockServe({
        mockPath: "mock",
        localEnabled: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // 手动定义环境变量，确保客户端能访问
      'import.meta.env.VITE_DEEPSEEK_API_KEY': JSON.stringify(env.VITE_DEEPSEEK_API_KEY || 'sk-b0eecba5c43648c6ba76b5f7c711cf59'),
      'import.meta.env.VITE_KIMI_API_KEY': JSON.stringify(env.VITE_KIMI_API_KEY || 'sk-sxPhA1nG1TxC41pgy1TE5xztM79ssmMtMCbtwIYPTqP119gz'),
    },
    // 确保环境变量目录正确
    envDir: '.',
    envPrefix: 'VITE_',
  };
});
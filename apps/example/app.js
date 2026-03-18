import { MiGPT } from '@mi-gpt/next';
import config from './config.js';
// 新增：导入http模块（适配ESModule语法，和你的代码风格一致）
import http from 'http';

// Gracefully shutdown
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => process.exit(0));
}

// 新增：启动空的HTTP服务器，监听Render默认端口10000（仅用于骗过端口检查）
// 无任何业务逻辑，不占资源，纯为了满足Web Service的端口要求
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('MiGPT Next is running'); // 可选：健康检查返回简单文本
}).listen(10000, '0.0.0.0', () => {
  console.log('✅ 端口10000已监听（仅用于Render健康检查）');
});

async function main() {
  try {
    await MiGPT.start(config);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();

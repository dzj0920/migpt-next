# 1. 稳定基础镜像（适配 migpt-next 依赖）
FROM node:20-alpine

# 2. 切换到 config/app.js 所在的 example 目录（核心！匹配锁文件和配置文件路径）
WORKDIR /app/apps/example

# 3. 复制 example 目录所有文件（包含 config.js、app.js、package-lock.json）
COPY apps/example/ .

# 4. 执行 npm ci（锁文件在当前目录，无报错）
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# 5. 启动程序（读取镜像内的 config.js，无需 Render 挂载）
CMD ["node", "app.js"]

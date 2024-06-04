FROM node:20 AS base

# 第一步 仅在需要时在构建源代码
FROM base AS builder

WORKDIR /app

# 基于首选的程序包管理器安装依赖
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# 生产环境 忽略ts依赖
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  # 运行在没有锁定文件时继续安装依赖，因此即使本地没有安装nodejs时依然可以运行
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi


COPY . .

# 环境变量必须在构建时指定
ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}
ARG DATABASE_URL
ENV DATABASE_URL=postgresql://template:123456@localhost:5432/template?schema=prod&connect_timeout=300

RUN npx prisma generate
RUN npx prisma migrate deploy

# 禁用next.js在构建时收集数据
ENV NEXT_TELEMETRY_DISABLED 1

# 基于首选包管理器进行构建 ????????
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else npm run build; \
  fi

#  第二步 生产镜像，复制所有文件并运行
FROM base AS runner

WORKDIR /app

# 不要以 root 身份用户 在生产环境运行
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# 自动利用输出跟踪来缩小图片大小
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma/

# 环境变量必须在构建时指定
ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}
ARG ENV_VARIABLE
ENV DATABASE_URL=postgresql://template:123456@postgres:5432/template?schema=prod

ENV NEXT_TELEMETRY_DISABLED 1

# 不要在这里公开端口 可以用compose来处理

CMD ["node", "server.js"]

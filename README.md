# 项目简介
> 这是综合性项目模版：
> * 使用`nextjs`作为全栈应用框架，
> * 使用`tailwindcss`做为样式库，
> * 使用`postgresSql`做为持久数据库，
> * 使用`redis`做为快速读写的内存数据库
> * 使用`prisma`做为数据库的ORM工具
> * 使用`typescript`做为`javascript`的类型超集
> * 使用`docker`做为容器部署工具

## 模版内置工具
* 集成了`prisma`ORM管理工具

## 模版演示项目
* `back-manage` - 管理端应用
* `frontend` - 客户端应用

## 启动本地开发

### 安装依赖
> 为了本地开发有更好的提示，需要对每个项目安装依赖

进入目标应用路径`cd frontend`|`cd back-manange`

```sh
npm i
```

### 准备本地数据库环境
* 安装或启动数据服务
  * 本地启动`redis`  (可选，目前演示功能未使用)
  * 本地启动`postgersSql`

* 修改`xxx/.env`文件里，数据库连接时使用的必要信息

### 同步数据库表

```sh
npm run db:generate
npm run db:migrate:dev  # 这里会有交互，输入标识字符串即可 如：init、update等
```
### 启动本地环境

```sh
npm run dev
```

### 使用docker启动dev环境
* 先进行镜像构建
```sh
docker compose -f ./docker-compose.dev.yml build
```

* 启动dev环境容器
```sh
docker compose -f ./docker-compose.dev.yml up -d
```

### 生产环境构建和部署

* 先进行镜像构建
```sh
docker compose -f ./docker-compose.prod.yml build
```

* 启动dev环境容器
```sh
docker compose -f ./docker-compose.prod.yml up -d
```
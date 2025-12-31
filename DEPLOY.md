# Vercel 部署指南

本指南将帮助您将项目部署到 Vercel。

## 方法 1: 通过 GitHub 部署（推荐）

这是最简单和推荐的方式，支持自动部署。

### 步骤 1: 准备 Git 仓库

1. **初始化 Git 仓库**（如果还没有）
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **在 GitHub 上创建新仓库**
   - 访问 https://github.com/new
   - 创建新仓库（例如：`2026-countdown`）
   - **不要**初始化 README、.gitignore 或 license

3. **将代码推送到 GitHub**
   ```bash
   git remote add origin https://github.com/你的用户名/2026-countdown.git
   git branch -M main
   git push -u origin main
   ```

### 步骤 2: 在 Vercel 上部署

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择你刚创建的 GitHub 仓库
   - 点击 "Import"

3. **配置项目**
   - Vercel 会自动检测 Next.js 项目
   - 框架预设：**Next.js**
   - 构建命令：`npm run build`（自动检测）
   - 输出目录：`.next`（自动检测）
   - 安装命令：`npm install`（自动检测）

4. **环境变量**（如果需要）
   - 在 "Environment Variables" 中添加任何需要的环境变量
   - 当前项目不需要环境变量

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成（通常 1-3 分钟）

6. **完成**
   - 部署成功后，你会获得一个 URL（例如：`https://2026-countdown.vercel.app`）
   - 每次推送到 GitHub，Vercel 会自动重新部署

## 方法 2: 通过 Vercel CLI 部署

适合快速部署，不需要 GitHub。

### 步骤 1: 安装 Vercel CLI

```bash
npm install -g vercel
```

### 步骤 2: 登录 Vercel

```bash
vercel login
```

### 步骤 3: 部署

在项目目录下运行：

```bash
vercel
```

首次部署会询问一些问题：
- **Set up and deploy?** → 输入 `Y`
- **Which scope?** → 选择你的账号
- **Link to existing project?** → 输入 `N`（首次部署）
- **What's your project's name?** → 输入项目名称（例如：`2026-countdown`）
- **In which directory is your code located?** → 输入 `./`（当前目录）

### 步骤 4: 生产环境部署

```bash
vercel --prod
```

## 部署后访问

部署成功后，你会获得：
- **预览 URL**：每次推送代码都会生成新的预览 URL
- **生产 URL**：格式为 `https://你的项目名.vercel.app`

## 自定义域名（可选）

1. 在 Vercel 项目设置中，点击 "Domains"
2. 输入你的域名
3. 按照提示配置 DNS 记录
4. 等待 DNS 生效（通常几分钟到几小时）

## 注意事项

### 1. 内存存储限制

当前项目使用内存存储弹幕数据，在 Vercel 的无服务器环境中：
- 数据在函数重启后会丢失
- 不同实例之间不共享数据

如果需要真正的持久化，建议：
- 使用 Vercel KV（Redis）
- 使用数据库（PostgreSQL、MongoDB 等）
- 使用 Vercel Blob Storage

### 2. 构建配置

项目已包含 `vercel.json` 配置文件：
- 构建命令：`npm run build`
- 框架：Next.js
- 区域：`hkg1`（香港）

### 3. 环境变量

如果需要添加环境变量：
1. 在 Vercel 项目设置中
2. 进入 "Environment Variables"
3. 添加变量（开发、预览、生产环境可分别配置）

## 故障排除

### 构建失败

1. **检查 Node.js 版本**
   - Vercel 默认使用 Node.js 18.x
   - 如需指定版本，在 `package.json` 中添加：
     ```json
     "engines": {
       "node": "18.x"
     }
     ```

2. **检查依赖**
   - 确保所有依赖都在 `package.json` 中
   - 运行 `npm install` 确保本地可以构建

3. **查看构建日志**
   - 在 Vercel 项目页面查看详细的构建日志
   - 根据错误信息修复问题

### API 路由不工作

- 确保 API 路由在 `app/api/` 目录下
- 检查路由文件命名是否正确（`route.ts` 或 `route.js`）
- 查看 Vercel 函数日志

## 更新部署

### 通过 GitHub（自动）

每次推送到 GitHub 的 `main` 分支，Vercel 会自动：
1. 检测到代码更新
2. 触发新的构建
3. 部署到生产环境

### 通过 CLI（手动）

```bash
# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

## 回滚部署

如果新部署有问题，可以回滚：
1. 在 Vercel 项目页面
2. 进入 "Deployments"
3. 找到之前的部署
4. 点击 "..." → "Promote to Production"

## 更多资源

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Vercel CLI 文档](https://vercel.com/docs/cli)


# 2026 跨年倒计时网站

一个现代化的网站，基于 Next.js 14 构建，可轻松部署到 Vercel。

## 前置要求

在开始之前，您需要安装 **Node.js**（npm 会随 Node.js 一起安装）：

### 安装 Node.js

1. **从官网下载（推荐）**
   - 访问 https://nodejs.org/
   - 下载并安装 LTS（长期支持）版本
   - 安装完成后，重启命令行窗口

2. **使用包管理器（Windows）**
   ```powershell
   # 使用 Winget
   winget install OpenJS.NodeJS.LTS
   
   # 或使用 Chocolatey（需要管理员权限）
   choco install nodejs
   ```

3. **验证安装**
   ```bash
   node --version
   npm --version
   ```
   如果显示版本号，说明安装成功。

## 功能特性

- ⚡ 基于 Next.js 14 App Router
- 🎨 现代化的 UI 设计
- 📱 完全响应式布局
- ⏰ 实时时钟显示
- 🌐 优化用于 Vercel 部署

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

## 部署到 Vercel

详细的部署指南请查看 [DEPLOY.md](./DEPLOY.md)

**⚠️ 中国大陆访问问题**：
- 如果 Vercel 在中国大陆无法访问，请查看 [CHINA_DEPLOY.md](./CHINA_DEPLOY.md) 了解替代方案
- 关于域名映射的详细说明，请查看 [DOMAIN_MAPPING.md](./DOMAIN_MAPPING.md)

### 快速部署

**方法 1: 通过 GitHub（推荐）**

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 登录
3. 点击 "Add New Project"
4. 导入你的 GitHub 仓库
5. Vercel 会自动检测 Next.js 项目并部署

**方法 2: 通过 Vercel CLI**

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

## 项目结构

```
.
├── app/
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 主页面
│   ├── globals.css     # 全局样式
│   └── page.module.css # 页面样式
├── next.config.js      # Next.js 配置
├── package.json        # 项目依赖
├── tsconfig.json       # TypeScript 配置
└── vercel.json         # Vercel 部署配置
```

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **CSS Modules** - 样式管理

## License

MIT


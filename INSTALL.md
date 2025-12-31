# 安装指南

## 安装 Node.js 和 npm

### 方法 1: 从官网下载安装（推荐）

1. 访问 Node.js 官网：https://nodejs.org/
2. 下载 LTS（长期支持）版本（推荐）
3. 运行安装程序，按照提示完成安装
4. 安装完成后，重启命令行窗口

### 方法 2: 使用包管理器安装

#### 使用 Chocolatey（Windows）

```powershell
# 以管理员身份运行 PowerShell
choco install nodejs
```

#### 使用 Winget（Windows 10/11）

```powershell
winget install OpenJS.NodeJS.LTS
```

### 验证安装

安装完成后，打开新的命令行窗口，运行：

```bash
node --version
npm --version
```

如果显示版本号，说明安装成功。

## 解决 PowerShell 执行策略问题

如果遇到错误：`无法加载文件 C:\Program Files\nodejs\npm.ps1`

### 方法 1: 修改 PowerShell 执行策略（推荐）

以**管理员身份**运行 PowerShell，然后执行：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

然后重新打开 PowerShell 窗口。

### 方法 2: 使用 CMD 而不是 PowerShell

在 Windows 中，可以使用 **命令提示符（CMD）** 而不是 PowerShell：

1. 按 `Win + R`，输入 `cmd`，按回车
2. 导航到项目目录
3. 运行 `npm install`

### 方法 3: 使用 npm.cmd

在 PowerShell 中，可以使用：

```powershell
npm.cmd install
npm.cmd run dev
```

## 安装项目依赖

安装 Node.js 后，在项目目录运行：

```bash
npm install
```

## 启动开发服务器

```bash
npm run dev
```

然后在浏览器打开 http://localhost:3000



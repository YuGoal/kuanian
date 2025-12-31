# 故障排除指南

## PowerShell 执行策略问题

### 错误信息
```
npm : 无法加载文件 C:\Program Files\nodejs\npm.ps1，因为在此系统上禁止运行脚本
```

### 解决方案

#### 方案 1: 修改执行策略（推荐）

1. **以管理员身份运行 PowerShell**
   - 右键点击"开始"菜单
   - 选择"Windows PowerShell (管理员)"

2. **执行以下命令**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **确认更改**
   - 输入 `Y` 确认

4. **重新打开 PowerShell 窗口**
   - 关闭当前窗口，打开新的 PowerShell 窗口

5. **验证**
   ```powershell
   npm --version
   ```

#### 方案 2: 使用 CMD（命令提示符）

如果不想修改 PowerShell 策略，可以使用 CMD：

1. 按 `Win + R`
2. 输入 `cmd`，按回车
3. 导航到项目目录：
   ```cmd
   cd D:\code\web
   ```
4. 运行 npm 命令：
   ```cmd
   npm install
   ```

#### 方案 3: 使用 npm.cmd

在 PowerShell 中，可以直接调用 `npm.cmd`：

```powershell
npm.cmd install
npm.cmd run dev
```

#### 方案 4: 临时绕过执行策略

在 PowerShell 中运行单个命令时：

```powershell
powershell -ExecutionPolicy Bypass -Command "npm install"
```

## 其他常见问题

### Node.js 未找到

确保 Node.js 已正确安装并添加到系统 PATH：
1. 检查安装：`node --version`
2. 如果未找到，重新安装 Node.js 并确保选择"添加到 PATH"选项

### 网络问题

如果下载依赖时遇到网络问题，可以使用国内镜像：

```bash
npm config set registry https://registry.npmmirror.com/
```

恢复默认源：
```bash
npm config set registry https://registry.npmjs.org/
```

### 权限问题

如果遇到权限错误，尝试：
1. 以管理员身份运行命令行
2. 或者使用 `--force` 标志（不推荐）


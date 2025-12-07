# 🚀 部署指南 | Deployment Guide

[English](#english) | [中文](#chinese)

---

<a name="english"></a>
## 📦 English - Deployment Guide

### Prerequisites

Before deploying, ensure you have:

- ✅ Node.js 16.x or higher
- ✅ A Cloudflare account (free tier works)
- ✅ Git installed
- ✅ Basic command line knowledge

### Method 1: Deploy from GitHub (Recommended)

#### Step 1: Clone Repository

```bash
git clone https://github.com/kinai9661/flux2-image-generator.git
cd flux2-image-generator
```

#### Step 2: Install Dependencies

```bash
npm install
```

This will install Wrangler CLI and other necessary dependencies.

#### Step 3: Login to Cloudflare

```bash
npx wrangler login
```

This will open a browser window for authentication. Log in with your Cloudflare account.

#### Step 4: Deploy to Workers

```bash
npx wrangler deploy
```

After successful deployment, you'll see output like:

```
✨ Successfully published your script to
 https://flux2-image-generator.your-subdomain.workers.dev
```

#### Step 5: Test Your Deployment

Visit the URL provided in the deployment output. You should see the FLUX.2 image generator interface.

### Method 2: One-Click Deploy (Coming Soon)

We're working on one-click deployment options:

- [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kinai9661/flux2-image-generator)

### Method 3: Manual Deployment

If you prefer manual setup:

#### 1. Create `worker.js`

Copy the content from the repository's `worker.js` file.

#### 2. Create `wrangler.toml`

```toml
name = "flux2-image-generator"
main = "worker.js"
compatibility_date = "2024-11-25"

[ai]
binding = "AI"
```

#### 3. Deploy

```bash
npx wrangler deploy
```

### Custom Domain Setup

To use your own domain:

#### Option 1: Via Cloudflare Dashboard

1. Go to Cloudflare Dashboard → Workers & Pages
2. Select your worker
3. Go to "Settings" → "Triggers"
4. Click "Add Custom Domain"
5. Enter your domain (e.g., `flux2.yourdomain.com`)

#### Option 2: Via wrangler.toml

Add routes to your `wrangler.toml`:

```toml
routes = [
  { pattern = "flux2.yourdomain.com", zone_name = "yourdomain.com" }
]
```

Then redeploy:

```bash
npx wrangler deploy
```

### Environment Variables (Optional)

If you need to add environment variables:

```bash
# Set a variable
npx wrangler secret put VARIABLE_NAME

# List all secrets
npx wrangler secret list
```

### Local Development

To test locally before deploying:

```bash
npx wrangler dev
```

Visit `http://localhost:8787` to test your application.

### Updating Your Deployment

When you make changes:

```bash
git pull origin main  # Get latest changes
npx wrangler deploy   # Redeploy
```

### Monitoring and Logs

#### View Real-time Logs

```bash
npx wrangler tail
```

#### View Analytics

1. Go to Cloudflare Dashboard
2. Navigate to Workers & Pages
3. Select your worker
4. View metrics and analytics

### Troubleshooting

#### Issue: "Authentication Error"

**Solution**: Run `npx wrangler login` again and ensure you're logged in.

#### Issue: "AI Binding Not Found"

**Solution**: Ensure your `wrangler.toml` includes:

```toml
[ai]
binding = "AI"
```

#### Issue: "Rate Limited"

**Solution**: You've hit the free tier limit. Wait or upgrade to a paid plan.

#### Issue: "Deployment Failed"

**Solution**: Check your `wrangler.toml` syntax and ensure all files are present.

### Cost Estimation

**Cloudflare Workers Free Tier**:
- 100,000 requests per day
- 10ms CPU time per request

**Workers AI Free Tier**:
- 10,000 Neurons per day
- FLUX.2 [dev] consumes neurons per generation

**Expected Usage**:
- Text-to-image: ~50-100 Neurons per generation
- With multi-image: Higher consumption

**Recommendation**: Start with free tier, monitor usage, upgrade if needed.

### Security Best Practices

1. **Enable CORS properly** - Already configured in the worker
2. **Rate limiting** - Consider adding rate limiting for production
3. **API key protection** - Add authentication if needed
4. **Monitor usage** - Keep track of your AI credits

### Next Steps

After deployment:

1. ✅ Test all three generation modes
2. ✅ Monitor your usage in Cloudflare dashboard
3. ✅ Share your deployment URL
4. ✅ Customize the UI if needed
5. ✅ Consider adding analytics

---

<a name="chinese"></a>
## 📦 中文 - 部署指南

### 前置要求

部署前请确保：

- ✅ Node.js 16.x 或更高版本
- ✅ Cloudflare 账号（免费版即可）
- ✅ 已安装 Git
- ✅ 基础命令行知识

### 方法一：从 GitHub 部署（推荐）

#### 步骤 1：克隆仓库

```bash
git clone https://github.com/kinai9661/flux2-image-generator.git
cd flux2-image-generator
```

#### 步骤 2：安装依赖

```bash
npm install
```

这将安装 Wrangler CLI 和其他必要的依赖项。

#### 步骤 3：登录 Cloudflare

```bash
npx wrangler login
```

这将打开浏览器窗口进行身份验证。使用你的 Cloudflare 账号登录。

#### 步骤 4：部署到 Workers

```bash
npx wrangler deploy
```

部署成功后，你会看到类似输出：

```
✨ Successfully published your script to
 https://flux2-image-generator.your-subdomain.workers.dev
```

#### 步骤 5：测试部署

访问部署输出中提供的 URL，你应该能看到 FLUX.2 图像生成器界面。

### 方法二：一键部署（即将推出）

我们正在开发一键部署选项：

- [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kinai9661/flux2-image-generator)

### 方法三：手动部署

如果你喜欢手动设置：

#### 1. 创建 `worker.js`

从仓库复制 `worker.js` 文件的内容。

#### 2. 创建 `wrangler.toml`

```toml
name = "flux2-image-generator"
main = "worker.js"
compatibility_date = "2024-11-25"

[ai]
binding = "AI"
```

#### 3. 部署

```bash
npx wrangler deploy
```

### 自定义域名设置

使用你自己的域名：

#### 方案 1：通过 Cloudflare 控制台

1. 进入 Cloudflare 控制台 → Workers & Pages
2. 选择你的 worker
3. 进入 "Settings" → "Triggers"
4. 点击 "Add Custom Domain"
5. 输入你的域名（例如：`flux2.yourdomain.com`）

#### 方案 2：通过 wrangler.toml

在 `wrangler.toml` 中添加路由：

```toml
routes = [
  { pattern = "flux2.yourdomain.com", zone_name = "yourdomain.com" }
]
```

然后重新部署：

```bash
npx wrangler deploy
```

### 环境变量（可选）

如需添加环境变量：

```bash
# 设置变量
npx wrangler secret put VARIABLE_NAME

# 列出所有密钥
npx wrangler secret list
```

### 本地开发

在部署前本地测试：

```bash
npx wrangler dev
```

访问 `http://localhost:8787` 测试你的应用。

### 更新部署

当你做了更改时：

```bash
git pull origin main  # 获取最新更改
npx wrangler deploy   # 重新部署
```

### 监控和日志

#### 查看实时日志

```bash
npx wrangler tail
```

#### 查看分析数据

1. 进入 Cloudflare 控制台
2. 导航到 Workers & Pages
3. 选择你的 worker
4. 查看指标和分析数据

### 故障排除

#### 问题："Authentication Error"

**解决方案**：重新运行 `npx wrangler login` 确保已登录。

#### 问题："AI Binding Not Found"

**解决方案**：确保你的 `wrangler.toml` 包含：

```toml
[ai]
binding = "AI"
```

#### 问题："Rate Limited"

**解决方案**：你已达到免费额度限制。等待或升级到付费计划。

#### 问题："Deployment Failed"

**解决方案**：检查 `wrangler.toml` 语法并确保所有文件都存在。

### 成本估算

**Cloudflare Workers 免费额度**：
- 每天 100,000 次请求
- 每次请求 10ms CPU 时间

**Workers AI 免费额度**：
- 每天 10,000 Neurons
- FLUX.2 [dev] 每次生成消耗 neurons

**预期使用量**：
- 文本生图：每次生成约 50-100 Neurons
- 多图参考：消耗更高

**建议**：从免费额度开始，监控使用情况，必要时升级。

### 安全最佳实践

1. **正确启用 CORS** - 已在 worker 中配置
2. **速率限制** - 生产环境考虑添加速率限制
3. **API 密钥保护** - 必要时添加身份验证
4. **监控使用情况** - 跟踪你的 AI 额度

### 下一步

部署后：

1. ✅ 测试所有三种生成模式
2. ✅ 在 Cloudflare 控制台监控使用情况
3. ✅ 分享你的部署 URL
4. ✅ 根据需要自定义 UI
5. ✅ 考虑添加分析功能

---

## 🔗 Useful Links | 有用链接

### English
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare Workers AI Documentation](https://developers.cloudflare.com/workers-ai/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [FLUX.2 Model Documentation](https://developers.cloudflare.com/workers-ai/models/flux-2-dev/)

### 中文
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Cloudflare Workers AI 文档](https://developers.cloudflare.com/workers-ai/)
- [Wrangler CLI 参考](https://developers.cloudflare.com/workers/wrangler/)
- [FLUX.2 模型文档](https://developers.cloudflare.com/workers-ai/models/flux-2-dev/)

---

## 📞 Support | 支持

### English
- 🐛 [Report Issues](https://github.com/kinai9661/flux2-image-generator/issues)
- 💬 [Discussions](https://github.com/kinai9661/flux2-image-generator/discussions)
- 📧 Contact: kinai9661@gmail.com

### 中文
- 🐛 [报告问题](https://github.com/kinai9661/flux2-image-generator/issues)
- 💬 [讨论区](https://github.com/kinai9661/flux2-image-generator/discussions)
- 📧 联系方式：kinai9661@gmail.com

---

<div align="center">

**Made with ❤️ by [kinai9661](https://github.com/kinai9661)**

⭐ Star this repo if you find it helpful!

</div>

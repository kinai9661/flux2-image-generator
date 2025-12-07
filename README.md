# 🎨 FLUX.2 [dev] Image Generator | FLUX.2 图像生成器

[![Deploy to Cloudflare Workers](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Workers-F38020?style=flat&logo=cloudflare)](https://workers.cloudflare.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/kinai9661/flux2-image-generator?style=social)](https://github.com/kinai9661/flux2-image-generator)

[English](#english) | [中文](#chinese)

---

<a name="english"></a>
## 🌐 English

### Overview

A powerful FLUX.2 [dev] image generation tool built on Cloudflare Workers AI. Features text-to-image, multi-image reference, and JSON fine-control capabilities.

### ✨ Features

- 🎯 **Text-to-Image** - Multi-language support (English, Chinese, etc.)
- 🖼️ **Multi-Image Reference** - Up to 4 reference images (512x512 each)
- ⚙️ **JSON Fine Control** - Structured parameter control via JSON
- 🎨 **Precise Color** - Hex color code support (e.g., `#F48120`)
- 🌍 **Multi-Language** - Support for Latin and non-Latin scripts
- 🚀 **High Quality** - Generate images up to 4MP resolution
- 📱 **Responsive UI** - Desktop and mobile friendly

### 🚀 Quick Start

#### Prerequisites

- Node.js 16+
- Cloudflare Account (free tier works)
- Wrangler CLI

#### Installation

```bash
# 1. Clone repository
git clone https://github.com/kinai9661/flux2-image-generator.git
cd flux2-image-generator

# 2. Install dependencies
npm install

# 3. Login to Cloudflare
npx wrangler login

# 4. Deploy to Workers
npx wrangler deploy

# 5. Local development (optional)
npx wrangler dev
```

After deployment, you'll receive a `*.workers.dev` URL to access your generator.

### 📖 Usage Guide

#### 1️⃣ Text-to-Image Mode

Simplest mode - just enter your prompt:

```
a cyberpunk cat wearing sunglasses, neon lights background #F48120
```

**Supported Features:**
- Multi-language prompts
- Hex colors: `#F48120` (Cloudflare orange)
- Digital assets: landing pages, comics, infographics

#### 2️⃣ Multi-Image Reference Mode

Upload 1-4 reference images, then enter prompt:

```
take the subject of image 1 and style it like image 0
```

Or natural language:

```
place the dog beside the woman
```

**Use Cases:**
- Style transfer
- Character addition
- Image iteration

#### 3️⃣ JSON Prompt Mode

Fine control via JSON structure:

```json
{
  "scene": "bustling city street",
  "subject": "a fashionable woman",
  "style": "cinematic",
  "lighting": "golden hour",
  "color_scheme": "#F48120",
  "mood": "warm and vibrant"
}
```

### 🎯 Example Prompts

#### Brand Design
```
a modern tech company logo using #667eea and #764ba2 gradient, minimalist style
```

#### Character Design
```
cyberpunk female character, pink neon hair, futuristic sunglasses, Tokyo street background
```

#### Product Photography
```
iPhone style product shot, white background, professional photography, studio lighting
```

### 🔧 API Documentation

#### Endpoints

- `GET /` - Web UI interface
- `POST /generate` - Image generation API

#### API Example

```javascript
const formData = new FormData();
formData.append('mode', 'text');
formData.append('prompt', 'a cyberpunk cat with sunglasses');

const response = await fetch('https://your-worker.workers.dev/generate', {
  method: 'POST',
  body: formData
});

const blob = await response.blob();
```

### 📊 Architecture

```
┌─────────────────┐
│   Web Browser   │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│ Cloudflare CDN  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Workers Runtime │
│   (Edge)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Workers AI     │
│  FLUX.2 [dev]   │
└─────────────────┘
```

### 💰 Pricing

Cloudflare Workers AI uses pay-per-use pricing:

- **Free Tier**: 10,000 Neurons per day
- **FLUX.2 [dev]**: Higher consumption (pricing expected to drop soon)

See [Cloudflare Workers AI Pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/)

### 🛠️ Configuration

Customize in `wrangler.toml`:

```toml
name = "flux2-image-generator"  # Change project name
compatibility_date = "2024-11-25"

[ai]
binding = "AI"

# Custom domain binding
# routes = [
#   { pattern = "flux2.yourdomain.com", zone_name = "yourdomain.com" }
# ]
```

### 🤝 Contributing

Contributions welcome! Please feel free to submit Issues and Pull Requests.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### 📝 Changelog

#### v1.0.0 (2025-12-08)
- 🎉 Initial release
- ✅ Text-to-image generation
- ✅ Multi-image reference support
- ✅ JSON fine control
- ✅ Responsive web UI

### 📚 References

- [Cloudflare Workers AI Documentation](https://developers.cloudflare.com/workers-ai/)
- [FLUX.2 [dev] Model Page](https://developers.cloudflare.com/workers-ai/models/flux-2-dev/)
- [FLUX.2 Launch Announcement](https://developers.cloudflare.com/changelog/2025-11-25-flux-2-dev-workers-ai/)
- [Black Forest Labs](https://blackforestlabs.ai/)

### 📄 License

[MIT License](LICENSE)

### 🙏 Acknowledgments

- Cloudflare Workers AI Team
- Black Forest Labs (FLUX.2 model developers)
- All contributors

---

<a name="chinese"></a>
## 🇨🇳 中文

### 项目简介

基于 Cloudflare Workers AI 的 FLUX.2 [dev] 图像生成工具。支持文本生图、多图参考、JSON 精细控制等高级功能。

### ✨ 功能特性

- 🎯 **文本生成图像** - 支持中文、英文等多语言提示词
- 🖼️ **多图参考生成** - 最多支持 4 张 512x512 参考图像
- ⚙️ **JSON 精细控制** - 通过 JSON 结构化控制生成参数
- 🎨 **颜色精确指定** - 支持十六进制颜色代码（如 `#F48120`）
- 🌍 **多语言支持** - 支持拉丁语系和非拉丁语系语言
- 🚀 **高质量输出** - 生成高达 4MP 的高保真图像
- 📱 **响应式界面** - 适配桌面和移动设备

### 🚀 快速开始

#### 前置要求

- Node.js 16+
- Cloudflare 账号（免费版即可）
- Wrangler CLI

#### 安装部署

```bash
# 1. 克隆仓库
git clone https://github.com/kinai9661/flux2-image-generator.git
cd flux2-image-generator

# 2. 安装依赖
npm install

# 3. 登录 Cloudflare
npx wrangler login

# 4. 部署到 Workers
npx wrangler deploy

# 5. 本地开发（可选）
npx wrangler dev
```

部署成功后，你会获得一个 `*.workers.dev` 域名，直接访问即可使用。

### 📖 使用指南

#### 1️⃣ 文本生图模式

最简单的使用方式，直接输入提示词：

```
一只穿着赛博朋克风格衣服的猫，戴着太阳镜，霓虹灯背景 #F48120
```

**支持的特性**：
- 多语言提示（中文、英文、日文等）
- 十六进制颜色：`#F48120`（Cloudflare 橙色）
- 生成数字资产：落地页、漫画、信息图表

#### 2️⃣ 多图参考模式

上传 1-4 张参考图片，然后输入提示词：

```
take the subject of image 1 and style it like image 0
```

或使用自然语言：

```
将狗放在女人旁边
```

**应用场景**：
- 风格迁移
- 角色添加
- 图像迭代优化

#### 3️⃣ JSON 提示模式

通过 JSON 结构精细控制生成参数：

```json
{
  "scene": "繁华的城市街道",
  "subject": "一位穿着时尚的女性",
  "style": "电影感",
  "lighting": "黄金时段",
  "color_scheme": "#F48120",
  "mood": "温暖而充满活力"
}
```

### 🎯 实际案例

#### 案例 1：品牌设计
```
一个现代科技公司的 logo，使用 #667eea 和 #764ba2 渐变色，简约风格
```

#### 案例 2：角色设计
```
赛博朋克风格的女性角色，粉色霓虹灯发型，未来感太阳镜，东京街头背景
```

#### 案例 3：产品图
```
iPhone 风格的产品展示图，白色背景，专业摄影，工作室光照
```

### 🔧 API 文档

#### 端点

- `GET /` - Web UI 界面
- `POST /generate` - 图像生成 API

#### API 请求示例

```javascript
const formData = new FormData();
formData.append('mode', 'text');
formData.append('prompt', 'a cyberpunk cat with sunglasses');

const response = await fetch('https://your-worker.workers.dev/generate', {
  method: 'POST',
  body: formData
});

const blob = await response.blob();
// 处理返回的图像
```

### 📊 技术架构

```
┌─────────────────┐
│   Web Browser   │
│    网页浏览器    │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│ Cloudflare CDN  │
│  内容分发网络    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Workers Runtime │
│   边缘计算环境   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Workers AI     │
│  FLUX.2 [dev]   │
└─────────────────┘
```

### 💰 定价说明

Cloudflare Workers AI 采用按使用量计费：

- **免费额度**：每天 10,000 Neurons
- **FLUX.2 [dev]**：消耗较高（官方预计近期降价）

详见 [Cloudflare Workers AI 定价](https://developers.cloudflare.com/workers-ai/platform/pricing/)

### 🛠️ 配置选项

在 `wrangler.toml` 中可以自定义：

```toml
name = "flux2-image-generator"  # 修改项目名称
compatibility_date = "2024-11-25"

[ai]
binding = "AI"

# 绑定自定义域名
# routes = [
#   { pattern = "flux2.yourdomain.com", zone_name = "yourdomain.com" }
# ]
```

### 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支（`git checkout -b feature/AmazingFeature`）
3. 提交更改（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 开启 Pull Request

### 📝 更新日志

#### v1.0.0 (2025-12-08)
- 🎉 初始版本发布
- ✅ 支持文本生图
- ✅ 支持多图参考
- ✅ 支持 JSON 精细控制
- ✅ 响应式 Web UI

### 📚 参考资料

- [Cloudflare Workers AI 官方文档](https://developers.cloudflare.com/workers-ai/)
- [FLUX.2 [dev] 模型页面](https://developers.cloudflare.com/workers-ai/models/flux-2-dev/)
- [FLUX.2 发布公告](https://developers.cloudflare.com/changelog/2025-11-25-flux-2-dev-workers-ai/)
- [Black Forest Labs 官网](https://blackforestlabs.ai/)

### 📄 许可证

[MIT License](LICENSE)

### 🙏 鸣谢

- Cloudflare Workers AI 团队
- Black Forest Labs（FLUX.2 模型开发者）
- 所有贡献者

---

<div align="center">

⭐ **如果这个项目对你有帮助，欢迎 Star 支持！**

**If this project helps you, please give it a star!**

🐛 [Report Bug](https://github.com/kinai9661/flux2-image-generator/issues) • 💡 [Request Feature](https://github.com/kinai9661/flux2-image-generator/issues)

</div>
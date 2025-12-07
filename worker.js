export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === 'GET') {
      return new Response(HTML_CONTENT, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    if (request.method === 'POST' && url.pathname === '/generate') {
      try {
        const formData = await request.formData();
        const prompt = formData.get('prompt');
        const mode = formData.get('mode') || 'text';
        
        // 构建 Workers AI 的 FormData
        const aiForm = new FormData();
        
        // 添加提示词
        const finalPrompt = mode === 'json' ? formData.get('json_prompt') : prompt;
        aiForm.append('prompt', finalPrompt);

        // 添加高级参数
        const steps = formData.get('steps') || '4';
        const width = formData.get('width') || '1024';
        const height = formData.get('height') || '1024';
        const guidance = formData.get('guidance') || '3.5';
        
        aiForm.append('steps', steps);
        aiForm.append('width', width);
        aiForm.append('height', height);
        aiForm.append('guidance', guidance);

        // 如果是多图模式，添加参考图像
        if (mode === 'multi-image') {
          for (let i = 0; i < 4; i++) {
            const image = formData.get(`input_image_${i}`);
            if (image && image.size > 0) {
              aiForm.append(`input_image_${i}`, image);
            }
          }
        }

        // 使用官方推荐的方法：通过 Request 对象转换 FormData
        const formRequest = new Request('http://dummy', {
          method: 'POST',
          body: aiForm
        });
        const formStream = formRequest.body;
        const formContentType = formRequest.headers.get('content-type') || 'multipart/form-data';

        // 调用 Workers AI
        const response = await env.AI.run(
          '@cf/black-forest-labs/flux-2-dev',
          {
            multipart: {
              body: formStream,
              contentType: formContentType
            }
          }
        );

        // 返回生成的图像
        return new Response(response, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'image/png',
          }
        });

      } catch (error) {
        console.error('Generation error:', error);
        return new Response(JSON.stringify({ 
          error: error.message,
          stack: error.stack,
          details: 'Failed to generate image'
        }), {
          status: 500,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          }
        });
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FLUX.2 [dev] 图像生成器</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #F48120 0%, #FF6B6B 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    .header p {
      opacity: 0.9;
      font-size: 1.1em;
    }
    .content {
      padding: 30px;
    }
    .mode-selector {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .mode-btn {
      flex: 1;
      min-width: 150px;
      padding: 15px 20px;
      border: 2px solid #ddd;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1em;
      transition: all 0.3s;
    }
    .mode-btn:hover {
      border-color: #F48120;
      transform: translateY(-2px);
    }
    .mode-btn.active {
      background: #F48120;
      color: white;
      border-color: #F48120;
    }
    .form-section {
      display: none;
      margin-bottom: 20px;
    }
    .form-section.active {
      display: block;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }
    input[type="text"], input[type="number"], input[type="range"], textarea, select {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1em;
      transition: border-color 0.3s;
    }
    input[type="text"]:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #F48120;
    }
    textarea {
      min-height: 120px;
      resize: vertical;
      font-family: monospace;
    }
    .advanced-settings {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .advanced-toggle {
      background: none;
      border: none;
      color: #F48120;
      cursor: pointer;
      font-size: 1em;
      font-weight: 600;
      padding: 10px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .advanced-toggle:hover {
      text-decoration: underline;
    }
    .advanced-content {
      display: none;
      margin-top: 15px;
    }
    .advanced-content.active {
      display: block;
    }
    .param-group {
      margin-bottom: 20px;
    }
    .param-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 15px;
    }
    .slider-container {
      margin-top: 10px;
    }
    .slider-value {
      display: inline-block;
      min-width: 50px;
      text-align: right;
      font-weight: 600;
      color: #F48120;
    }
    input[type="range"] {
      width: 100%;
      margin-top: 8px;
    }
    .file-upload {
      margin-bottom: 15px;
    }
    .file-upload input {
      display: none;
    }
    .file-label {
      display: inline-block;
      padding: 10px 20px;
      background: #f0f0f0;
      border: 2px dashed #ddd;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .file-label:hover {
      border-color: #F48120;
      background: #fff5f0;
    }
    .preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 10px;
      margin-top: 10px;
    }
    .preview-item {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid #ddd;
    }
    .preview-item img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    .generate-btn {
      width: 100%;
      padding: 18px;
      background: linear-gradient(135deg, #F48120 0%, #FF6B6B 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.2em;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.3s;
      margin-top: 20px;
    }
    .generate-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(244, 129, 32, 0.3);
    }
    .generate-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }
    .result-section {
      margin-top: 30px;
      display: none;
    }
    .result-section.active {
      display: block;
    }
    .result-image {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .loading {
      text-align: center;
      padding: 40px;
      display: none;
    }
    .loading.active {
      display: block;
    }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #F48120;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .examples {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
      font-size: 0.9em;
    }
    .examples h4 {
      margin-bottom: 10px;
      color: #F48120;
    }
    .examples code {
      background: #fff;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }
    .error-message {
      background: #fee;
      border: 2px solid #fcc;
      border-radius: 8px;
      padding: 15px;
      margin-top: 20px;
      color: #c00;
      display: none;
    }
    .error-message.active {
      display: block;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎨 FLUX.2 [dev] 图像生成器</h1>
      <p>强大的 AI 图像生成 - 支持多图参考、JSON 提示、多语言</p>
    </div>
    
    <div class="content">
      <div class="mode-selector">
        <button class="mode-btn active" data-mode="text">📝 文本生图</button>
        <button class="mode-btn" data-mode="multi-image">🖼️ 多图参考</button>
        <button class="mode-btn" data-mode="json">⚙️ JSON 提示</button>
      </div>

      <form id="generateForm">
        <div class="form-section active" data-section="text">
          <label>提示词（支持中文、英文等多语言）</label>
          <textarea name="prompt" placeholder="例如：a sunset at the alps with a dog, vibrant colors, dramatic sky"></textarea>
          <div class="examples">
            <h4>💡 安全提示词示例</h4>
            <p>• <code>a sunset at the alps with a dog, vibrant colors</code></p>
            <p>• <code>一只橙色的猫咪戴着墨镜，赛博朋克风格</code></p>
            <p>• <code>majestic eagle soaring over mountains, blue sky</code></p>
            <p>• <code>热带海滩日落，棕榈树剪影，橙色天空</code></p>
            <p>• <code>abstract colorful geometric shapes #F48120</code></p>
            <p>⚠️ <strong>注意</strong>：避免使用人物相关描述（人、男孩、女孩等）</p>
          </div>
        </div>

        <div class="form-section" data-section="multi-image">
          <label>提示词</label>
          <input type="text" name="multi_prompt" placeholder="take the style of image 0 and apply to image 1">
          
          <div style="margin-top: 20px;">
            <label>上传参考图片（最多 4 张，每张 ≤ 512x512）</label>
            <div class="file-upload">
              <input type="file" id="image0" accept="image/*" data-index="0">
              <label for="image0" class="file-label">📎 选择图片 0</label>
            </div>
            <div class="file-upload">
              <input type="file" id="image1" accept="image/*" data-index="1">
              <label for="image1" class="file-label">📎 选择图片 1</label>
            </div>
            <div class="file-upload">
              <input type="file" id="image2" accept="image/*" data-index="2">
              <label for="image2" class="file-label">📎 选择图片 2</label>
            </div>
            <div class="file-upload">
              <input type="file" id="image3" accept="image/*" data-index="3">
              <label for="image3" class="file-label">📎 选择图片 3</label>
            </div>
            <div class="preview-grid" id="previewGrid"></div>
          </div>
          
          <div class="examples">
            <h4>💡 提示</h4>
            <p>• 可引用图片索引：<code>take the subject of image 1 and style it like image 0</code></p>
            <p>• 自然语言：<code>combine the elements from all images</code></p>
            <p>• 风格迁移、角色添加、图像迭代</p>
          </div>
        </div>

        <div class="form-section" data-section="json">
          <label>JSON 提示（精细控制）</label>
          <textarea name="json_prompt" placeholder='{"scene": "mountain landscape", "time": "sunset", "style": "cinematic", "colors": "warm orange and purple"}'></textarea>
          <div class="examples">
            <h4>💡 JSON 架构示例</h4>
            <p><code>scene</code>: 场景描述</p>
            <p><code>subject</code>: 主体描述</p>
            <p><code>style</code>: 风格类型</p>
            <p><code>lighting</code>: 光照条件</p>
            <p><code>colors</code>: 颜色方案</p>
          </div>
        </div>

        <div class="advanced-settings">
          <button type="button" class="advanced-toggle" id="advancedToggle">
            <span>▶</span> 高级设置
          </button>
          <div class="advanced-content" id="advancedContent">
            <div class="param-row">
              <div class="param-group">
                <label>图像宽度</label>
                <select name="width" id="widthSelect">
                  <option value="512">512px</option>
                  <option value="768">768px</option>
                  <option value="1024" selected>1024px</option>
                  <option value="1280">1280px</option>
                  <option value="1536">1536px</option>
                </select>
              </div>
              <div class="param-group">
                <label>图像高度</label>
                <select name="height" id="heightSelect">
                  <option value="512">512px</option>
                  <option value="768">768px</option>
                  <option value="1024" selected>1024px</option>
                  <option value="1280">1280px</option>
                  <option value="1536">1536px</option>
                </select>
              </div>
            </div>
            
            <div class="param-group">
              <label>生成步数 (Steps): <span class="slider-value" id="stepsValue">4</span></label>
              <input type="range" name="steps" id="stepsSlider" min="1" max="50" value="4" step="1">
              <small style="color: #666; display: block; margin-top: 5px;">更多步数 = 更高质量，但生成速度更慢（推荐 4-25）</small>
            </div>
            
            <div class="param-group">
              <label>引导强度 (Guidance): <span class="slider-value" id="guidanceValue">3.5</span></label>
              <input type="range" name="guidance" id="guidanceSlider" min="1" max="20" value="3.5" step="0.1">
              <small style="color: #666; display: block; margin-top: 5px;">控制图像与提示词的符合度（推荐 2.5-5）</small>
            </div>
          </div>
        </div>

        <button type="submit" class="generate-btn">🚀 生成图像</button>
      </form>

      <div class="error-message" id="errorMessage"></div>

      <div class="loading">
        <div class="spinner"></div>
        <p>正在生成图像，请稍候...<br><small>（首次生成可能需要 30-60 秒）</small></p>
      </div>

      <div class="result-section">
        <h2>生成结果</h2>
        <img class="result-image" id="resultImage" alt="Generated Image">
      </div>
    </div>
  </div>

  <script>
    const modeBtns = document.querySelectorAll('.mode-btn');
    const sections = document.querySelectorAll('.form-section');
    const form = document.getElementById('generateForm');
    const loading = document.querySelector('.loading');
    const resultSection = document.querySelector('.result-section');
    const resultImage = document.getElementById('resultImage');
    const previewGrid = document.getElementById('previewGrid');
    const errorMessage = document.getElementById('errorMessage');
    const advancedToggle = document.getElementById('advancedToggle');
    const advancedContent = document.getElementById('advancedContent');
    const stepsSlider = document.getElementById('stepsSlider');
    const stepsValue = document.getElementById('stepsValue');
    const guidanceSlider = document.getElementById('guidanceSlider');
    const guidanceValue = document.getElementById('guidanceValue');
    
    let currentMode = 'text';
    let uploadedImages = {};

    advancedToggle.addEventListener('click', () => {
      advancedContent.classList.toggle('active');
      const arrow = advancedToggle.querySelector('span');
      arrow.textContent = advancedContent.classList.contains('active') ? '▼' : '▶';
    });

    stepsSlider.addEventListener('input', (e) => {
      stepsValue.textContent = e.target.value;
    });

    guidanceSlider.addEventListener('input', (e) => {
      guidanceValue.textContent = parseFloat(e.target.value).toFixed(1);
    });

    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const mode = btn.dataset.mode;
        currentMode = mode;
        
        sections.forEach(section => {
          section.classList.remove('active');
          if (section.dataset.section === mode) {
            section.classList.add('active');
          }
        });
      });
    });

    document.querySelectorAll('.file-upload input[type="file"]').forEach(input => {
      input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const index = e.target.dataset.index;
        
        if (file) {
          uploadedImages[index] = file;
          
          const reader = new FileReader();
          reader.onload = (e) => {
            updatePreview();
          };
          reader.readAsDataURL(file);
        }
      });
    });

    function updatePreview() {
      previewGrid.innerHTML = '';
      Object.keys(uploadedImages).forEach(index => {
        const file = uploadedImages[index];
        const reader = new FileReader();
        reader.onload = (e) => {
          const div = document.createElement('div');
          div.className = 'preview-item';
          
          const img = document.createElement('img');
          img.src = e.target.result;
          img.alt = 'Image ' + index;
          
          const label = document.createElement('div');
          label.style.cssText = 'text-align:center;padding:5px;background:#f0f0f0;font-size:0.8em;';
          label.textContent = '图片 ' + index;
          
          div.appendChild(img);
          div.appendChild(label);
          previewGrid.appendChild(div);
        };
        reader.readAsDataURL(file);
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      errorMessage.classList.remove('active');
      const formData = new FormData();
      formData.append('mode', currentMode);
      formData.append('steps', stepsSlider.value);
      formData.append('width', form.querySelector('[name="width"]').value);
      formData.append('height', form.querySelector('[name="height"]').value);
      formData.append('guidance', guidanceSlider.value);
      
      if (currentMode === 'text') {
        const prompt = form.querySelector('[name="prompt"]').value;
        if (!prompt) {
          errorMessage.textContent = '请输入提示词';
          errorMessage.classList.add('active');
          return;
        }
        formData.append('prompt', prompt);
      } else if (currentMode === 'multi-image') {
        const prompt = form.querySelector('[name="multi_prompt"]').value;
        if (!prompt) {
          errorMessage.textContent = '请输入提示词';
          errorMessage.classList.add('active');
          return;
        }
        if (Object.keys(uploadedImages).length === 0) {
          errorMessage.textContent = '请至少上传一张参考图片';
          errorMessage.classList.add('active');
          return;
        }
        formData.append('prompt', prompt);
        
        Object.keys(uploadedImages).forEach(index => {
          formData.append('input_image_' + index, uploadedImages[index]);
        });
      } else if (currentMode === 'json') {
        const jsonPrompt = form.querySelector('[name="json_prompt"]').value;
        if (!jsonPrompt) {
          errorMessage.textContent = '请输入 JSON 提示';
          errorMessage.classList.add('active');
          return;
        }
        try {
          JSON.parse(jsonPrompt);
          formData.append('json_prompt', jsonPrompt);
        } catch (e) {
          errorMessage.textContent = 'JSON 格式错误，请检查';
          errorMessage.classList.add('active');
          return;
        }
      }
      
      loading.classList.add('active');
      resultSection.classList.remove('active');
      
      try {
        const response = await fetch('/generate', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || '生成失败');
        }
        
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        
        resultImage.src = imageUrl;
        resultSection.classList.add('active');
      } catch (error) {
        console.error(error);
        errorMessage.textContent = '生成失败: ' + error.message;
        errorMessage.classList.add('active');
      } finally {
        loading.classList.remove('active');
      }
    });
  </script>
</body>
</html>
`;

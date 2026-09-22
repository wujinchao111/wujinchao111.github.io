# 吴金超 · 个人项目作品集

纯 HTML + CSS + JavaScript，无依赖、无构建步骤；双击 `index.html` 即可预览。支持电脑和手机、截图放大、左右按键切换、Esc 关闭、手机左右滑动。

## 文件结构

```text
index.html        页面内容、四个项目、截图路径
style.css         配色、排版、响应式样式
script.js         联系方式配置、截图查看交互
images/
  placeholder.svg 缺少截图时显示的占位图
resume.pdf        请自行添加真实简历
```

## 发布前补充真实内容

1. 在 `index.html` 中修改个人介绍和四个项目的简介。当前简介仅根据项目名称概括，需按真实经历核对。
2. 将四处“待补充本人负责的模块、实现方法与验证结果。”替换为本人实际工作。可按“负责模块 → 实现方法 → 可验证结果”组织；不要使用未经验证的数据。
3. 项目一已填写给定技术栈；项目二至四未提供技术栈，请替换对应 `<ul class="tags">` 中的“技术栈待补充”。
4. 在 `script.js` 顶部填写 `PROFILE` 的 `github`、`email`、`resume`。未配置时按钮保持禁用，避免跳到错误页面。填写后自动启用。

```javascript
const PROFILE = {
  github: "https://github.com/your-username",
  email: "your-name@example.com",
  resume: "./resume.pdf"
};
```

把真实 PDF 简历放到与 `index.html` 相同的目录，并命名为 `resume.pdf`。移动端浏览器可能优先预览 PDF，可从预览菜单保存。请勿仅填写路径而不上传文件。

## 添加截图

每个项目预留三张图片，全部从 `images/` 读取。将图片按下列名称放入该文件夹即可自动显示。当前没有真实截图，页面会显示明确标注“截图待补充”的占位图。

| 项目 | 图片文件名（位于 images 文件夹） |
| --- | --- |
| 化工厂 AI 安全预警 | `chemical-safety-1.jpg`、`chemical-safety-2.jpg`、`chemical-safety-3.jpg` |
| 移动安全绳身份绑定 | `safety-rope-1.jpg`、`safety-rope-2.jpg`、`safety-rope-3.jpg` |
| 吊装作业入侵检测 | `lifting-intrusion-1.jpg`、`lifting-intrusion-2.jpg`、`lifting-intrusion-3.jpg` |
| 遮挡行人重识别 | `occluded-reid-1.jpg`、`occluded-reid-2.jpg`、`occluded-reid-3.jpg` |

可使用 PNG、WebP 等格式，但需要同时修改对应按钮的 `data-full` 和图片的 `src`。修改 `data-caption`、`alt`、`aria-label` 和 `.shot-caption` 中的文字以匹配实际图片。缩略图会裁切显示，弹窗保留完整图片。建议截图宽度不少于 1200 像素并适当压缩。

增加图片：复制同一 `.gallery` 内的一个 `<button class="shot">...</button>`，修改路径与说明；图片计数会自动更新。没有第三张截图时可以删除对应按钮。

## 部署到 GitHub Pages

1. 将 `index.html`、`style.css`、`script.js`、整个 `images` 文件夹和真实 `resume.pdf` 上传到 GitHub 仓库根目录。不要把整个 `outputs` 目录作为根目录上传。
2. 在仓库的 **Settings → Pages** 中选择从分支部署（Deploy from a branch）。
3. 选择保存上述文件的分支（例如 `main`），目录选择 **/(root)**，保存。
4. 等待 GitHub 完成部署，通过 Pages 页面提供的网址访问。

所有站内资源都使用相对路径，兼容 `https://用户名.github.io/仓库名/` 形式的项目站点。文件名区分大小写。无需 npm、后端服务或第三方 CDN。

如果仓库已有自己的发布流程，请沿用已有配置；本交付仅包含可部署源文件，尚未替你发布到 GitHub。

# Beyond the Map Workshop 网站

这是一个**示例**计算机学术 Workshop 网站，采用莫兰迪配色 `#504657`、`#7D726E`、`#D5C3DE`、`#FAEEEE` 与 JetBrains Mono 字体。当前会议、人物、日期、地点和征稿信息都是占位内容，并不代表真实会议公告。

## 最简单的改内容方法

只编辑 [`content.md`](./content.md)。它包含网站的所有主要文字、日期、讲者、组织者和日程。

- `# Beyond the Map`：网站标题；紧接的两行分别是副标题和日期地点。
- `## About` 等二级标题：对应网站各板块。建议保留这些英文标题，页面导航依靠它们识别板块。
- `| ... |` 表格：直接改每行两条竖线之间的内容。例如日程、讲者、重要日期都在表格里。
- `**文字**`：表示加粗。空行分开段落。
- 可以增删表格中的内容行，但保留表头和第二行的 `---` 分隔线。

正式公开前，请至少修改页面顶部的示例提示、会议名称和归属、所有重要日期、投稿入口、嘉宾与组织者、会场、联系邮箱。**不要只删掉“示例”字样却保留虚构人物或未确认的信息。**

## 本地预览

电脑安装 Node.js（建议 20 或更新版本）后，在本文件夹运行：

```bash
npm run build
npm run preview
```

打开命令行显示的本地网址。改完 `content.md` 后重新执行 `npm run build`，再刷新页面。项目没有第三方构建依赖；网页字体需要网络连接，离线时会使用等宽备用字体。

## 部署到 GitHub Pages

1. 在 GitHub 新建一个仓库，将本文件夹的所有文件上传到仓库根目录（包括 `.github/workflows/pages.yml`）。
2. 打开仓库 **Settings → Pages**，在 **Build and deployment** 中将 **Source** 设为 **GitHub Actions**。
3. 推送到 `main` 分支后，等待 **Actions** 中的 “Deploy Workshop site” 完成。页面会显示网址，通常是 `https://用户名.github.io/仓库名/`。
4. 以后直接在 GitHub 网页上打开 `content.md`，点铅笔修改并提交；部署会自动重新运行。

如果默认分支不是 `main`，请相应修改 `.github/workflows/pages.yml` 的分支名称。发布前先将占位内容替换并核实。

## 文件说明

- `content.md`：网站内容，日常只需编辑此文件。
- `style.css`：颜色、排版、响应式布局和动画。
- `script.js`：手机菜单、滚动显示和导航高亮。
- `index.template.html`、`build.mjs`：把 Markdown 组装成网页。
- `dist/`：运行构建后生成的网站文件。GitHub Actions 会自动生成并部署。

## 栏目参考

信息架构参考了 [NeurIPS 2025 workshop 征集说明](https://neurips.cc/Conferences/2025/CallForWorkshops)、[NeurIPS 2025 workshop 指南](https://neurips.cc/Conferences/2025/CallForWorkshopsGuidance) 和 [ICML 2025 workshop 征集说明](https://icml.cc/Conferences/2025/CallForWorkshops)。它们强调清楚公布研究主题、投稿与评审安排、日期、组织者和现场活动。本项目的具体会议内容全部为示例，没有借用这些会议的官方身份。

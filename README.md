# APEC Teachers' Day Special — 使用说明

静态多页特刊站点，视觉语言致敬 Nature，内容基于马亮 / APEC Lab 公开信息与已发表论文链接。

## 本地预览

请打开项目根目录的 **`index.html`**（网站首页）。线上入口：

https://dongshg3.github.io/apec-teachers-day-2026/

或在项目目录运行：

```bash
npx --yes serve .
```

默认即打开首页。

## 填写祝福语

编辑 `js/blessings-data.js`：将某条的 `status` 改为 `"ready"`，填写 `name`、`role`、`message`。保存后刷新 `pages/correspondence.html`。

## 替换导师照片

将照片保存为 `assets/mentor.jpg`。首页 Hero 右下角提示可忽略；`pages/profile.html` 会自动加载该文件。

## 页面地图

| 文件 | 内容 |
|------|------|
| `index.html` | 特刊首页 |
| `pages/contents.html` | 目录 |
| `pages/editorial.html` | 社论 |
| `pages/profile.html` | 马亮简介 |
| `pages/lab.html` | APEC 课题组 |
| `pages/research.html` | 论文摘要表 |
| `pages/article-*.html` | Nat Commun 专题页 |
| `pages/news.html` | News Feature |
| `pages/correspondence.html` | 祝福 Correspondence |
| `pages/reading.html` | Nature 延伸阅读 |

本站非 Springer Nature 官方出版物；文中论文版权归原出版方。

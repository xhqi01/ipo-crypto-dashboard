# IPO · Crypto Tracker

IPO 和新虚拟货币 Dashboard，点击任意条目自动触发 AI 搜索最新新闻。

**技术栈**：React + Vite · IBM Plex Mono · CoinGecko API · Anthropic API (web search)

---

## 🚀 部署到 GitHub Pages（3步）

### 1. Fork / 上传这个 repo

### 2. 改 vite.config.js 里的 base 路径
```js
base: '/你的repo名称/',
```

### 3. 开启 GitHub Pages
Settings → Pages → Source → **GitHub Actions**

推送到 main 分支后自动 build 并部署，大约 1 分钟。

访问地址：`https://你的用户名.github.io/你的repo名称/`

---

## 💻 本地运行

```bash
npm install
npm run dev
```

---

## 📝 替换真实 IPO 数据

`src/App.jsx` 顶部的 `MOCK_IPOS` 数组可以替换成真实数据。
推荐做法：用配套的 `ipo-crypto-notifier` Python 脚本每天抓取，
输出 `ipos.json` 到这个 repo 的 `public/` 目录，然后在 App.jsx 里
改成 `fetch('/ipo-crypto-dashboard/ipos.json')` 即可。

---

## 文件结构

```
ipo-crypto-dashboard/
├── src/
│   ├── App.jsx          # 主组件（数据 + UI + AI 新闻）
│   └── main.jsx         # 入口
├── .github/
│   └── workflows/
│       └── deploy.yml   # 自动部署到 GitHub Pages
├── index.html
├── vite.config.js       # ⚠️ 记得改 base 路径
└── package.json
```

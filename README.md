# IPO · Crypto Tracker

Track upcoming IPOs and new crypto listings — click any item for an AI-powered news digest.

**Stack**: React · Vite · IBM Plex Mono · CoinGecko API · Anthropic API (web search)

---

## 🚀 Deploy to GitHub Pages

**1. Fork or upload this repo**

**2. Edit `vite.config.js` — set your repo name as the base path**
```js
base: '/your-repo-name/',
```

**3. Enable GitHub Pages**
Settings → Pages → Source → **GitHub Actions**

Push to `main` and it builds automatically. Live in ~1 minute at:
`https://your-username.github.io/your-repo-name/`

---

## 💻 Run Locally

```bash
npm install
npm run dev
```

---

## 📝 Use Real IPO Data

The `MOCK_IPOS` array in `src/App.jsx` can be replaced with live data.
Recommended: pair this with the `ipo-crypto-notifier` Python script — output `ipos.json` into the `public/` folder, then fetch it in `App.jsx`:
```js
fetch('/your-repo-name/ipos.json')
```

---

## 📁 Structure

```
ipo-crypto-dashboard/
├── src/
│   ├── App.jsx          # Main component (data + UI + AI news)
│   └── main.jsx         # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml   # Auto-deploy to GitHub Pages
├── index.html
├── vite.config.js       # ⚠️ Update base path before deploying
└── package.json
```

---
---

# IPO · 仮想通貨トラッカー

IPOと新規仮想通貨の上場情報をまとめたダッシュボード。各アイテムをクリックすると、AIが最新ニュースを自動検索して表示します。

**技術スタック**: React · Vite · IBM Plex Mono · CoinGecko API · Anthropic API（Web検索）

---

## 🚀 GitHub Pagesへのデプロイ

**1. このリポジトリをForkまたはアップロード**

**2. `vite.config.js` を編集 — base パスをリポジトリ名に変更**
```js
base: '/your-repo-name/',
```

**3. GitHub Pagesを有効化**
Settings → Pages → Source → **GitHub Actions**

`main` ブランチにプッシュすると自動でビルドされ、約1分で公開されます：
`https://your-username.github.io/your-repo-name/`

---

## 💻 ローカルで実行

```bash
npm install
npm run dev
```

---

## 📝 リアルタイムIPOデータの使い方

`src/App.jsx` 内の `MOCK_IPOS` 配列を実データに差し替えることができます。
推奨：`ipo-crypto-notifier` Pythonスクリプトと連携し、`ipos.json` を `public/` フォルダに出力。
その後、`App.jsx` で以下のように取得します：
```js
fetch('/your-repo-name/ipos.json')
```

---

## 📁 ファイル構成

```
ipo-crypto-dashboard/
├── src/
│   ├── App.jsx          # メインコンポーネント（データ・UI・AIニュース）
│   └── main.jsx         # エントリーポイント
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Pages 自動デプロイ
├── index.html
├── vite.config.js       # ⚠️ デプロイ前に base パスを変更すること
└── package.json
```

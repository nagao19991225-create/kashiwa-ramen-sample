# 麺処 かしわ庵 — 店舗紹介サンプルサイト

飲食店向け店舗紹介ページの制作サンプルです。  
架空のラーメン店「麺処 かしわ庵」を題材に、実際の店舗サイトに転用できるHTML/CSS/JSで構成されています。

---

## ファイル構成

```
kashiwa-an/
├── index.html       # メインページ
├── style.css        # スタイルシート（スマホファースト）
├── script.js        # インタラクション・営業時間表示など
├── README.md        # このファイル
└── images/          # 画像フォルダ（なくても動作します）
    ├── hero-ramen.jpg
    ├── menu-ramen.jpg
    ├── shop-exterior.jpg
    └── interior.jpg
```

> 📌 `images/` フォルダがなくても、CSSのグラデーション背景と絵文字でプレースホルダー表示します。

---

## ローカル確認方法

### 方法①：ファイルをそのまま開く
`index.html` をブラウザにドラッグ＆ドロップするだけで確認できます。  
（画像・フォントの一部はネット接続が必要です）

### 方法②：ローカルサーバーで確認（推奨）
```bash
# Python 3 がある場合
cd kashiwa-an
python3 -m http.server 8080
# → http://localhost:8080 で確認
```

```bash
# Node.js がある場合
npx serve .
```

---

## Cloudflare Pages への公開手順

### 1. GitHubリポジトリを用意する

```bash
# 新しいリポジトリを作成（GitHubのWebサイトで作成後）
git init
git add .
git commit -m "Initial commit: かしわ庵サンプルサイト"
git remote add origin https://github.com/あなたのユーザー名/kashiwa-an.git
git push -u origin main
```

### 2. Cloudflare Pages に接続する

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. 左メニューから **Workers & Pages** → **Pages** を選択
3. **「Connect to Git」** をクリック
4. GitHubアカウントを認証し、作成したリポジトリを選択
5. ビルド設定（以下を入力）：

| 項目 | 設定値 |
|------|--------|
| プロジェクト名 | kashiwa-an（任意） |
| プロダクションブランチ | `main` |
| フレームワークプリセット | **None**（静的サイトのため） |
| ビルドコマンド | （空欄でOK） |
| ビルド出力ディレクトリ | `/`（ルートを指定） |

6. **「Save and Deploy」** をクリック

### 3. 公開完了

数十秒でデプロイが完了し、以下のようなURLで公開されます：

```
https://kashiwa-an.pages.dev
```

### 4. カスタムドメインを設定する（任意）

1. Cloudflare Pages のプロジェクト画面 → **「Custom domains」**
2. **「Set up a custom domain」** をクリック
3. 使用するドメイン（例：`kashiwa-an.com`）を入力
4. DNSレコードを確認・追加して完了

---

## 直接アップロードで公開する（Gitなし）

GitHubを使わずに公開することもできます：

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Pages**
2. **「Upload assets」** をクリック
3. プロジェクト名を入力
4. `index.html`・`style.css`・`script.js`・`images/` をすべてドラッグ＆ドロップ
5. **「Deploy site」** をクリック

---

## カスタマイズのポイント

### 店舗情報の変更
`index.html` 内の以下の箇所を編集してください：

- **店名**：`麺処 かしわ庵` → お客様の店舗名
- **住所**：`千葉県柏市〇〇1-2-3`
- **営業時間**：ランチ・ディナーの時間
- **定休日**：`火曜日`
- **電話番号**：`tel:00000000000` の部分

### 営業時間の自動表示
`script.js` の `checkOpenStatus()` 関数内の時間を変更します：

```js
// ランチ：11:00〜15:00
const isLunch = timeNum >= 1100 && timeNum < 1500;
// ディナー：18:00〜21:00
const isDinner = timeNum >= 1800 && timeNum < 2100;
// 定休日（2=火曜日）
if (day === 2) { ... }
```

### カラーテーマの変更
`style.css` 冒頭の `:root {}` 変数を変更するだけで色が統一して変わります：

```css
:root {
  --color-accent: #8b4513;       /* メインアクセント（茶色） */
  --color-accent-light: #c47a3a; /* サブアクセント */
  --color-bg: #faf8f4;           /* ページ背景 */
  --color-bg-warm: #f5f0e8;      /* セクション背景 */
}
```

### 画像の差し替え
`images/` フォルダに以下のファイルを置いてください：

| ファイル名 | 用途 | 推奨サイズ |
|-----------|------|-----------|
| `hero-ramen.jpg` | ファーストビュー背景 | 1920×1080px |
| `menu-ramen.jpg` | メニュー・ギャラリー | 800×600px |
| `shop-exterior.jpg` | 店舗外観 | 800×600px |
| `interior.jpg` | 店内写真 | 800×600px |

---

## Googleマップの埋め込み

実際に公開する際は、`index.html` の `<!-- サンプル用マップエリア -->` 部分を以下に差し替えてください：

```html
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
  width="100%"
  height="360"
  style="border:0; border-radius:12px;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

Googleマップ埋め込みURLの取得方法：
1. [Google マップ](https://maps.google.com) で店舗を検索
2. 「共有」→「地図を埋め込む」→ iframeコードをコピー

---

## ライセンス・免責

このサンプルサイトは営業・提案用の制作見本です。  
掲載されている店舗名・住所・価格などはすべて架空のものです。  
実際の店舗サイト制作にあたっては、内容を実際の情報に差し替えてご使用ください。

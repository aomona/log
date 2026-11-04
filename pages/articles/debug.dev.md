---
title: Void Markdown サンプル
description: Voidが標準対応するMarkdownと拡張記法の表示確認用サンプル
date: 2026-11-04
location: Tokyo
tags: [markdown, debug]
---

# Void Markdown サンプル

Voidの標準Markdownと拡張記法をまとめた、開発時専用の表示確認用記事です。
[公式Markdownドキュメント](https://void.cloud/guide/pages-routing/markdown)と、このプロジェクトの `@void/md` に合わせています。

## 目次

`[[toc]]` で見出しへのリンクを自動生成できます。各見出しにもパーマリンクが付きます。

[[toc]]

## 見出し

見出しはレベル1〜6に対応しています。レベル1はこの記事のタイトルです。

### レベル3

本文の中の小さなまとまりです。

#### レベル4

さらに細かい項目です。

##### レベル5

補足的な項目です。

###### レベル6

最も小さい見出しです。

## 段落と文字装飾

通常の段落です。日本語とEnglish、数字123を混ぜたときの読みやすさを確認できます。

空行を入れると別の段落になります。**太字**、_斜体_、_**太字と斜体**_、~~取り消し線~~、`インラインコード` を使えます。

行末にバックスラッシュを付けると改行できます。\
ここは同じ段落内の改行です。

記号をそのまま表示する場合は、\*アスタリスク\* や \`バッククォート\` のようにエスケープできます。

## リンク

- [Voidの公式サイト](https://void.cloud "Voidの公式サイト")
- [参照形式のリンク][void-markdown]
- URLの自動リンク: https://void.cloud
- メールアドレス: <hello@example.com>
- [この記事へのMarkdownリンク](./debug.md)
- [属性を付けた見出しへのリンク](#attribute-example)

[void-markdown]: https://void.cloud/guide/pages-routing/markdown "Markdownの公式ドキュメント"

## 画像

画像には代替テキストとタイトルを付けられます。Voidが `loading="lazy"` を付与します。

![プロフィール画像のサンプル](/avatar.jpg "ローカルの画像ファイル")

## リスト

### 箇条書き

- 最初の項目
- **装飾を含む項目**
  - ネストした項目
  - もうひとつの項目
    - さらに深い項目
- 最後の項目

### 番号付きリスト

1. Markdownを書く
2. ローカルで確認する
   1. 記事を開く
   2. 表示を確認する
3. 記事を仕上げる

### チェックリスト

現在の `@void/md 1.5.0` は `- [x]` / `- [ ]` をチェックボックスに変換しないため、以下はHTMLで記述した表示例です。

<ul class="contains-task-list">
  <li class="task-list-item"><label><input type="checkbox" checked disabled> 基本のMarkdown</label></li>
  <li class="task-list-item"><label><input type="checkbox" checked disabled> Voidの拡張記法</label></li>
  <li class="task-list-item"><label><input type="checkbox" disabled> 自分の画面で表示を確認</label></li>
</ul>

## 引用

> これは通常の引用です。
>
> 複数の段落や **文字装飾** を含められます。
>
> > 引用の中に引用を入れることもできます。

## 区切り線

以下は水平線です。

---

水平線の後も通常の本文が続きます。

## 表

| 左寄せ               |          中央寄せ          | 右寄せ |
| :------------------- | :------------------------: | -----: |
| Markdown             |          **対応**          |    100 |
| インラインコード     |     `const value = 1`      |    200 |
| リンク               | [Void](https://void.cloud) |    300 |
| エスケープした区切り |           A \| B           |    400 |

## コードブロック

コードブロックには言語に応じたシンタックスハイライトとコピーボタンが付きます。配色はライト／ダークテーマに対応します。

### TypeScript

```ts
interface Article {
  title: string;
  tags: string[];
}

const article: Article = {
  title: "Void Markdown サンプル",
  tags: ["markdown", "debug"],
};

console.log(article.title);
```

### HTMLとCSS

```html
<article class="void-md">
  <h1>こんにちは、Void</h1>
  <p>Markdownから生成されるHTMLです。</p>
</article>
```

```css
.void-md {
  --vmd-link: #2563eb;
}
```

### プレーンテキスト

```text
言語を指定しない場合やプレーンテキストの表示例です。
<タグ> や **Markdown記法** も、そのまま表示します。
```

### 行の強調

`{1,3-5}` で1行目と3〜5行目を強調します。

```ts {1,3-5}
const first = "強調";
const second = "通常";
const third = "強調";
const fourth = "強調";
const fifth = "強調";
```

### 差分とインライン強調

```ts
const title = "以前のタイトル"; // [!code --]
const title = "新しいタイトル"; // [!code ++]
console.log(title); // [!code highlight]
```

### フォーカス

```ts
const before = "前の行";
const focused = "この行に注目"; // [!code focus]
const after = "後の行";
```

### エラーと警告

```ts
throw new Error("エラーの表示例"); // [!code error]
console.warn("警告の表示例"); // [!code warning]
```

### 行番号

```ts :line-numbers
const first = 1;
const second = 2;
const total = first + second;
```

開始番号を指定することもできます。

```ts :line-numbers=5
const fifth = 5;
const sixth = 6;
```

## コンテナ

### 標準タイトル

::: tip
役立つヒントです。**装飾** や [リンク](https://void.cloud) も使えます。
:::

::: info
背景情報や補足を表示します。
:::

::: warning
注意が必要な内容を表示します。
:::

::: danger
危険な操作についての説明を表示します。
:::

### カスタムタイトル

::: tip 自分で付けたタイトル
`::: tip タイトル` のように、タイトルを変更できます。
:::

### 折りたたみ

::: details クリックして詳細を表示
閉じた状態では隠れる本文です。

- リストも記述できます。
- キーボードでも開閉できます。
:::

## GitHub形式のアラート

> [!NOTE]
> 補足情報を表示します。

> [!TIP]
> 役立つヒントを表示します。

> [!IMPORTANT]
> 重要な情報を表示します。

> [!WARNING]
> 注意点を表示します。

> [!CAUTION]
> 危険を伴う内容を表示します。

インストール済みのVoidは `INFO` と `DANGER` も認識します。

> [!INFO]
> 追加の情報を表示します。

> [!DANGER]
> 強い警告を表示します。

## 絵文字

ショートコードがUnicodeの絵文字に変換されます。

:tada: :rocket: :sparkles: :white_check_mark: :warning: :heart:

## 脚注

本文から脚注を参照できます。[^markdown] 同じ脚注をもう一度参照することもできます。[^markdown]

別の脚注も追加できます。[^sample]

[^markdown]: 脚注は記事の末尾にまとめられ、本文との間をリンクで移動できます。

[^sample]: 脚注の中でも **太字** や [リンク](https://void.cloud) を利用できます。

## 属性 {.sample-section #attribute-example}

この見出しには `.sample-section` と `#attribute-example` を付けています。

段落にもクラスや属性を付けられます。 {.sample-paragraph data-sample="paragraph"}

[タイトル属性のあるリンク](https://void.cloud){title="属性記法のサンプル"}

## HTML

Markdownの中にHTMLを直接書くこともできます。

キーボード入力は <kbd>Ctrl</kbd> + <kbd>K</kbd>、マークは <mark>強調したい箇所</mark>、上付き文字は x<sup>2</sup>、下付き文字は H<sub>2</sub>O のように表示します。

定義リストはHTMLで記述できます。

<dl>
  <dt>Markdown</dt>
  <dd>文章を簡単な記号で構造化するための記法です。</dd>
  <dt>Void</dt>
  <dd>Markdownをページとして配信できるフレームワークです。</dd>
</dl>

<details>
  <summary>HTMLのdetails要素</summary>
  <p>HTMLで直接記述した折りたたみのサンプルです。</p>
</details>

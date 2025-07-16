# Astro + React TypeScript Template

AI 開発用の Astro + React TypeScript 構成のテンプレートです。

## 特徴

- **Astro Islands Architecture**: 静的部分は高速、インタラクティブ部分は React
- **React 19 + TypeScript**: 最新の React 機能とタイプセーフティ
- **Tailwind CSS 4**: 新しい高性能エンジンによる超高速スタイリング（ビルド5x高速）
- **Vitest + Testing Library**: 包括的なテスト環境
- **Biome**: 高速な formatter + linter
- **Bun**: 高速パッケージマネージャー

## 開発環境のセットアップ

```bash
# 依存関係のインストール
bun install

# 開発サーバーの起動
bun run dev

# ビルド
bun run build

# プレビュー
bun run preview
```

## 開発コマンド

### コード品質

```bash
# フォーマット
bun run format

# リント
bun run lint

# 型チェック
bun run typecheck
```

### テスト

```bash
# テスト実行
bun run test

# テスト UI
bun run test:ui
```

### 一括チェック

```bash
# すべてのチェックを実行
bun run check:all
```

## プロジェクト構造

```
src/
├── __tests__/           # テストファイル
│   ├── components/      # React コンポーネントテスト
│   ├── hooks/           # React hooks テスト
│   └── setup.ts         # テスト設定
├── components/          # React コンポーネント
├── hooks/               # React カスタムhooks
├── layouts/             # Astro レイアウト
└── pages/               # Astro ページ
```

## 技術スタック詳細

### Astro Islands

静的な部分は Astro でサーバーサイドレンダリングし、必要な部分のみ React でハイドレーションします。

```astro
<!-- 静的な部分 -->
<h1>タイトル</h1>

<!-- インタラクティブな部分 -->
<Counter client:load />
```

### パスエイリアス

`~` エイリアスで src ディレクトリを参照できます：

```typescript
import { useCounter } from '~/hooks/useCounter'
import { Counter } from '~/components/Counter'
```

### テスト駆動開発

このテンプレートは TDD に最適化されています：

- テストケースは日本語で記述
- hooks とコンポーネントの両方をテスト
- jsdom 環境で React コンポーネントをテスト

## 開発ガイドライン

- アロー関数を優先
- named export を使用（default export は避ける）
- 推論できる型は明示しない
- コンポーネントのロジックは hooks に切り出し
- 標準の fetch API を使用

詳細な開発指示は `CLAUDE.md` を参照してください。
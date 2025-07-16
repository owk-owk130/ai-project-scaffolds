# AI 開発用 React + TypeScript + Vite テンプレート

このテンプレートは、AI 開発に最適化された React + TypeScript + Vite の構成を提供します。モダンな開発ツールとベストプラクティスが組み込まれており、すぐに開発を始められます。

## 🚀 技術スタック

- **React 19** - 最新の React 機能を使用
- **TypeScript** - 型安全性と DX 向上
- **Vite 7** - 高速なビルドツール
- **Tailwind CSS 4** - ユーティリティファースト CSS
- **Vitest** - 高速なテストランナー
- **Biome** - 高速な linter/formatter（ESLint + Prettier の代替）
- **Bun** - 高速なパッケージマネージャー

## 📦 セットアップ

```bash
# 依存関係をインストール
bun install

# 開発サーバーを起動
bun run dev
```

## 🛠️ 開発コマンド

### 基本コマンド

```bash
# 開発サーバー起動
bun run dev

# ビルド
bun run build

# ビルド結果のプレビュー
bun run preview
```

### コード品質

```bash
# フォーマット
bun run format

# Lint実行（自動修正付き）
bun run lint

# 型チェック
bun run typecheck
```

### テスト

```bash
# テスト実行
bun run test

# テストUIモード
bun run test:ui
```

## 📁 プロジェクト構造

```
src/
├── __tests__/           # テストファイル（統一配置）
│   ├── App.test.tsx
│   ├── hooks/
│   │   └── useCounter.test.ts
│   └── setup.ts         # テスト設定
├── hooks/               # カスタムhooks
│   └── useCounter.ts
├── assets/              # 静的アセット
├── App.tsx              # メインアプリケーション
└── main.tsx             # エントリーポイント
```

## ✨ 特徴

### パスエイリアス

`~` で src ディレクトリを参照できます：

```typescript
import { useCounter } from "~/hooks/useCounter";
import App from "~/App";
```

### テスト

- Vitest による高速テスト
- React Testing Library でのコンポーネントテスト
- カスタム hooks のテスト
- 日本語でのテストケース記述

### コード品質

- Biome による高速な lint/format
- TypeScript strict mode
- Git 連携（VCS 設定有効）
- React 開発に最適化されたルール

### スタイリング

- Tailwind CSS 4 の新しい CSS エンジン
- App.css は削除済み（Tailwind に統一）
- レスポンシブデザイン対応

## 🧪 テスト方針

- テスト駆動開発（TDD）を推奨
- テストケースは日本語で記述
- hooks とコンポーネントの両方をテスト
- カバレッジを重視

## 📝 開発ガイドライン

- named export を優先
- アロー関数を使用
- 推論できる型は明示しない
- コンポーネントロジックは外部に切り出し
- 標準の fetch API を使用（axios 非推奨）

## 🔧 設定ファイル

- `biome.json` - Biome 設定
- `vite.config.ts` - Vite 設定（パスエイリアス含む）
- `tsconfig.*.json` - TypeScript 設定（複数環境対応）
- `CLAUDE.md` - Claude Code 用の設定ガイド

このテンプレートで効率的な AI 開発を始めましょう！

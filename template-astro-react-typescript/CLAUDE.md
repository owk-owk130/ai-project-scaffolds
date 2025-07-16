# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

このプロジェクトは AI 開発用の Astro + React TypeScript 構成のテンプレートです。

## Development Commands

### Setup and Development

- **Package Manager**: Bun を使用 (bun.lockb が存在)
- **Development Server**: `bun run dev` - Astro 開発サーバーを起動
- **Build**: `bun run build` - Astro check 後に Astro でビルド
- **Preview**: `bun run preview` - ビルド結果をプレビュー

### Code Quality

- **Format**: `bun run format` - Biome でコードフォーマット
- **Lint**: `bun run lint` - Biome でコードチェック（--write 付きで自動修正）
- **Type Check**: `bun run typecheck` - Astro の型チェック

### Testing

- **Test**: `bun run test` - Vitest でテスト実行
- **Test UI**: `bun run test:ui` - Vitest UI モードでテスト実行

## Architecture Overview

### Technology Stack

- **Frontend**: Astro + React + TypeScript
- **Build Tool**: Astro (Vite ベース)
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + @testing-library/react
- **Code Quality**: Biome (formatter + linter)
- **Package Manager**: Bun

### Project Structure

```
src/
├── __tests__/           # テストファイル（統一配置）
│   ├── components/      # React コンポーネントテスト
│   ├── hooks/           # React hooks テスト
│   └── setup.ts         # テスト設定
├── components/          # React コンポーネント
│   └── Counter.tsx
├── hooks/               # React カスタムhooks
│   └── useCounter.ts
├── layouts/             # Astro レイアウト
│   └── Layout.astro
└── pages/               # Astro ページ
    └── index.astro      # エントリーポイント
```

### Key Configuration

#### Path Alias

- `~` で src ディレクトリを参照
- TypeScript と Astro の両方で設定済み
- 例: `import { useCounter } from '~/hooks/useCounter'`

#### Biome Settings

- インデント: 2 スペース
- クォート: シングル
- セミコロン: 必要な場合のみ
- 行幅: 100 文字
- VCS 連携有効（git）
- React 開発に最適化されたルール

#### Testing Environment

- jsdom 環境で React コンポーネントのテスト
- Vitest + @testing-library/react
- グローバル関数有効（describe, test, expect）
- テストケースは日本語で記述

#### Styling

- Tailwind CSS 4 の新しい高性能エンジンを使用
- @tailwindcss/vite プラグインで直接統合（従来の @astrojs/tailwind は不使用）
- ビルド速度が 5x 高速、増分ビルドが 100x 高速化
- 自動コンテンツ検出で設定不要
- src/styles/global.css で @import "tailwindcss" により読み込み

### Development Notes

#### Astro Islands Architecture

- 静的部分は Astro で高速レンダリング
- インタラクティブ部分は React コンポーネントで実装
- `client:load` ディレクティブでハイドレーション制御
- パフォーマンス最適化された島アーキテクチャ

#### コーディング規約

- アロー関数を優先
- named export を使用（default export は避ける）
- 推論できる型は明示しない
- コンポーネントのロジックは外部に切り出し
- 標準の fetch API を使用（axios は非推奨）

#### テスト駆動開発（TDD）

- 原則としてテスト駆動開発で進める
- テストケースは日本語で記述
- React hooks とコンポーネントの両方をテスト
- テスト実行後は必ず lint/typecheck を実行

#### アーキテクチャパターン

- カスタム hooks でロジック分離
- React コンポーネントはプレゼンテーション層に専念
- Astro コンポーネントは静的部分とレイアウトを担当
- テストファイルは src/**tests** に統一配置
- パスエイリアス（~）を積極的に使用

### Important Files

- `astro.config.mjs`: Astro の設定（React 統合、Tailwind、パスエイリアス、テスト環境）
- `biome.json`: Biome の設定（VCS 連携、React 最適化ルール）
- `tsconfig.json`: TypeScript の設定（Astro strict config、パスエイリアス）
- `src/layouts/Layout.astro`: ベースレイアウト（Tailwind 設定）

このテンプレートは AI 開発に最適化されており、Astro の島アーキテクチャと React の柔軟性を組み合わせた効率的で保守性の高いコード作成をサポートします。

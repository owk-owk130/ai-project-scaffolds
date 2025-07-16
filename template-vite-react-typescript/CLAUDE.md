# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

このプロジェクトは AI 開発用の React TypeScript Vite 構成のテンプレートです。

## Development Commands

### Setup and Development

- **Package Manager**: Bun を使用 (bun.lockb が存在)
- **Development Server**: `bun run dev` - Vite 開発サーバーを起動
- **Build**: `bun run build` - TypeScript コンパイル後に Vite でビルド
- **Preview**: `bun run preview` - ビルド結果をプレビュー

### Code Quality

- **Format**: `bun run format` - Biome でコードフォーマット
- **Lint**: `bun run lint` - Biome でコードチェック（--write 付きで自動修正）
- **Type Check**: `bun run typecheck` - TypeScript の型チェック

### Testing

- **Test**: `bun run test` - Vitest でテスト実行
- **Test UI**: `bun run test:ui` - Vitest UI モードでテスト実行

## Architecture Overview

### Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + @testing-library/react
- **Code Quality**: Biome (formatter + linter)
- **Package Manager**: Bun

### Project Structure

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

### Key Configuration

#### Path Alias

- `~` で src ディレクトリを参照
- TypeScript と Vite の両方で設定済み
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

- Tailwind CSS 4 の新しい CSS エンジンを使用
- App.css は削除済み（Tailwind に統一）
- index.html の #root 要素に基本スタイル適用

### Development Notes

#### コーディング規約

- アロー関数を優先
- named export を使用（default export は避ける）
- 推論できる型は明示しない
- コンポーネントのロジックは外部に切り出し
- 標準の fetch API を使用（axios は非推奨）

#### テスト駆動開発（TDD）

- 原則としてテスト駆動開発で進める
- テストケースは日本語で記述
- hooks とコンポーネントの両方をテスト
- テスト実行後は必ず lint/typecheck を実行

#### アーキテクチャパターン

- カスタム hooks でロジック分離
- コンポーネントはプレゼンテーション層に専念
- テストファイルは src/**tests** に統一配置
- パスエイリアス（~）を積極的に使用

### Important Files

- `biome.json`: Biome の設定（VCS 連携、React 最適化ルール）
- `vite.config.ts`: Vite の設定（パスエイリアス、テスト環境）
- `tsconfig.app.json`: TypeScript の設定（パスエイリアス）
- `index.html`: #root 要素に Tailwind クラス適用

このテンプレートは AI 開発に最適化されており、効率的で保守性の高いコード作成をサポートします。

# template-astro-react-typescript

## 構成

- Astro 5 + React 19 + TypeScript
- Tailwind CSS 4 (@tailwindcss/vite)
- Vitest + @testing-library/react
- Biome (formatter + linter)
- Bun

## セットアップ

```bash
bun install
bun run dev
```

## コマンド

```bash
# 開発
bun run dev

# ビルド
bun run build

# コード品質
bun run lint
bun run format
bun run typecheck

# テスト
bun run test
bun run test:ui

# 一括チェック
bun run check:all
```

## 構造

```text
src/
├── __tests__/           # テスト
├── components/          # React コンポーネント
├── hooks/               # React hooks
├── layouts/             # Astro レイアウト
├── pages/               # Astro ページ
└── styles/              # CSS
```

## 設定

- パスエイリアス: `~` で src を参照
- Astro Islands: 静的部分は Astro、インタラクティブ部分は React
- テストケースは日本語で記述

詳細は `CLAUDE.md` を参照。

# project-scaffolds

AI 開発用プロジェクトテンプレートのスキャフォールディング

## 使用方法

### 基本使用法

```bash
# npx
npx create-ai-project-scaffold my-project

# bunx
bunx create-ai-project-scaffold my-project
```

### インタラクティブモード

```bash
npx create-ai-project-scaffold
```

### オプション指定

```bash
npx create-ai-project-scaffold my-project --template tauri-react
```

## 利用可能なテンプレート

### 1. React + Vite (`vite-react`)

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Vitest + @testing-library/react
- Biome (formatter + linter)

### 2. Astro + React (`astro-react`)

- Astro + React TypeScript
- SSG (Static Site Generation)
- Tailwind CSS 4
- Vitest テスト環境
- Biome コード品質管理

### 3. Tauri + React (`tauri-react`)

- Tauri 2.x (デスクトップ/モバイル)
- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- クロスプラットフォーム対応

## 対応パッケージマネージャー

- npm
- yarn
- pnpm
- bun (推奨)

# Tauri React TypeScript Vite Template

AI 開発用の Tauri + React TypeScript Vite 構成のテンプレートです。

## 技術スタック

- **Frontend**: React 19 + TypeScript
- **Desktop/Mobile**: Tauri 2.x (Windows, macOS, Linux, Android, iOS)
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + @testing-library/react
- **Code Quality**: Biome (formatter + linter)
- **Package Manager**: Bun

## セットアップ

### 必要な環境

- Node.js 18+
- Bun
- Rust (Tauri development)
- Android Studio (Android development)
- Xcode (iOS development - macOS only)

### インストール

```bash
bun install
```

### 開発サーバー起動

```bash
# Web版（ブラウザ）
bun run dev

# Tauri版（デスクトップアプリ）
bun run tauri:dev
```

## 開発コマンド

### 基本操作

- `bun run dev` - Vite 開発サーバー起動
- `bun run tauri:dev` - Tauri アプリケーション開発モード
- `bun run build` - Web 版ビルド
- `bun run tauri:build` - Tauri アプリケーションビルド
- `bun run preview` - ビルド結果プレビュー

### コード品質

- `bun run format` - Biome でコードフォーマット
- `bun run lint` - Biome でコードチェック
- `bun run typecheck` - TypeScript 型チェック
- `bun run check:all` - 全品質チェック実行

### テスト

- `bun run test` - テスト実行
- `bun run test:ui` - Vitest UI モードでテスト実行

### モバイル開発

#### Android

- `bun run tauri:android:init` - Android プロジェクト初期化
- `bun run tauri:android:dev` - Android 開発モード
- `bun run tauri:android:build` - Android ビルド

#### iOS

- `bun run tauri:ios:init` - iOS プロジェクト初期化
- `bun run tauri:ios:dev` - iOS 開発モード
- `bun run tauri:ios:build` - iOS ビルド

## プロジェクト構成

```text
src/
├── __tests__/           # テストファイル
│   ├── App.test.tsx
│   ├── hooks/
│   │   └── useCounter.test.ts
│   └── setup.ts
├── hooks/               # カスタムhooks
│   └── useCounter.ts
├── assets/              # 静的アセット
├── App.tsx              # メインアプリケーション
├── main.tsx             # エントリーポイント
└── index.css            # Tailwind CSSスタイル

src-tauri/
├── src/
│   └── main.rs          # Rust メイン関数
├── Cargo.toml           # Rust 依存関係
└── tauri.conf.json      # Tauri 設定
```

## 主な機能

- **パスエイリアス**: `~` で src ディレクトリを参照
- **テスト環境**: Vitest + @testing-library/react
- **コード品質**: Biome による自動フォーマット・リント
- **型安全性**: TypeScript での厳密な型チェック
- **クロスプラットフォーム**: デスクトップ (Windows/macOS/Linux) + モバイル (Android/iOS)

## モバイル開発の注意事項

ika

### Android

- 最小 SDK バージョン: 21 (Android 5.0)
- Android Studio と Android SDK が必要
- 初回は `bun run tauri:android:init` でプロジェクトを初期化

### iOS

- macOS でのみ開発可能
- Xcode が必要
- Apple Developer Program への登録が必要（実機テスト・配布時）
- `tauri.conf.json` の `developmentTeam` を自身の Team ID に変更

## 開発ガイドライン

詳細な開発ガイドラインは [CLAUDE.md](./CLAUDE.md) を参照してください。

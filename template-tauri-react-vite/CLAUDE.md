# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

このプロジェクトは AI 開発用の Tauri + React TypeScript Vite 構成のテンプレートです。

## Development Commands

### Setup and Development

- **Package Manager**: Bun を使用 (bun.lockb が存在)
- **Development Server**: `bun run dev` - Vite 開発サーバーを起動
- **Tauri Development**: `bun run tauri:dev` - Tauri アプリケーションを開発モードで起動
- **Build**: `bun run build` - TypeScript コンパイル後に Vite でビルド
- **Tauri Build**: `bun run tauri:build` - Tauri アプリケーションをビルド
- **Preview**: `bun run preview` - ビルド結果をプレビュー

### Code Quality

- **Format**: `bun run format` - Biome でコードフォーマット
- **Lint**: `bun run lint` - Biome でコードチェック（--write 付きで自動修正）
- **Type Check**: `bun run typecheck` - TypeScript の型チェック
- **All Check**: `bun run check:all` - 全品質チェック実行

### Testing

- **Test**: `bun run test` - Vitest でテスト実行
- **Test UI**: `bun run test:ui` - Vitest UI モードでテスト実行

### Tauri Commands

- **Tauri CLI**: `bun run tauri` - Tauri CLI コマンド
- **Tauri Dev**: `bun run tauri:dev` - 開発モードでアプリケーション起動
- **Tauri Build**: `bun run tauri:build` - リリース用ビルド

### Mobile Development

#### Android
- **Init**: `bun run tauri:android:init` - Android プロジェクト初期化
- **Dev**: `bun run tauri:android:dev` - Android 開発モード
- **Build**: `bun run tauri:android:build` - Android ビルド

#### iOS
- **Init**: `bun run tauri:ios:init` - iOS プロジェクト初期化
- **Dev**: `bun run tauri:ios:dev` - iOS 開発モード
- **Build**: `bun run tauri:ios:build` - iOS ビルド

## Architecture Overview

### Technology Stack

- **Frontend**: React 19 + TypeScript
- **Desktop/Mobile**: Tauri 2.x (Windows, macOS, Linux, Android, iOS)
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
├── main.tsx             # エントリーポイント
└── index.css            # Tailwind CSSスタイル

src-tauri/
├── src/
│   └── main.rs          # Rust メイン関数
├── Cargo.toml           # Rust 依存関係
└── tauri.conf.json      # Tauri 設定
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

#### Tauri Integration

- Tauri API 2.x を使用
- @tauri-apps/api でフロントエンドとバックエンドを連携
- shell プラグインなど必要なプラグインを追加
- Rust バックエンドとの安全な通信

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

#### Tauri 開発パターン

- フロントエンドとバックエンドの責任分離
- Tauri コマンドでの安全な通信
- プラットフォーム固有機能の適切な活用
- セキュリティを考慮したファイルアクセス

#### モバイル開発の注意点

- **Android**: 最小 SDK バージョン 21 (Android 5.0)
- **iOS**: Development Team ID の設定が必要
- モバイル固有の権限設定に注意
- レスポンシブデザインの実装

#### モバイル開発ワークフロー

1. **環境構築**: [MOBILE_SETUP.md](./MOBILE_SETUP.md) を参照
2. **設定調整**: [MOBILE_CONFIG.md](./MOBILE_CONFIG.md) で詳細設定
3. **開発開始**: プラットフォーム別のコマンドを使用
4. **テスト**: エミュレーター・実機での動作確認
5. **ビルド**: Release ビルドでパフォーマンス確認

#### モバイル特有のデバッグ方法

- **Android**: Chrome DevTools (`chrome://inspect`)
- **iOS**: Safari 開発メニュー
- **ログ**: プラットフォーム固有のロガー使用
- **パフォーマンス**: モバイル環境でのプロファイリング

#### プラットフォーム別の制限事項

**Android**:
- ファイルアクセス権限に注意
- バックグラウンド処理の制限
- Google Play ストアのポリシー準拠

**iOS**:
- App Store Review Guidelines 準拠
- サンドボックス環境の制限
- メモリ使用量の最適化が重要

#### アーキテクチャパターン

- カスタム hooks でロジック分離
- コンポーネントはプレゼンテーション層に専念
- テストファイルは src/**tests** に統一配置
- パスエイリアス（~）を積極的に使用

### Important Files

- `biome.json`: Biome の設定（VCS 連携、React 最適化ルール）
- `vite.config.ts`: Vite の設定（パスエイリアス、テスト環境）
- `tsconfig.app.json`: TypeScript の設定（パスエイリアス）
- `src-tauri/tauri.conf.json`: Tauri の設定（権限、プラグイン、モバイル設定）
- `src-tauri/Cargo.toml`: Rust 依存関係（モバイル対応含む）
- `index.html`: #root 要素に Tailwind クラス適用

## モバイル開発リソース

### 必須ドキュメント

- **[MOBILE_SETUP.md](./MOBILE_SETUP.md)**: 詳細な環境構築手順
- **[MOBILE_CONFIG.md](./MOBILE_CONFIG.md)**: 設定項目・権限の詳細

### 参考リンク

- [Tauri Mobile Guide](https://beta.tauri.app/guides/distribute/mobile/)
- [Android Developer Documentation](https://developer.android.com/)
- [iOS Developer Documentation](https://developer.apple.com/documentation/)

このテンプレートは AI 開発に最適化されており、Tauri を使用したクロスプラットフォーム（デスクトップ・モバイル）アプリケーション開発で効率的で保守性の高いコード作成をサポートします。
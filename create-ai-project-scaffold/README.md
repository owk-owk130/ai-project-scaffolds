# create-ai-project-scaffold

AI 開発用プロジェクトテンプレートのスキャフォールディングツールの開発・メンテナンス用ドキュメント

## 開発環境セットアップ

### 前提条件

- Node.js >= 18.0.0
- bun (推奨パッケージマネージャー)

### セットアップ手順

```bash
# 依存関係インストール
bun install

# TypeScriptビルド
bun run build

# 開発モード（ファイル監視）
bun run dev
```

## 開発用コマンド

```bash
# テスト実行
bun run test

# 型チェック
bun run typecheck

# Lintと自動修正
bun run lint

# フォーマット
bun run format

# 全チェック実行（type + lint + format + test + build）
bun run check:all
```

## アーキテクチャ

### ファイル構成

```text
src/
├── index.ts          # メインCLIロジック
├── templates.ts      # テンプレート定義
├── utils.ts          # ユーティリティ関数
└── __tests__/        # テストファイル
    ├── templates.test.ts
    └── utils.test.ts
```

### 主要モジュール

#### index.ts

- Commander.js による CLI 設定
- @clack/prompts によるインタラクティブプロンプト
- degit によるテンプレートダウンロード
- execa による依存関係インストール

#### templates.ts

- 利用可能なテンプレート定義
- テンプレート検索機能

#### utils.ts

- プロジェクト名バリデーション
- ディレクトリ空チェック
- package.json 更新
- ロックファイル削除

## 新しいテンプレートの追加

1. **リポジトリにテンプレートディレクトリを作成**

   ```bash
   template-{technology}-{framework}/
   ```

2. **templates.ts に定義を追加**

   ```typescript
   {
     name: 'template-name',
     label: '表示名',
     description: '説明',
     path: 'template-directory-name',
   }
   ```

3. **テストケースを追加**

   ```typescript
   test("新テンプレートを正しく取得できること", () => {
     const template = getTemplate("template-name");
     expect(template?.name).toBe("template-name");
   });
   ```

## パッケージ公開

### 公開前チェック

```bash
# 全チェックの実行
bun run check:all

# ビルド成果物の確認
ls -la dist/
```

### 公開手順

```bash
# バージョン更新
npm version patch|minor|major

# npmに公開
npm publish
```

## 技術仕様

### 依存関係

#### プロダクション依存関係

- **commander**: CLI 引数解析
- **@clack/prompts**: インタラクティブプロンプト
- **degit**: Git リポジトリからのテンプレートダウンロード
- **execa**: 子プロセス実行
- **chalk**: ターミナル出力の色付け

#### 開発依存関係

- **TypeScript**: 型安全性
- **Vitest**: テストフレームワーク
- **@biomejs/biome**: Lint・フォーマット

### ビルド設定

- **TypeScript**: ES モジュール形式でビルド
- **Target**: Node.js 18 以上
- **Output**: `dist/`ディレクトリ

### テスト戦略

- **Unit tests**: 各ユーティリティ関数のテスト
- **Integration tests**: テンプレート定義の整合性テスト
- **Mocking**: `node:fs`モジュールのモック

## トラブルシューティング

### よくある問題

1. **型エラー**: `bun run typecheck`で確認
2. **Lint エラー**: `bun run lint`で自動修正
3. **テスト失敗**: `bun run test`でデバッグ

### 開発時の注意点

- パッケージマネージャーのデフォルトは`bun`
- テンプレート追加時は必ずテストケースも追加
- 公開前は`check:all`コマンドの実行を必須とする

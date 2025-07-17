# モバイル開発環境構築ガイド

このドキュメントでは、Tauri アプリケーションの Android/iOS 開発環境の詳細な構築手順を説明します。

## 目次

- [Android 開発環境](#android-開発環境)
- [iOS 開発環境](#ios-開発環境)
- [共通の注意事項](#共通の注意事項)
- [トラブルシューティング](#トラブルシューティング)

## Android 開発環境

### 1. 必要なツール

- **Android Studio** (最新版推奨)
- **Android SDK** (API Level 21 以上)
- **Android NDK** (Rust のクロスコンパイル用)
- **Java Development Kit (JDK)** 11 以上

### 2. Android Studio のインストール

1. [Android Studio 公式サイト](https://developer.android.com/studio) からダウンロード
2. インストーラーを実行し、標準インストールを選択
3. 初回起動時の SDK セットアップウィザードを完了

### 3. 環境変数の設定

#### macOS/Linux

```bash
# ~/.zshrc または ~/.bashrc に追加
export ANDROID_HOME="$HOME/Library/Android/sdk"  # macOS
# export ANDROID_HOME="$HOME/Android/Sdk"        # Linux
export PATH="$PATH:$ANDROID_HOME/emulator"
export PATH="$PATH:$ANDROID_HOME/platform-tools"
export PATH="$PATH:$ANDROID_HOME/tools"
export PATH="$PATH:$ANDROID_HOME/tools/bin"

# NDK パス
export NDK_HOME="$ANDROID_HOME/ndk/25.2.9519653"  # バージョンは適宜変更
```

#### Windows

システム環境変数に以下を追加：

- `ANDROID_HOME`: `C:\Users\[Username]\AppData\Local\Android\Sdk`
- `Path` に追加:
  - `%ANDROID_HOME%\emulator`
  - `%ANDROID_HOME%\platform-tools`
  - `%ANDROID_HOME%\tools`
  - `%ANDROID_HOME%\tools\bin`

### 4. Rust ターゲットの追加

```bash
# Android ターゲットを追加
rustup target add aarch64-linux-android
rustup target add armv7-linux-androideabi
rustup target add i686-linux-android
rustup target add x86_64-linux-android
```

### 5. プロジェクトの初期化

```bash
# Android プロジェクトを初期化
bun run tauri:android:init
```

### 6. エミュレーターの設定

1. Android Studio を開く
2. `Tools` → `AVD Manager` を選択
3. `Create Virtual Device` をクリック
4. 適切なデバイスを選択（Pixel 5 推奨）
5. システムイメージをダウンロード（API 30 以上推奨）

### 7. 開発の開始

```bash
# エミュレーターまたは実機で開発
bun run tauri:android:dev

# 実機の場合は USB デバッグを有効化
# 設定 → 開発者向けオプション → USB デバッグ
```

## iOS 開発環境

### 1. 必要なツール

- **macOS** (必須)
- **Xcode** (最新版推奨)
- **Apple Developer Account** (実機テスト・配布時)
- **CocoaPods** (依存関係管理)

### 2. Xcode のインストール

1. Mac App Store から Xcode をインストール
2. 初回起動時にコンポーネントのインストールを許可
3. Command Line Tools のインストール:
   ```bash
   xcode-select --install
   ```

### 3. CocoaPods のインストール

```bash
# Homebrew 経由でインストール（推奨）
brew install cocoapods

# または gem 経由
sudo gem install cocoapods
```

### 4. Rust ターゲットの追加

```bash
# iOS ターゲットを追加
rustup target add aarch64-apple-ios
rustup target add x86_64-apple-ios
rustup target add aarch64-apple-ios-sim
```

### 5. Apple Developer 設定

1. [Apple Developer](https://developer.apple.com) にサインイン
2. Team ID を確認（Account → Membership → Team ID）
3. `tauri.conf.json` を更新:
   ```json
   {
     "bundle": {
       "iOS": {
         "developmentTeam": "YOUR_ACTUAL_TEAM_ID"
       }
     }
   }
   ```

### 6. プロジェクトの初期化

```bash
# iOS プロジェクトを初期化
bun run tauri:ios:init
```

### 7. シミュレーターの設定

```bash
# 利用可能なシミュレーターを確認
xcrun simctl list devices

# 特定のシミュレーターで起動（例：iPhone 14）
bun run tauri:ios:dev -- --target "iPhone 14"
```

### 8. 実機での開発

1. iPhone を Mac に接続
2. iPhone の設定で開発者モードを有効化
3. Xcode でデバイスを信頼
4. プロビジョニングプロファイルを設定

## 共通の注意事項

### パフォーマンス最適化

- **Release ビルド**: 本番環境では必ず release ビルドを使用
  ```bash
  bun run tauri:android:build --release
  bun run tauri:ios:build --release
  ```

### セキュリティ

- **CSP 設定**: モバイル環境では Content Security Policy に注意
- **権限管理**: 必要な権限のみをリクエスト

### デバッグ

- **Chrome DevTools** (Android): `chrome://inspect`
- **Safari Developer Tools** (iOS): Safari → 開発メニュー

## トラブルシューティング

### Android の一般的な問題

#### SDK が見つからない

```bash
# ANDROID_HOME が正しく設定されているか確認
echo $ANDROID_HOME

# SDK Manager で必要なパッケージをインストール
sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.3"
```

#### ビルドエラー

```bash
# Gradle キャッシュをクリア
cd src-tauri/gen/android
./gradlew clean
```

### iOS の一般的な問題

#### コード署名エラー

1. Xcode でプロジェクトを開く
2. Signing & Capabilities タブを確認
3. Team を正しく設定

#### CocoaPods エラー

```bash
# Pod をクリーンインストール
cd src-tauri/gen/ios
pod deintegrate
pod install
```

### 共通の問題

#### Rust ツールチェーンエラー

```bash
# ツールチェーンを更新
rustup update
rustup target add [必要なターゲット]
```

## 次のステップ

- [MOBILE_CONFIG.md](./MOBILE_CONFIG.md) - 詳細な設定オプション
- [README.md](./README.md) - プロジェクトの概要
- [Tauri Mobile Guide](https://beta.tauri.app/guides/distribute/mobile) - 公式ドキュメント

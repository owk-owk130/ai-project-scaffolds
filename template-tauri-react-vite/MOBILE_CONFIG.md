# モバイル設定詳細ガイド

このドキュメントでは、Tauri モバイルアプリケーションの設定項目について詳しく説明します。

## 目次

- [tauri.conf.json 設定](#tauriconfjson-設定)
- [Cargo.toml 設定](#cargotoml-設定)
- [アイコンとアセット](#アイコンとアセット)
- [権限設定](#権限設定)
- [プラットフォーム固有設定](#プラットフォーム固有設定)

## tauri.conf.json 設定

### 基本構成

```json
{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "your-app-name",
  "version": "0.1.0",
  "identifier": "com.yourcompany.yourapp",
  "build": {
    "beforeDevCommand": "bun run dev",
    "devUrl": "http://localhost:1420",
    "beforeBuildCommand": "bun run build",
    "frontendDist": "../dist"
  }
}
```

### モバイル固有設定

#### bundle セクション

```json
{
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ],
    "iOS": {
      "developmentTeam": "YOUR_TEAM_ID",
      "bundleVersion": "1",
      "frameworks": [],
      "minimumSystemVersion": "13.0",
      "useXcodeNetworking": false
    },
    "android": {
      "minSdkVersion": 21,
      "compileSdkVersion": 33,
      "targetSdkVersion": 33,
      "versionCode": 1
    }
  }
}
```

#### app セクション

```json
{
  "app": {
    "windows": [
      {
        "title": "Your App",
        "width": 800,
        "height": 600,
        "resizable": true,
        "fullscreen": false
      }
    ],
    "security": {
      "csp": null,
      "dangerousDisableAssetCspModification": false
    },
    "trayIcon": {
      "iconPath": "icons/icon.png",
      "iconAsTemplate": true
    }
  }
}
```

### 設定項目の詳細

#### iOS 設定項目

| 項目 | 説明 | 必須 |
|------|------|------|
| `developmentTeam` | Apple Developer Team ID | ✅ |
| `bundleVersion` | アプリのビルド番号 | - |
| `minimumSystemVersion` | 最小 iOS バージョン | - |
| `useXcodeNetworking` | Xcode ネットワーキング使用 | - |
| `frameworks` | 追加フレームワーク | - |

#### Android 設定項目

| 項目 | 説明 | 必須 |
|------|------|------|
| `minSdkVersion` | 最小 Android API レベル | ✅ |
| `compileSdkVersion` | コンパイル SDK バージョン | - |
| `targetSdkVersion` | ターゲット SDK バージョン | - |
| `versionCode` | アプリのバージョンコード | - |

## Cargo.toml 設定

### 基本設定

```toml
[package]
name = "your-app-name"
version = "0.1.0"
description = "Your app description"
authors = ["you"]
edition = "2021"

[lib]
name = "your_app_name_lib"
crate-type = ["staticlib", "cdylib", "rlib"]

[build-dependencies]
tauri-build = { version = "2", features = [] }

[dependencies]
tauri = { version = "2", features = ["unstable"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

### モバイル対応依存関係

```toml
# モバイル共通
[target.'cfg(any(target_os = "android", target_os = "ios"))'.dependencies]
log = "0.4"

# Android 固有
[target.'cfg(target_os = "android")'.dependencies]
android_logger = "0.14"
jni = "0.21"

# iOS 固有
[target.'cfg(target_os = "ios")'.dependencies]
oslog = "0.2"
objc = "0.2"
```

### Tauri 機能フラグ

```toml
[dependencies.tauri]
version = "2"
features = [
  "unstable",           # モバイル対応に必要
  "api-all",           # 全 API を有効化
  "system-tray",       # システムトレイ（デスクトップのみ）
  "notification",      # 通知
  "http-request",      # HTTP リクエスト
  "fs-read-file",      # ファイル読み込み
  "shell-open"         # シェルコマンド実行
]
```

## アイコンとアセット

### アイコンファイル構成

```
src-tauri/icons/
├── 32x32.png           # Windows/Linux 用
├── 128x128.png         # Windows/Linux 用
├── 128x128@2x.png      # Windows/Linux 用（高解像度）
├── icon.icns           # macOS 用
├── icon.ico            # Windows 用
└── icon.png            # 1024x1024 ベースアイコン
```

### モバイル用アイコン生成

#### Android アイコン
`tauri android init` 実行時に自動生成されます：

```
src-tauri/gen/android/app/src/main/res/
├── mipmap-hdpi/ic_launcher.png
├── mipmap-mdpi/ic_launcher.png
├── mipmap-xhdpi/ic_launcher.png
├── mipmap-xxhdpi/ic_launcher.png
└── mipmap-xxxhdpi/ic_launcher.png
```

#### iOS アイコン
`tauri ios init` 実行時に自動生成されます：

```
src-tauri/gen/ios/Assets.xcassets/AppIcon.appiconset/
├── Icon-20.png
├── Icon-29.png
├── Icon-40.png
├── Icon-58.png
├── Icon-60.png
├── Icon-76.png
├── Icon-80.png
├── Icon-87.png
├── Icon-120.png
├── Icon-152.png
├── Icon-167.png
└── Icon-180.png
```

### スプラッシュスクリーン

#### Android

`src-tauri/gen/android/app/src/main/res/drawable/splash.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/splash_background_color" />
    <item android:gravity="center">
        <bitmap android:src="@drawable/ic_launcher" />
    </item>
</layer-list>
```

#### iOS

`src-tauri/gen/ios/LaunchScreen.storyboard` で設定

## 権限設定

### Android 権限

`src-tauri/gen/android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- ネットワーク権限 -->
    <uses-permission android:name="android.permission.INTERNET" />
    
    <!-- ファイルアクセス権限 -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    
    <!-- カメラ権限 -->
    <uses-permission android:name="android.permission.CAMERA" />
    
    <!-- 位置情報権限 -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    
    <!-- 通知権限 -->
    <uses-permission android:name="android.permission.VIBRATE" />
</manifest>
```

### iOS 権限

`src-tauri/gen/ios/Info.plist`:

```xml
<dict>
    <!-- カメラ権限 -->
    <key>NSCameraUsageDescription</key>
    <string>This app needs access to camera to take photos</string>
    
    <!-- 位置情報権限 -->
    <key>NSLocationWhenInUseUsageDescription</key>
    <string>This app needs access to location for navigation</string>
    
    <!-- マイク権限 -->
    <key>NSMicrophoneUsageDescription</key>
    <string>This app needs access to microphone for recording</string>
    
    <!-- フォトライブラリ権限 -->
    <key>NSPhotoLibraryUsageDescription</key>
    <string>This app needs access to photo library to select images</string>
</dict>
```

## プラットフォーム固有設定

### Android Gradle 設定

`src-tauri/gen/android/app/build.gradle`:

```gradle
android {
    compileSdkVersion 33
    
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### iOS プロジェクト設定

`src-tauri/gen/ios/project.yml`:

```yaml
name: YourApp
options:
  bundleIdPrefix: com.yourcompany
  deploymentTarget:
    iOS: "13.0"
targets:
  YourApp_iOS:
    type: application
    platform: iOS
    sources:
      - path: Sources
```

### プラットフォーム判定

Rust コードでプラットフォームを判定：

```rust
#[cfg(target_os = "android")]
fn android_specific_function() {
    // Android 固有の処理
}

#[cfg(target_os = "ios")]
fn ios_specific_function() {
    // iOS 固有の処理
}

#[cfg(any(target_os = "android", target_os = "ios"))]
fn mobile_function() {
    // モバイル共通の処理
}
```

## 設定のテストとデバッグ

### 設定の検証

```bash
# 設定ファイルの構文チェック
bun run tauri config validate

# Android 設定の確認
bun run tauri android info

# iOS 設定の確認
bun run tauri ios info
```

### ログ出力

```rust
// Rust 側でのログ出力
#[cfg(target_os = "android")]
fn init_logger() {
    android_logger::init_once(
        android_logger::Config::default()
            .with_max_level(log::LevelFilter::Debug)
    );
}

#[cfg(target_os = "ios")]
fn init_logger() {
    oslog::OsLogger::new("com.yourcompany.yourapp")
        .level_filter(log::LevelFilter::Debug)
        .init()
        .unwrap();
}
```

## 次のステップ

- [MOBILE_SETUP.md](./MOBILE_SETUP.md) - 環境構築ガイド
- [Tauri Config Reference](https://beta.tauri.app/reference/config/) - 公式設定リファレンス
- [Tauri Mobile Examples](https://github.com/tauri-apps/tauri-mobile) - 公式サンプル
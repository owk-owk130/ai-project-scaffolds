#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { cancel, confirm, intro, isCancel, outro, select, spinner, text } from '@clack/prompts'
import chalk from 'chalk'
import { program } from 'commander'
// @ts-ignore
import degit from 'degit'
import { execa } from 'execa'

import { getTemplate, type Template, templates } from './templates.js'
import {
  isDirectoryEmpty,
  type PackageManager,
  removeLockFiles,
  updatePackageJson,
  validateProjectName,
} from './utils.js'

const main = async () => {
  console.clear()

  intro(chalk.bgBlue(' create-ai-project-scaffold '))

  let projectName: string
  let template: Template
  let packageManager: PackageManager

  // プロジェクト名の取得
  const projectNameArg = program.args[0]

  if (projectNameArg) {
    const validation = validateProjectName(projectNameArg)
    if (validation) {
      cancel(validation)
      process.exit(1)
    }
    projectName = projectNameArg
  } else {
    const projectNameInput = await text({
      message: 'プロジェクト名を入力してください:',
      placeholder: 'my-ai-project',
      validate: validateProjectName,
    })

    if (isCancel(projectNameInput)) {
      cancel('操作がキャンセルされました')
      process.exit(1)
    }

    projectName = projectNameInput
  }

  // ディレクトリの存在チェック
  const projectPath = path.resolve(projectName)

  if (fs.existsSync(projectPath) && !isDirectoryEmpty(projectPath)) {
    const overwrite = await confirm({
      message: `ディレクトリ "${projectName}" は空ではありません。続行しますか?`,
      initialValue: false,
    })

    if (isCancel(overwrite) || !overwrite) {
      cancel('操作がキャンセルされました')
      process.exit(1)
    }
  }

  // テンプレート選択
  const templateChoice = await select({
    message: 'プロジェクトテンプレートを選択してください:',
    options: templates.map((t) => ({
      value: t.name,
      label: t.label,
      hint: t.description,
    })),
  })

  if (isCancel(templateChoice)) {
    cancel('操作がキャンセルされました')
    process.exit(1)
  }

  template = getTemplate(templateChoice as string)!

  // パッケージマネージャー選択
  const packageManagerChoice = await select({
    message: 'パッケージマネージャーを選択してください:',
    options: [
      { value: 'npm', label: 'npm' },
      { value: 'yarn', label: 'yarn' },
      { value: 'pnpm', label: 'pnpm' },
      { value: 'bun', label: 'bun' },
    ],
    initialValue: 'bun',
  })

  if (isCancel(packageManagerChoice)) {
    cancel('操作がキャンセルされました')
    process.exit(1)
  }

  packageManager = packageManagerChoice as PackageManager

  // プロジェクト作成開始
  const s = spinner()

  try {
    // テンプレートダウンロード
    s.start('テンプレートをダウンロード中...')

    const templateUrl = `owk-owk130/ai-project-scaffolds/${template.path}`
    await degit(templateUrl).clone(projectPath)

    s.message('プロジェクトをセットアップ中...')

    // package.json更新
    updatePackageJson(projectPath, projectName)

    // ロックファイル削除
    removeLockFiles(projectPath)

    // 依存関係インストール
    s.message('依存関係をインストール中...')

    await execa(packageManager, ['install'], {
      cwd: projectPath,
      stdio: 'ignore',
    })

    s.stop('プロジェクトが作成されました!')
  } catch (error) {
    s.stop('エラーが発生しました')
    console.error(chalk.red('Error:'), error)
    process.exit(1)
  }

  // 完了メッセージ
  outro(
    `プロジェクト ${chalk.green(projectName)} が作成されました!\n\n` +
      `次のコマンドで開発を開始できます:\n` +
      `  ${chalk.cyan(`cd ${projectName}`)}\n` +
      `  ${chalk.cyan(`${packageManager} run dev`)}`,
  )
}

// CLI設定
program
  .name('create-ai-project-scaffold')
  .description('AI開発用プロジェクトテンプレートのスキャフォールディングツール')
  .version('1.0.0')
  .argument('[project-name]', 'プロジェクト名')
  .option('-t, --template <template>', 'テンプレート名', 'vite-react')
  .action(main)

program.parse()

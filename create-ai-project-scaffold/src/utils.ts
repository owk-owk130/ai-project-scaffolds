import fs from 'node:fs'
import path from 'node:path'

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun'

export const validateProjectName = (name: string) => {
  if (!name) {
    return 'プロジェクト名が必要です'
  }

  if (!/^[a-z0-9-_]+$/i.test(name)) {
    return 'プロジェクト名は英数字、ハイフン、アンダースコアのみ使用可能です'
  }

  if (name.startsWith('-') || name.startsWith('_')) {
    return 'プロジェクト名はハイフンまたはアンダースコアで始めることはできません'
  }

  return
}

export const isDirectoryEmpty = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    return true
  }

  const files = fs.readdirSync(dirPath)
  return files.length === 0 || files.every((file) => file.startsWith('.'))
}

export const updatePackageJson = (projectPath: string, projectName: string) => {
  const packageJsonPath = path.join(projectPath, 'package.json')

  if (!fs.existsSync(packageJsonPath)) {
    return
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  packageJson.name = projectName
  packageJson.version = '0.0.0'

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

export const removeLockFiles = (projectPath: string) => {
  const lockFiles = ['bun.lockb', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml']

  for (const lockFile of lockFiles) {
    const lockFilePath = path.join(projectPath, lockFile)
    if (fs.existsSync(lockFilePath)) {
      fs.unlinkSync(lockFilePath)
    }
  }
}

import fs from 'node:fs'
import path from 'node:path'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import {
  isDirectoryEmpty,
  removeLockFiles,
  updatePackageJson,
  validateProjectName,
} from '../utils'

vi.mock('node:fs')

describe('validateProjectName', () => {
  test('有効なプロジェクト名の場合undefinedを返すこと', () => {
    expect(validateProjectName('my-project')).toBeUndefined()
    expect(validateProjectName('myProject123')).toBeUndefined()
    expect(validateProjectName('my_project')).toBeUndefined()
  })

  test('空文字の場合エラーメッセージを返すこと', () => {
    expect(validateProjectName('')).toBe('プロジェクト名が必要です')
  })

  test('無効な文字が含まれる場合エラーメッセージを返すこと', () => {
    const expected = 'プロジェクト名は英数字、ハイフン、アンダースコアのみ使用可能です'
    expect(validateProjectName('my@project')).toBe(expected)
    expect(validateProjectName('my project')).toBe(expected)
    expect(validateProjectName('my.project')).toBe(expected)
  })

  test('ハイフンまたはアンダースコアで始まる場合エラーメッセージを返すこと', () => {
    const expected = 'プロジェクト名はハイフンまたはアンダースコアで始めることはできません'
    expect(validateProjectName('-project')).toBe(expected)
    expect(validateProjectName('_project')).toBe(expected)
  })
})

describe('isDirectoryEmpty', () => {
  test('ディレクトリが存在しない場合trueを返すこと', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    expect(isDirectoryEmpty('/nonexistent')).toBe(true)
  })

  test('ディレクトリが空の場合trueを返すこと', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue([])
    expect(isDirectoryEmpty('/empty')).toBe(true)
  })

  test('隠しファイルのみの場合trueを返すこと', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue(['.git', '.gitignore'] as any)
    expect(isDirectoryEmpty('/hidden-only')).toBe(true)
  })

  test('通常ファイルがある場合falseを返すこと', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue(['file.txt', '.git'] as any)
    expect(isDirectoryEmpty('/not-empty')).toBe(false)
  })
})

describe('updatePackageJson', () => {
  test('package.jsonが存在しない場合何もしないこと', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    updatePackageJson('/project', 'new-name')
    expect(fs.readFileSync).not.toHaveBeenCalled()
  })

  test('package.jsonを正しく更新すること', () => {
    const mockPackageJson = {
      name: 'old-name',
      version: '1.0.0',
      dependencies: {},
    }

    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson))

    updatePackageJson('/project', 'new-name')

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join('/project', 'package.json'),
      JSON.stringify(
        {
          name: 'new-name',
          version: '0.0.0',
          dependencies: {},
        },
        null,
        2,
      ),
    )
  })
})

describe('removeLockFiles', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('存在するロックファイルを削除すること', () => {
    vi.mocked(fs.existsSync).mockImplementation((filePath) => {
      return filePath.toString().includes('bun.lockb') || filePath.toString().includes('yarn.lock')
    })

    removeLockFiles('/project')

    expect(fs.unlinkSync).toHaveBeenCalledWith(path.join('/project', 'bun.lockb'))
    expect(fs.unlinkSync).toHaveBeenCalledWith(path.join('/project', 'yarn.lock'))
    expect(fs.unlinkSync).toHaveBeenCalledTimes(2)
  })

  test('存在しないロックファイルは削除しないこと', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)

    removeLockFiles('/project')

    expect(fs.unlinkSync).not.toHaveBeenCalled()
  })
})

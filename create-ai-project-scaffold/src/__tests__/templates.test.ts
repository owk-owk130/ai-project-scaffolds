import { describe, expect, test } from 'vitest'
import { getTemplate, templates } from '../templates'

describe('templates', () => {
  test('3つのテンプレートが定義されていること', () => {
    expect(templates).toHaveLength(3)
  })

  test('各テンプレートが必要なプロパティを持つこと', () => {
    for (const template of templates) {
      expect(template).toHaveProperty('name')
      expect(template).toHaveProperty('label')
      expect(template).toHaveProperty('description')
      expect(template).toHaveProperty('path')
      expect(typeof template.name).toBe('string')
      expect(typeof template.label).toBe('string')
      expect(typeof template.description).toBe('string')
      expect(typeof template.path).toBe('string')
    }
  })

  test('各テンプレート名がユニークであること', () => {
    const names = templates.map((t) => t.name)
    const uniqueNames = [...new Set(names)]
    expect(names).toHaveLength(uniqueNames.length)
  })
})

describe('getTemplate', () => {
  test('存在するテンプレート名で正しいテンプレートを取得できること', () => {
    const template = getTemplate('vite-react')
    expect(template).toBeDefined()
    expect(template?.name).toBe('vite-react')
    expect(template?.label).toBe('React + Vite')
    expect(template?.path).toBe('template-vite-react-typescript')
  })

  test('Astroテンプレートを正しく取得できること', () => {
    const template = getTemplate('astro-react')
    expect(template).toBeDefined()
    expect(template?.name).toBe('astro-react')
    expect(template?.label).toBe('Astro + React')
    expect(template?.path).toBe('template-astro-react-typescript')
  })

  test('Tauriテンプレートを正しく取得できること', () => {
    const template = getTemplate('tauri-react')
    expect(template).toBeDefined()
    expect(template?.name).toBe('tauri-react')
    expect(template?.label).toBe('Tauri + React')
    expect(template?.path).toBe('template-tauri-react-vite')
  })

  test('存在しないテンプレート名でundefinedを返すこと', () => {
    const template = getTemplate('nonexistent')
    expect(template).toBeUndefined()
  })

  test('空文字でundefinedを返すこと', () => {
    const template = getTemplate('')
    expect(template).toBeUndefined()
  })
})

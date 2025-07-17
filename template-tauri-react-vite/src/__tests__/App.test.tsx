import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { App } from '~/App'

// Tauri API をモック化
vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn(),
}))

describe('App', () => {
  test('タイトルが表示されること', () => {
    render(<App />)

    expect(screen.getByText('Tauri + React + Vite')).toBeInTheDocument()
  })

  test('初期カウント値が0で表示されること', () => {
    render(<App />)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('プラスボタンをクリックするとカウントが増加すること', () => {
    render(<App />)

    const incrementButton = screen.getByText('+')
    fireEvent.click(incrementButton)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('マイナスボタンをクリックするとカウントが減少すること', () => {
    render(<App />)

    // まず1つ増やしてから減らす
    const incrementButton = screen.getByText('+')
    fireEvent.click(incrementButton)

    const decrementButton = screen.getByText('-')
    fireEvent.click(decrementButton)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('リセットボタンをクリックするとカウントが0になること', () => {
    render(<App />)

    // カウントを増やす
    const incrementButton = screen.getByText('+')
    fireEvent.click(incrementButton)
    fireEvent.click(incrementButton)

    // リセットする
    const resetButton = screen.getByText('Reset')
    fireEvent.click(resetButton)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('名前入力フィールドが表示されること', () => {
    render(<App />)

    const input = screen.getByPlaceholderText('Enter a name...')
    expect(input).toBeInTheDocument()
  })

  test('Greetボタンが表示されること', () => {
    render(<App />)

    const greetButton = screen.getByText('Greet')
    expect(greetButton).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Counter } from '~/components/Counter'

describe('Counter コンポーネント', () => {
  test('初期値として0が表示されること', () => {
    render(<Counter />)

    expect(screen.getByRole('button')).toHaveTextContent('count is 0')
  })

  test('ボタンをクリックするとカウントが増加すること', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const button = screen.getByRole('button')

    await user.click(button)
    expect(button).toHaveTextContent('count is 1')

    await user.click(button)
    expect(button).toHaveTextContent('count is 2')
  })

  test('HMRのガイダンステキストが表示されること', () => {
    render(<Counter />)

    expect(screen.getByText(/Edit.*Counter\.tsx.*and save to test HMR/)).toBeInTheDocument()
  })
})

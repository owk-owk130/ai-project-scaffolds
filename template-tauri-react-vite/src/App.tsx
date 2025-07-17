import { invoke } from '@tauri-apps/api/core'
import { useState } from 'react'
import { useCounter } from '~/hooks/useCounter'

export const App = () => {
  const [greetMsg, setGreetMsg] = useState('')
  const [name, setName] = useState('')
  const { count, increment, decrement, reset } = useCounter()

  const greet = async () => {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    try {
      setGreetMsg(await invoke('greet', { name }))
    } catch (error) {
      console.error('Error invoking greet command:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-md px-4">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">Tauri + React + Vite</h1>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Counter Example</h2>
          <div className="text-center">
            <p className="mb-4 text-4xl font-bold text-blue-600">{count}</p>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={decrement}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                -
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={increment}
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Tauri Command Example</h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              greet()
            }}
          >
            <div>
              <input
                id="greet-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Enter a name..."
                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Greet
            </button>
          </form>
          {greetMsg && <p className="mt-4 rounded bg-green-100 p-3 text-green-800">{greetMsg}</p>}
        </div>
      </div>
    </div>
  )
}

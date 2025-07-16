import { useCounter } from '~/hooks/useCounter'

export const Counter = () => {
  const { count, increment } = useCounter()

  return (
    <div className="p-8">
      <button
        type="button"
        className="rounded-lg border border-transparent px-5 py-3 text-base font-medium bg-gray-800 text-white cursor-pointer transition-colors duration-300 hover:border-blue-500 focus:outline-4 focus:outline-blue-500 dark:bg-gray-100 dark:text-gray-900"
        onClick={increment}
      >
        count is {count}
      </button>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Edit{' '}
        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          src/components/Counter.tsx
        </code>{' '}
        and save to test HMR
      </p>
    </div>
  )
}

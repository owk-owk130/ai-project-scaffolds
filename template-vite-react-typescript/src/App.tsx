import { useCounter } from "~/hooks/useCounter";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";

function App() {
  const { count, increment } = useCounter();

  return (
    <>
      <div className="flex justify-center items-center gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img
            src={viteLogo}
            className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] will-change-[filter]"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img
            src={reactLogo}
            className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] will-change-[filter] motion-safe:animate-spin motion-safe:[animation-duration:20s]"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-5xl leading-tight mb-8">Vite + React</h1>
      <div className="p-8">
        <button
          type="button"
          className="rounded-lg border border-transparent px-5 py-3 text-base font-medium bg-gray-800 cursor-pointer transition-colors duration-300 hover:border-blue-500 focus:outline-4 focus:outline-blue-500 dark:bg-gray-100 dark:text-gray-900"
          onClick={increment}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-500">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;

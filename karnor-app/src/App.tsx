import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Samuel is bejs {count}
        </button>
        <p className='text-4xl text-orange-600'>
          Måste nu fixa REST XD 
        </p>
        <h4 className="text-3xl font-bold text-blue-600">
        Welcome to my Tailwind + Vite + React app!
      </h4>
      </div>
    </>
  )
}

export default App

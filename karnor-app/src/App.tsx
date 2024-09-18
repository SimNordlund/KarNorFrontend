import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>(''); // State to hold the message from the Spring Boot API

  useEffect(() => {
    // Fetch data from the Spring Boot API
    const fetchMessage = async () => {
      try {
        const response = await fetch('http://localhost:8080/test');
        const data = await response.text(); // Since the endpoint returns plain text
        setMessage(data); // Update the state with the message
      } catch (error) {
        console.error('Error fetching the message:', error);
      }
    };

    fetchMessage(); // Call the function when the component mounts
  }, []); // Empty dependency array to run the effect only once (on mount)

  return (
    <>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          Samuel is bejs {count}
        </button>
        <p className='text-4xl text-orange-600'>
          Is this bejslife 
        </p>
        <h1 className="text-3xl font-bold text-green-600 mt-4">
          {message ? message : 'Loading...'}
        </h1>
      </div>
    </>
  )
}

export default App;

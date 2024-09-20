import { useState, useEffect } from 'react';
import './index.css';

function App() {
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

    fetchMessage(); 
  }, []);

  return (
    <>
      <div>
        <h1 className="text-1xl font-bold text-indigo-600 mt-4">
          {message ? message : 'Loading...'}
        </h1>
      </div>
    </>
  );
}

export default App;

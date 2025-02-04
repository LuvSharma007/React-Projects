import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Counter App</h1>
      <button className="text-3xl font-semibold py-2 px-4 bg-white shadow-md rounded-lg mb-4">
        {count}
      </button>
      <div className="flex gap-4">
        
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => setCount((prev) => prev - 1)}
        >
          -
        </button>
        <button 
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>

      </div>
    </div>
  );
};

export default App;

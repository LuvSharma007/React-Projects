import React, { useState, useCallback } from "react";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback(() => {
    if (input.trim() === "") {
      alert("Add something!");
      return;
    }
    setTodos((prev) => [...prev, input]); 
    setInput(""); 
  }, [input]);

  const handleDelete = useCallback((index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }, []);

  const handleEdit = useCallback(() => {
    alert("Functionality not available now!");
  }, []);

  return (
    <div className="p-6 flex flex-col items-center"> 
      <h1 className="text-6xl text-center mb-4">TODO</h1>
      
      <div className="flex gap-2 mb-4"> 
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Enter Todos..."
          className="border-2 border-black p-2 rounded"
        />
        <button
          onClick={handleAddTodo}
          className="cursor-pointer px-4 py-2 border-2 rounded bg-blue-500 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="mt-4 list-disc pl-5 w-full max-w-md"> 
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No todos yet!</p>
        ) : (
          todos.map((todo, index) => (
            <li key={index} className="text-xl flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
              {todo}
              <div>
                <button
                  onClick={() => handleDelete(index)}
                  className="cursor-pointer px-3 py-1 border-2 rounded bg-red-500 text-white hover:bg-red-700 ml-2"
                >
                  Delete
                </button>
                <button
                  onClick={handleEdit}
                  className="cursor-pointer px-3 py-1 border-2 rounded bg-green-500 text-white hover:bg-green-700 ml-2"
                >
                  Edit
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Todo;

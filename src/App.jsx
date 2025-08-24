import { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border rounded-l-xl px-3 py-2 focus:outline-none"
            placeholder="Enter a task..."
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((t, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-2 rounded shadow"
            >
              <span
                onClick={() => toggleTask(index)}
                className={`cursor-pointer ${t.done ? "line-through text-gray-500" : ""}`}
              >
                {t.text}
              </span>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

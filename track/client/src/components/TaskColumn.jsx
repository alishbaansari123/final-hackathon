import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const TaskColumn = ({ status }) => {
  const { tasks, setTasks } = useTasks();
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [file, setFile] = useState(null);

  const addTask = () => {
    if (!title || !assignedTo) {
      alert("Please fill all fields!");
      return;
    }

    const newTask = {
      id: Date.now(), 
      title,
      assignedTo,
      status: "To Do",
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setAssignedTo("");
    setFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAssignedTo(file.name);
      setFile(file);
    }
  };

  return (
    <div className="flex-1 bg-gray-100 rounded-lg p-6 shadow-lg flex flex-col justify-between">
      <h2 className="text-2xl font-bold mb-6 text-center">{status}</h2>

      {/* TASKS pehle render hongay */}
      <div className="flex flex-col gap-4 mb-6">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </div>

      {/* Uske baad form */}
      {status === "To Do" && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-auto">
          <h3 className="text-lg font-semibold mb-4 text-center">Add New Task</h3>

          <input
            type="text"
            placeholder="Task Title"
            className="w-full px-4 py-2 border rounded-lg mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="file"
            className="w-full px-4 py-2 border rounded-lg mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleFileChange}
          />

          {assignedTo && (
            <p className="text-sm text-gray-600 mb-2">Selected: <strong>{assignedTo}</strong></p>
          )}

          <button
            onClick={addTask}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskColumn;

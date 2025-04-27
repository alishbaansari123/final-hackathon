import React from "react";
import { useTasks } from "../context/TaskContext";

const TaskCard = ({ task }) => {
  const { tasks, setTasks } = useTasks();

  const moveTask = (direction) => {
    const statuses = ["To Do", "In Progress", "Done"];
    const currentIndex = statuses.indexOf(task.status);

    let newIndex = currentIndex;
    if (direction === "forward" && currentIndex < statuses.length - 1) {
      newIndex++;
    } else if (direction === "backward" && currentIndex > 0) {
      newIndex--;
    }

    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: statuses[newIndex] } : t
    );

    setTasks(updatedTasks);
  };

  const deleteTask = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      const updatedTasks = tasks.filter((t) => t.id !== task.id);
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="bg-blue-100 p-3 rounded-md mb-3 shadow-sm flex flex-col">
      <p className="font-bold">{task.title}</p>
      <p className="text-sm text-gray-700 mb-2">Assigned: {task.assignedTo}</p>

      <div className="flex justify-between mb-2">
        <button
          onClick={() => moveTask("backward")}
          className="bg-gray-300 hover:bg-gray-400 text-xs px-2 py-1 rounded"
        >
          ◀ Back
        </button>
        <button
          onClick={() => moveTask("forward")}
          className="bg-green-400 hover:bg-green-500 text-xs px-2 py-1 rounded"
        >
          Next ▶
        </button>
      </div>

      {/* Delete button */}
      <button
        onClick={deleteTask}
        className="bg-red-400 hover:bg-red-500 text-xs px-2 py-1 rounded"
      >
        🗑️ Delete
      </button>
    </div>
  );
};

export default TaskCard;

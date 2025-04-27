import React from "react";
import TaskColumn from "./TaskColumn";

const TaskBoard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Task Tracking App</h1>
      <div className="flex justify-between gap-6">
        <TaskColumn status="To Do" />
        <TaskColumn status="In Progress" />
        <TaskColumn status="Done" />
      </div>
    </div>
  );
};

export default TaskBoard;

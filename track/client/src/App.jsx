// import React from 'react';
// import { TaskProvider } from './context/TaskContext';
// import TaskBoard from './components/TaskBoard'; // <- import TaskBoard

// function App() {
//   return (
//     <TaskProvider>
//       <TaskBoard />
//     </TaskProvider>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TaskBoard from './components/TaskBoard'; // tumhara tracking system
import Auth from './Pages/Auth'; // <-- sirf ek file Auth.jsx

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/auth" element={<Auth setToken={setToken} />} />
          <Route
            path="/dashboard"
            element={token ? <TaskBoard /> : <Navigate to="/auth" />}
          />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;


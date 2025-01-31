import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './context/ProtectedRoute';

import Layout from './components/Layout'
import Home from './pages/Home';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Workers  from './pages/ Workers';
import WorkerTasks from './pages/ WorkerTasks';
import Tasks from './pages/Tasks';
import Register from './pages/Register';
import Farms from './pages/Farms';

 

function App() {
  return (
    <BrowserRouter>  {/* Wrap the entire app with BrowserRouter */}
     <UserProvider>
        
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="workers" element={<ProtectedRoute><Workers /></ProtectedRoute>} />
              <Route path="workerTasks" element={<ProtectedRoute><WorkerTasks /></ProtectedRoute>} />
              <Route path="farms" element={<ProtectedRoute><Farms /></ProtectedRoute>} />
              <Route path="tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />

              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
       
          </UserProvider>
    </BrowserRouter>
  );
}

export default App;

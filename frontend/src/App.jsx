import React from 'react';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';
import { ToastContainer } from 'react-toastify';


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
    <BrowserRouter>
      <AuthProvider>
      <FarmProvider>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/*
              Only show these pages if the user is authenticated (has an authToken)
            */}
            <Route path="workers" element={<Workers />} />
            <Route path="workersTasks" element={<WorkerTasks />} />
            <Route path="farms" element={<Farms />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
        </FarmProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
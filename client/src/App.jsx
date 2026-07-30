import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateJob from './pages/CreateJob';
import EditJob from './pages/EditJob';
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import NotFound from './pages/NotFound';

const App = () => {
  return (

    <Routes>

      <Route path='/' element={<Navigate to='/login' replace />} />

      <Route path = '/login' element = {<Login />}/>

      <Route path = '/register' element = {<Register />} />

      <Route 
      path = '/dashboard' 
      element = {
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } 
      />

      <Route path = '/create-job' element = {<CreateJob />} />

      <Route path = '/edit-job/:id' element = {<EditJob />} />

      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}

export default App

import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Planner } from '../pages/Planner'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { ProtectedRoute } from '../components/layout/ProtectedRoute'

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/planner',
    element: (
      <ProtectedRoute>
        <Planner />
      </ProtectedRoute>
    ),
  },
])

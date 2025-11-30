import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './hooks/useAuth'
import { FitnessProvider } from './context/FitnessContext'
import { HairCareProvider } from './context/HairCareContext'

export default function App() {
  return (
    <AuthProvider>
      <FitnessProvider>
        <HairCareProvider>
          <RouterProvider router={router} />
        </HairCareProvider>
      </FitnessProvider>
    </AuthProvider>
  )
}

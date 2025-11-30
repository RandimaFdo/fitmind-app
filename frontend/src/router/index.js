import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Planner } from '../pages/Planner';
import { Profile } from '../pages/Profile';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { FitnessPage } from '../pages/FitnessPage';
import { GymDetails } from '../pages/GymDetails';
import { ErrorPage } from '../pages/ErrorPage';
import { HairCarePage } from '../pages/HairCarePage';
import { SalonDetails } from '../pages/SalonDetails';
import { BarberProfile } from '../pages/BarberProfile';
import { AIHairTryOn } from '../pages/AIHairTryOn';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { AppLayout } from '../components/layout/AppLayout';
export const router = createBrowserRouter([
    { path: '/login', element: _jsx(Login, {}), errorElement: _jsx(ErrorPage, {}) },
    { path: '/register', element: _jsx(Register, {}), errorElement: _jsx(ErrorPage, {}) },
    {
        path: '/',
        element: (_jsx(ProtectedRoute, { children: _jsx(AppLayout, {}) })),
        errorElement: _jsx(ErrorPage, {}),
        children: [
            { index: true, element: _jsx(Dashboard, {}) },
            { path: 'planner', element: _jsx(Planner, {}) },
            { path: 'profile', element: _jsx(Profile, {}) },
            { path: 'fitness', element: _jsx(FitnessPage, {}) },
            { path: 'fitness/gyms/:gymId', element: _jsx(GymDetails, {}) },
            { path: 'hair-care', element: _jsx(HairCarePage, {}) },
            { path: 'hair-care/salons/:salonId', element: _jsx(SalonDetails, {}) },
            { path: 'hair-care/barbers/:barberId', element: _jsx(BarberProfile, {}) },
            { path: 'hair-care/ai-try-on', element: _jsx(AIHairTryOn, {}) },
        ],
    },
    { path: '*', element: _jsx(ErrorPage, {}) },
]);

import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboardlayout';

import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import NotFound from './pages/notfound';

import Profile from './pages/profile';
import Students from './pages/students';
import Companies from './pages/companies';
import Jobs from './pages/jobs';
import Applications from './pages/applications';
import AiInsights from './pages/aiinsights';

import ProtectedRoute from './routes/protectedroute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/students" element={<Students />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/ai-insights" element={<AiInsights />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
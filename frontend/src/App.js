import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import ProtectedRoute from './routes/protectedroute';
import DashboardLayout from './layouts/dashboardlayout';

import Login from './pages/login';
import Register from './pages/register';
import NotFound from './pages/notfound';

import RoleDashboard from './pages/roledashboard';
import Profile from './pages/profile';
import Students from './pages/students';
import Companies from './pages/companies';
import Jobs from './pages/jobs';
import Applications from './pages/applications';
import Reports from './pages/reports';
import AiInsights from './pages/aiinsights';
import Chat from './pages/chat';
import Shortlisted from './pages/shortlisted';
import Interviews from './pages/interviews';
import CampusDrives from './pages/campusdrives';

import AdminOverview from './pages/adminoverview';
import AdminUsers from './pages/adminusers';
import AdminSettings from './pages/adminsettings';
import DataCleanup from './pages/datacleanup';
import AdminRecruiters from './pages/adminrecruiters';

import { getDashboardPath, getUser } from './utils/auth';

function DashboardRedirect() {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDashboardPath(user.role)} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/student/login" element={<Login />} />
      <Route path="/recruiter/login" element={<Login />} />
      <Route path="/tpo/login" element={<Login />} />
      <Route path="/admin/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/student/register" element={<Register forcedRole="student" />} />
      <Route path="/recruiter/register" element={<Register forcedRole="recruiter" />} />
      <Route path="/tpo/register" element={<Register forcedRole="tpo" />} />
      <Route path="/admin/register" element={<Register forcedRole="admin" />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardRedirect />} />

        <Route path="/student/dashboard" element={<RoleDashboard role="student" />} />
        <Route path="/recruiter/dashboard" element={<RoleDashboard role="recruiter"/>} />
        <Route path="/tpo/dashboard" element={<RoleDashboard role="tpo"/>} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/student/profile" element={<Profile />} />

        <Route path="/students" element={<Students />} />
        <Route path="/candidates" element={<Students />} />

        <Route path="/companies" element={<Companies />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/applications" element={<Applications />} />

        <Route path="/shortlisted" element={<Shortlisted />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/drives" element={<CampusDrives />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/ai-insights" element={<AiInsights />} />
        <Route path="/chat" element={<Chat />} />

        <Route path="/admin/dashboard" element={<AdminOverview />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/recruiters" element={<AdminRecruiters />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/cleanup" element={<DataCleanup />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
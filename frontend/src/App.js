import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboardlayout';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import NotFound from './pages/notfound';
import Register from './pages/register';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
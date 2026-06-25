import { Bell, LogOut, Search, UserCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';

const pageTitles = {
  '/student/dashboard': 'Dashboard',
  '/student/profile': 'Student Profile',
  '/recruiter/dashboard': 'Recruiter Dashboard',
  '/tpo/dashboard': 'TPO Dashboard',
  '/admin/dashboard': 'Admin Dashboard',
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Placement Management System</p>
        <h1>{title}</h1>
      </div>

      <div className="navbarActions">
        <label className="searchBox">
          <Search size={18} />
          <input placeholder="Search" />
        </label>

        <button className="iconButton" type="button" aria-label="Notifications">
          <Bell size={20} />
        </button>

        <button className="profileButton" type="button">
          <UserCircle size={22} />
          <span>{user?.name || 'Account'}</span>
        </button>

        <button className="iconButton" type="button" aria-label="Logout" onClick={handleLogout}>
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
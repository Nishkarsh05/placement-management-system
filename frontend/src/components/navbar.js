import { Bell, LogOut, Search, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Placement Management System</p>
        <h1>Dashboard</h1>
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
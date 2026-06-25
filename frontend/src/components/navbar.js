import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/profile': 'Profile',
  '/student/profile': 'Profile',
  '/students': 'Students',
  '/companies': 'Companies',
  '/jobs': 'Jobs',
  '/applications': 'Applications',
  '/ai-insights': 'AI Insights',
  '/reports': 'Reports',
  '/chat': 'Chat',
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [search, setSearch] = useState('');

  const currentTitle = pageTitles[location.pathname] || 'Placement Portal';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (event) => {
    if (event.key !== 'Enter') return;

    const value = search.toLowerCase().trim();

    if (value.includes('student')) {
      navigate('/students');
    } else if (value.includes('company')) {
      navigate('/companies');
    } else if (value.includes('job')) {
      navigate('/jobs');
    } else if (value.includes('application')) {
      navigate('/applications');
    } else if (value.includes('report')) {
      navigate('/reports');
    } else if (value.includes('ai')) {
      navigate('/ai-insights');
    } else if (value.includes('chat')) {
      navigate('/chat');
    } else if (value.includes('profile')) {
      navigate('/profile');
    } else if (value.includes('dashboard')) {
      navigate('/dashboard');
    }
  };

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Placement Management System</p>
        <h2>{currentTitle}</h2>
      </div>

      <div className="topbarActions">
        <div className="searchBox">
          <span>⌕</span>
          <input
            placeholder="Search pages"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <button
          className="iconButton"
          type="button"
          title="AI Insights"
          onClick={() => navigate('/ai-insights')}
        >
          ✦
        </button>

        <button
          className="userChip"
          type="button"
          onClick={() => navigate('/profile')}
        >
          <span>◎</span>
          {user?.name || 'Account'}
        </button>

        <button
          className="iconButton"
          type="button"
          title="Logout"
          onClick={handleLogout}
        >
          ↪
        </button>
      </div>
    </header>
  );
}

export default Navbar;
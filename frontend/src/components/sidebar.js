import { NavLink } from 'react-router-dom';
import { getUser } from '../utils/auth';

const menuByRole = {
  student: [
    { label: 'Dashboard', path: '/student/dashboard', icon: '■' },
    { label: 'Profile', path: '/profile', icon: '●' },
    { label: 'Jobs', path: '/jobs', icon: '▤' },
    { label: 'Applications', path: '/applications', icon: '▧' },
    { label: 'AI Coach', path: '/ai-insights', icon: '✦' },
    { label: 'Chat', path: '/chat', icon: '✉' },
  ],

  recruiter: [
    { label: 'Dashboard', path: '/recruiter/dashboard', icon: '■' },
    { label: 'My Company', path: '/companies', icon: '▣' },
    { label: 'Post Jobs', path: '/jobs', icon: '▤' },
    { label: 'Candidates', path: '/candidates', icon: '●' },
    { label: 'Shortlisted', path: '/shortlisted', icon: '✓' },
    { label: 'Interviews', path: '/interviews', icon: '◷' },
    { label: 'Applications', path: '/applications', icon: '▧' },
    { label: 'AI Assistant', path: '/ai-insights', icon: '✦' },
    { label: 'Chat', path: '/chat', icon: '✉' },
  ],

  tpo: [
    { label: 'Dashboard', path: '/tpo/dashboard', icon: '■' },
    { label: 'Students', path: '/students', icon: '●' },
    { label: 'Companies', path: '/companies', icon: '▣' },
    { label: 'Jobs', path: '/jobs', icon: '▤' },
    { label: 'Applications', path: '/applications', icon: '▧' },
    { label: 'Interviews', path: '/interviews', icon: '◷' },
    { label: 'Campus Drives', path: '/drives', icon: '▥' },
    { label: 'Reports', path: '/reports', icon: '▥' },
    { label: 'Chat', path: '/chat', icon: '✉' },
  ],

  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '■' },
    { label: 'Users', path: '/admin/users', icon: '●' },
    { label: 'Recruiters', path: '/admin/recruiters', icon: '□' },
    { label: 'Candidate Log', path: '/students', icon: '●' },
    { label: 'Company Log', path: '/companies', icon: '▣' },
    { label: 'Placement Log', path: '/applications', icon: '▧' },
    { label: 'Reports', path: '/reports', icon: '▥' },
    { label: 'Settings', path: '/admin/settings', icon: '⚙' },
    { label: 'Data Cleanup', path: '/admin/cleanup', icon: '⌫' },
  ],
};

function Sidebar() {
  const user = getUser() || { role: 'student', name: 'Account' };
  const role = String(user.role || 'student').toLowerCase();
  const menu = menuByRole[role] || menuByRole.student;

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandMark">P</div>
        <div>
          <h2>PlaceTrack</h2>
          <p>{role} portal</p>
        </div>
      </div>

      <nav className="sideNav">
        {menu.map((item) => (
          <NavLink key={item.label} to={item.path} className="sideLink">
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="signedCard">
        <span>Signed in as</span>
        <strong>{user.name || 'Account'}</strong>
        <small>{role.toUpperCase()}</small>
      </div>
    </aside>
  );
}

export default Sidebar;
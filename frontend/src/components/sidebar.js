import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/dashboard', icon: '▦', label: 'Dashboard' },
  { path: '/profile', icon: '◎', label: 'Profile' },
  { path: '/students', icon: '♙', label: 'Students' },
  { path: '/companies', icon: '▣', label: 'Companies' },
  { path: '/jobs', icon: '▤', label: 'Jobs' },
  { path: '/applications', icon: '▧', label: 'Applications' },
  { path: '/ai-insights', icon: '✦', label: 'AI Insights' },
  { path: '/reports', icon: '▥', label: 'Reports' },
  { path: '/chat', icon: '✉', label: 'Chat' },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandLogo">P</div>
        <div>
          <h1>Placement</h1>
          <p>Campus portal</p>
        </div>
      </div>

      <nav className="sideNav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'sideLink activeSideLink' : 'sideLink'
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
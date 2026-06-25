import {
  BriefcaseBusiness,
  Building2,
  ChartColumn,
  FileText,
  LayoutDashboard,
  UserCircle,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/student/profile', label: 'Profile', icon: UserCircle },
  { to: '/students', label: 'Students', icon: Users },
  { to: '/companies', label: 'Companies', icon: Building2 },
  { to: '/jobs', label: 'Jobs', icon: BriefcaseBusiness },
  { to: '/applications', label: 'Applications', icon: FileText },
  { to: '/reports', label: 'Reports', icon: ChartColumn },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brandMark">P</span>
        <div>
          <strong>Placement</strong>
          <small>Campus portal</small>
        </div>
      </div>

      <nav className="navList" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink className="navItem" to={item.to} key={item.to}>
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
import { Bell, Search, UserCircle } from 'lucide-react';

function Navbar() {
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
          <span>Account</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;

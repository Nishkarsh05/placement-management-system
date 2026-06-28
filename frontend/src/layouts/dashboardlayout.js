import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

function DashboardLayout() {
  return (
    <div className="appShell">
      <Sidebar />

      <main className="mainArea">
        <Navbar />

        <div className="contentArea">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
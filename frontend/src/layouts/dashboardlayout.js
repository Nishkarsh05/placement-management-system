import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

function DashboardLayout() {
  return (
    <div className="appShell">
      <Sidebar />
      <main className="mainPanel">
        <Navbar />
        <section className="pageContent">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;
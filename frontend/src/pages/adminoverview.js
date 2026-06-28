import { Link } from 'react-router-dom';

function getLocalArray(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch (error) {
    return fallback;
  }
}

function AdminOverview() {
  const users = getLocalArray('adminUsers', [
    { id: 'u1', name: 'Student Demo', email: 'student@test.com', role: 'student', status: 'active' },
    { id: 'u2', name: 'Recruiter Demo', email: 'recruiter@test.com', role: 'recruiter', status: 'active' },
    { id: 'u3', name: 'TPO Demo', email: 'tpo@test.com', role: 'tpo', status: 'active' },
  ]);

  const companies = getLocalArray('adminCompanies', [
    { id: 'c1', name: 'TCS', status: 'verified' },
    { id: 'c2', name: 'Infosys', status: 'verified' },
    { id: 'c3', name: 'Amazon', status: 'pending' },
  ]);

  const applications = getLocalArray('studentApplications', []);
  const interviews = getLocalArray('interviews', []);

  const pendingRecruiters = users.filter((user) => user.role === 'recruiter' && user.status === 'pending').length;
  const inactiveUsers = users.filter((user) => user.status === 'inactive').length;

  return (
    <div className="pageStack">
      <section className="adminCommandHero">
        <div>
          <p className="eyebrow">Admin Control Center</p>
          <h1>System Overview</h1>
          <p>Manage platform users, permissions, placement data, and system settings from one workspace.</p>
        </div>
        <div className="adminHeroActions">
          <Link className="primaryButton" to="/admin/users">Manage Users</Link>
          <Link className="secondaryButton" to="/admin/settings">System Settings</Link>
        </div>
      </section>

      <section className="adminStatsGrid">
        <div className="metricCard"><p>Total Users</p><h2>{users.length}</h2><span>Students, recruiters, TPOs, admins</span></div>
        <div className="metricCard"><p>Companies</p><h2>{companies.length}</h2><span>Recruiting partners</span></div>
        <div className="metricCard"><p>Applications</p><h2>{applications.length}</h2><span>Student job requests</span></div>
        <div className="metricCard"><p>Interviews</p><h2>{interviews.length}</h2><span>Scheduled rounds</span></div>
      </section>

      <section className="dashboardSplit">
        <div className="dataCard">
          <div className="sectionHeader">
            <div><p className="eyebrow">Action Needed</p><h2>Admin Tasks</h2></div>
          </div>
          <div className="taskList">
            <Link to="/admin/users">Review {pendingRecruiters} pending recruiter accounts</Link>
            <Link to="/admin/users">Check {inactiveUsers} inactive or blocked users</Link>
            <Link to="/admin/settings">Update placement season and active batch</Link>
            <Link to="/admin/cleanup">Remove duplicate/demo records before final presentation</Link>
          </div>
        </div>

        <div className="dataCard">
          <div className="sectionHeader">
            <div><p className="eyebrow">Platform Health</p><h2>System Status</h2></div>
          </div>
          <div className="healthList">
            <div><span className="statusDot green" /> Authentication active</div>
            <div><span className="statusDot green" /> Role based dashboards enabled</div>
            <div><span className="statusDot amber" /> Demo fallback data available</div>
            <div><span className="statusDot green" /> Admin controls enabled</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminOverview;
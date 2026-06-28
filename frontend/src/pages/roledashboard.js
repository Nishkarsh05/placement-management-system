import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';

const recruiterPipeline = [
  { label: 'New Applications', count: 18, path: '/applications', color: 'blue', text: 'Review students who recently applied.' },
  { label: 'Candidates', count: 11, path: '/candidates', color: 'gray', text: 'Open student profiles and resumes.' },
  { label: 'Shortlisted', count: 7, path: '/shortlisted', color: 'green', text: 'Continue with interview-ready candidates.' },
  { label: 'Interviews', count: 4, path: '/interviews', color: 'orange', text: 'Track interview-stage applications.' },
  { label: 'Selected', count: 3, path: '/applications', color: 'green', text: 'Final selected candidates.' },
  { label: 'Messages', count: 6, path: '/chat', color: 'blue', text: 'Reply to student questions.' },
];

const tpoCards = [
  { label: 'Students', count: 320, path: '/students', color: 'blue', text: 'Monitor eligible student records.' },
  { label: 'Companies', count: 42, path: '/companies', color: 'green', text: 'View recruiting partners.' },
  { label: 'Jobs', count: 18, path: '/jobs', color: 'orange', text: 'Review open job postings.' },
  { label: 'Applications', count: 240, path: '/applications', color: 'blue', text: 'Track student application flow.' },
  { label: 'Interviews', count: 12, path: '/interviews', color: 'gray', text: 'Monitor interview schedules.' },
  { label: 'Drives', count: 6, path: '/drives', color: 'green', text: 'Coordinate campus drives.' },
];

const tpoAlerts = [
  { title: 'Infosys drive needs lab confirmation', path: '/drives' },
  { title: '12 students missing resume links', path: '/students' },
  { title: 'Amazon interview schedule pending', path: '/interviews' },
  { title: 'CSE placement report ready for review', path: '/reports' },
];

const placementProgress = [
  { department: 'CSE', eligible: 120, placed: 58, percentage: 48 },
  { department: 'IT', eligible: 84, placed: 41, percentage: 49 },
  { department: 'ECE', eligible: 62, placed: 20, percentage: 32 },
  { department: 'ME', eligible: 54, placed: 7, percentage: 13 },
];

const fallbackDashboards = {
  student: {
    title: 'Student Dashboard',
    subtitle: 'Track applications, jobs, profile readiness, and interviews.',
    cards: [
      { label: 'Recommended Jobs', value: '12', path: '/jobs' },
      { label: 'Applications', value: '4', path: '/applications' },
      { label: 'Profile', value: '78%', path: '/profile' },
      { label: 'Chat', value: '2', path: '/chat' },
    ],
  },
  admin: {
    title: 'Admin Dashboard',
    subtitle: 'Manage users, companies, jobs, applications, and reports.',
    cards: [
      { label: 'Students', value: '320', path: '/students' },
      { label: 'Companies', value: '42', path: '/companies' },
      { label: 'Applications', value: '240', path: '/applications' },
      { label: 'Reports', value: 'Open', path: '/reports' },
    ],
  },
};

function SimpleDashboard({ data, role }) {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">{role} workspace</p>
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </section>

      <section className="metricGrid">
        {data.cards.map((card) => (
          <Link className="metricCard clickableCard" to={card.path} key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <p>Open {card.label.toLowerCase()}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

function RecruiterDashboard() {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">Recruiter workspace</p>
        <div className="pageHeroRow">
          <div>
            <h2>Recruiter Dashboard</h2>
            <p>Review candidates, manage jobs, update application decisions, and message students.</p>
          </div>

          <div className="heroButtonGroup">
            <Link className="primaryButton" to="/candidates">Review Candidates</Link>
            <Link className="secondaryButton" to="/jobs">Post Job</Link>
          </div>
        </div>
      </section>

      <section className="pipelineBoard">
        {recruiterPipeline.map((item) => (
          <Link className={`pipelineCard ${item.color}`} to={item.path} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.count}</strong>
            <p>{item.text}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

function TpoDashboard() {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">Training and placement office</p>
        <div className="pageHeroRow">
          <div>
            <h2>TPO Dashboard</h2>
            <p>Coordinate campus drives, monitor placements, and track students, companies, applications, and interviews.</p>
          </div>

          <div className="heroButtonGroup">
            <Link className="primaryButton" to="/drives">Manage Drives</Link>
            <Link className="secondaryButton" to="/reports">View Reports</Link>
          </div>
        </div>
      </section>

      <section className="pipelineBoard">
        {tpoCards.map((item) => (
          <Link className={`pipelineCard ${item.color}`} to={item.path} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.count}</strong>
            <p>{item.text}</p>
          </Link>
        ))}
      </section>

      <section className="dashboardSplit">
        <div className="surface">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Coordination</p>
              <h3>Pending TPO Actions</h3>
            </div>
          </div>

          <div className="quickActions">
            {tpoAlerts.map((alert) => (
              <Link to={alert.path} key={alert.title}>{alert.title}</Link>
            ))}
          </div>
        </div>

        <div className="surface">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Department progress</p>
              <h3>Placement Progress</h3>
            </div>
          </div>

          <div className="barList">
            {placementProgress.map((item) => (
              <div className="barRow" key={item.department}>
                <span>{item.department}</span>
                <div className="barTrack">
                  <div className="barFill" style={{ width: `${item.percentage}%` }} />
                </div>
                <strong>{item.placed}/{item.eligible}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function RoleDashboard() {
  const user = getUser() || {};
  const role = String(user.role || 'student').toLowerCase();

  if (role === 'recruiter') return <RecruiterDashboard />;
  if (role === 'tpo') return <TpoDashboard />;

  const data = fallbackDashboards[role] || fallbackDashboards.student;
  return <SimpleDashboard data={data} role={role} />;
}

export default RoleDashboard;
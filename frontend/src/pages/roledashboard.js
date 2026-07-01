import { Link } from 'react-router-dom';
import { getUser } from '../utils/auth';

const dashboardData = {
  student: {
    eyebrow: 'Student Workspace',
    title: 'Student Dashboard',
    subtitle: 'Track applications, recommended jobs, profile readiness, and placement updates.',
    stats: [
      { label: 'Recommended Jobs', value: '12', note: 'Open roles matching your profile', path: '/jobs' },
      { label: 'Applications', value: '4', note: 'Requests submitted', path: '/applications' },
      { label: 'Profile Score', value: '78%', note: 'Resume and skills readiness', path: '/profile' },
      { label: 'Messages', value: '2', note: 'Recruiter conversations', path: '/chat' },
    ],
    primaryTitle: 'Next Best Actions',
    actions: [
      { title: 'Complete your profile', text: 'Add resume, skills, GitHub, LinkedIn, CGPA, and certifications.', path: '/profile' },
      { title: 'Apply to recommended jobs', text: 'Check roles that match your branch, CGPA, and skills.', path: '/jobs' },
      { title: 'Review application status', text: 'See whether you are applied, shortlisted, interviewed, or selected.', path: '/applications' },
    ],
    sideTitle: 'Placement Readiness',
    sideItems: ['Resume uploaded', 'Skills added', 'CGPA verified', 'Applications active'],
  },

  recruiter: {
    eyebrow: 'Recruiter Workspace',
    title: 'Recruiter Dashboard',
    subtitle: 'Manage candidates, posted jobs, interview rounds, and hiring decisions.',
    stats: [
      { label: 'Open Jobs', value: '5', note: 'Currently accepting applications', path: '/jobs' },
      { label: 'New Candidates', value: '18', note: 'Waiting for review', path: '/students' },
      { label: 'Shortlisted', value: '7', note: 'Ready for interview', path: '/shortlisted' },
      { label: 'Selected', value: '3', note: 'Final hiring decisions', path: '/applications' },
    ],
    primaryTitle: 'Recruiter Priority Work',
    actions: [
      { title: 'Review new candidates', text: 'Open the candidate list and inspect student profiles.', path: '/students' },
      { title: 'Schedule interviews', text: 'Create interview rounds for shortlisted students.', path: '/interviews' },
      { title: 'Update application decisions', text: 'Move students from applied to shortlisted, selected, or rejected.', path: '/applications' },
    ],
    sideTitle: 'Hiring Pipeline',
    sideItems: ['New applications', 'Profile review', 'Shortlist', 'Interview', 'Final decision'],
  },

  tpo: {
    eyebrow: 'TPO Workspace',
    title: 'TPO Dashboard',
    subtitle: 'Monitor campus drives, students, recruiters, interviews, and placement analytics.',
    stats: [
      { label: 'Students', value: '320', note: 'Registered candidates', path: '/students' },
      { label: 'Companies', value: '42', note: 'Recruiting partners', path: '/companies' },
      { label: 'Interviews', value: '38', note: 'Scheduled rounds', path: '/interviews' },
      { label: 'Placement Rate', value: '68%', note: 'Current batch', path: '/reports' },
    ],
    primaryTitle: 'TPO Coordination',
    actions: [
      { title: 'Monitor student records', text: 'Check readiness, branch data, CGPA, and application activity.', path: '/students' },
      { title: 'Track company drives', text: 'Review recruiting partners and active campus drives.', path: '/companies' },
      { title: 'Analyze reports', text: 'View placement rate, department performance, and package summary.', path: '/reports' },
    ],
    sideTitle: "Today's Checklist",
    sideItems: ['Verify interview schedule', 'Check pending applications', 'Update placement report', 'Coordinate with recruiters'],
  },

  admin: {
    eyebrow: 'Admin Workspace',
    title: 'Admin Dashboard',
    subtitle: 'Manage users, recruiter access, records, reports, settings, and system cleanup.',
    stats: [
      { label: 'Users', value: '410', note: 'Total accounts', path: '/admin/users' },
      { label: 'Recruiters', value: '42', note: 'Company users', path: '/admin/recruiters' },
      { label: 'Records', value: '586', note: 'Placement records', path: '/applications' },
      { label: 'Reports', value: '12', note: 'Analytics sections', path: '/reports' },
    ],
    primaryTitle: 'Admin Controls',
    actions: [
      { title: 'Manage user access', text: 'Approve, deactivate, or update student and recruiter accounts.', path: '/admin/users' },
      { title: 'Review recruiter accounts', text: 'Check recruiter status and company ownership.', path: '/admin/recruiters' },
      { title: 'Clean unused records', text: 'Prepare clean demo data before presentation.', path: '/admin/cleanup' },
    ],
    sideTitle: 'System Health',
    sideItems: ['Authentication active', 'Role menus enabled', 'Reports available', 'Cleanup tools ready'],
  },
};

function RoleDashboard({ role: forcedRole }) {
  const user = getUser() || {};
  const role = forcedRole || user.role || 'student';
  const data = dashboardData[role] || dashboardData.student;

  return (
    <div className="pageStack">
      <section className="sectionHero dashboardHero">
        <div>
          <p className="eyebrow">{data.eyebrow}</p>
          <h2>{data.title}</h2>
          <p>{data.subtitle}</p>
        </div>

        <div className="heroMiniCard">
          <span>Signed in as</span>
          <strong>{user.name || `${role} Demo`}</strong>
          <small>{String(role).toUpperCase()}</small>
        </div>
      </section>

      <section className="statsGrid">
        {data.stats.map((stat) => (
          <Link className="statCard dashboardStatCard" to={stat.path} key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.note}</small>
          </Link>
        ))}
      </section>

      <section className="contentGrid dashboardWorkGrid">
        <article className="panel">
          <div className="panelHeader">
            <div>
              <p className="eyebrow">Action Plan</p>
              <h2>{data.primaryTitle}</h2>
            </div>
          </div>

          <div className="actionList">
            {data.actions.map((action) => (
              <Link className="actionItem" to={action.path} key={action.title}>
                <div>
                  <strong>{action.title}</strong>
                  <p>{action.text}</p>
                </div>
                <span>Open</span>
              </Link>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panelHeader">
            <div>
              <p className="eyebrow">Status</p>
              <h2>{data.sideTitle}</h2>
            </div>
          </div>

          <div className="checkList">
            {data.sideItems.map((item) => (
              <div className="checkItem" key={item}>
                <span />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default RoleDashboard;
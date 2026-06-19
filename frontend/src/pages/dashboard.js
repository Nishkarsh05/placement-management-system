const stats = [
  { label: 'Total Students', value: '320', note: 'Registered candidates' },
  { label: 'Companies', value: '42', note: 'Recruiting partners' },
  { label: 'Open Jobs', value: '18', note: 'Active opportunities' },
  { label: 'Placed Students', value: '126', note: 'Current season' },
];

const activities = [
  'TCS posted Software Engineer role for CSE and IT students.',
  '12 students applied for the Amazon internship drive.',
  'Infosys interview round scheduled for tomorrow.',
  'Placement report needs package data verification.',
];

function Dashboard() {
  return (
    <div className="dashboardPage">
      <div className="statsGrid">
        {stats.map((stat) => (
          <article className="statCard" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.note}</small>
          </article>
        ))}
      </div>

      <section className="contentGrid">
        <article className="panel">
          <h2>Today&apos;s Focus</h2>
          <div className="taskList">
            <p>Complete authentication and role-based access.</p>
            <p>Create student profile, company, job, and application workflows next.</p>
            <p>Keep this dashboard as the shared layout for Student, Recruiter, TPO, and Admin views.</p>
          </div>
        </article>

        <article className="panel">
          <h2>Recent Activity</h2>
          <div className="activityList">
            {activities.map((activity) => (
              <p key={activity}>{activity}</p>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default Dashboard;

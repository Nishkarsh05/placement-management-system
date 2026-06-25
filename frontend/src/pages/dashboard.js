function Dashboard() {
  const stats = [
    { label: 'Total Students', value: '320', note: 'Registered candidates' },
    { label: 'Companies', value: '42', note: 'Recruiting partners' },
    { label: 'Open Jobs', value: '18', note: 'Active opportunities' },
    { label: 'Placed Students', value: '126', note: 'Current season' },
  ];

  return (
    <div className="pageBlock">
      <div className="heroPanel">
        <div>
          <p className="eyebrow">Live campus placement tracker</p>
          <h2>Build profiles, post jobs, track applications, and prepare smarter.</h2>
        </div>
        <div className="heroBadge">AI Ready</div>
      </div>

      <div className="statsGrid">
        {stats.map((stat) => (
          <div className="statCard" key={stat.label}>
            <p>{stat.label}</p>
            <h3>{stat.value}</h3>
            <span>{stat.note}</span>
          </div>
        ))}
      </div>

      <div className="contentGrid">
        <section className="panel">
          <h3>Today&apos;s Focus</h3>
          <div className="taskItem">Complete student profiles and resumes.</div>
          <div className="taskItem">Add companies and active job openings.</div>
          <div className="taskItem">Use AI Insights to match students with jobs.</div>
        </section>

        <section className="panel">
          <h3>Recent Activity</h3>
          <div className="activityItem">TCS posted Software Engineer role.</div>
          <div className="activityItem">12 students applied for internship drive.</div>
          <div className="activityItem">Infosys interview round scheduled.</div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
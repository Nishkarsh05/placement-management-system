function Dashboard() {
  const stats = [
    { label: 'Students', value: '320', change: '+24 this month' },
    { label: 'Recruiters', value: '42', change: '12 active drives' },
    { label: 'Open Roles', value: '18', change: '8 closing soon' },
    { label: 'Offers', value: '126', change: '68% placement rate' },
  ];

  return (
    <div className="pageStack">
      <section className="commandHero">
        <div>
          <p className="caption lightCaption">Placement Command Center</p>
          <h1>Manage campus hiring from profile to offer.</h1>
          <p>
            Track students, companies, jobs, applications, AI readiness and recruiter conversations from one workspace.
          </p>
        </div>
        <div className="heroMetric">
          <span>Season Score</span>
          <strong>84%</strong>
          <p>Healthy placement progress</p>
        </div>
      </section>

      <div className="statGridV2">
        {stats.map((stat) => (
          <div className="metricCard" key={stat.label}>
            <p>{stat.label}</p>
            <h3>{stat.value}</h3>
            <span>{stat.change}</span>
          </div>
        ))}
      </div>

      <div className="dashboardGrid">
        <section className="surface">
          <div className="sectionTitle">
            <div>
              <p className="caption">Pipeline</p>
              <h3>Hiring Flow</h3>
            </div>
          </div>
          <div className="pipeline">
            <div><strong>320</strong><span>Registered</span></div>
            <div><strong>248</strong><span>Eligible</span></div>
            <div><strong>184</strong><span>Applied</span></div>
            <div><strong>96</strong><span>Interview</span></div>
            <div><strong>126</strong><span>Offers</span></div>
          </div>
        </section>

        <section className="surface">
          <div className="sectionTitle">
            <div>
              <p className="caption">Focus</p>
              <h3>Today&apos;s Actions</h3>
            </div>
          </div>
          <div className="actionList">
            <div>Review students with incomplete resumes</div>
            <div>Post 3 new roles for CSE and IT</div>
            <div>Generate AI interview questions for shortlisted students</div>
            <div>Message recruiters about interview slots</div>
          </div>
        </section>
      </div>

      <section className="surface">
        <div className="sectionTitle">
          <div>
            <p className="caption">Recent Drives</p>
            <h3>Top Opportunities</h3>
          </div>
        </div>
        <div className="opportunityGrid">
          {['Microsoft Software Engineer', 'Amazon Cloud Associate', 'TCS Frontend Developer', 'Infosys MERN Intern'].map((item) => (
            <div className="opportunityCard" key={item}>
              <strong>{item}</strong>
              <span>Applications open</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
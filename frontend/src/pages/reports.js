function Reports() {
  const placementStatus = [
    { label: 'Placed', value: 68, color: '#2872e8' },
    { label: 'Interview', value: 14, color: '#f59e0b' },
    { label: 'Applied', value: 12, color: '#16a34a' },
    { label: 'Not Placed', value: 6, color: '#dc2626' },
  ];

  const departmentStats = [
    { department: 'CSE', students: 120, placed: 86, rate: '72%' },
    { department: 'IT', students: 92, placed: 61, rate: '66%' },
    { department: 'ECE', students: 76, placed: 45, rate: '59%' },
    { department: 'ME', students: 48, placed: 22, rate: '46%' },
  ];

  const packageStats = [
    { label: '3-5 LPA', value: 42 },
    { label: '5-8 LPA', value: 34 },
    { label: '8-12 LPA', value: 18 },
    { label: '12+ LPA', value: 6 },
  ];

  const pipeline = [
    { label: 'Registered', value: 320 },
    { label: 'Applied', value: 210 },
    { label: 'Shortlisted', value: 86 },
    { label: 'Interview', value: 48 },
    { label: 'Selected', value: 126 },
  ];

  return (
    <div className="pageStack">
      <section className="pageHero">
        <div>
          <p className="eyebrow">Placement Analytics</p>
          <h1>Reports</h1>
          <p>Track placement performance, department results, package ranges, and hiring pipeline.</p>
        </div>
      </section>

      <section className="reportStatsGrid">
        <div className="metricCard">
          <p>Placement Rate</p>
          <h2>68%</h2>
          <span>Current batch</span>
        </div>

        <div className="metricCard">
          <p>Average Package</p>
          <h2>6.4 LPA</h2>
          <span>Selected students</span>
        </div>

        <div className="metricCard">
          <p>Highest Package</p>
          <h2>18 LPA</h2>
          <span>Top offer</span>
        </div>

        <div className="metricCard">
          <p>Interviews</p>
          <h2>48</h2>
          <span>Scheduled rounds</span>
        </div>
      </section>

      <section className="reportsGrid">
        <div className="reportCard">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Status Split</p>
              <h2>Placement Overview</h2>
            </div>
          </div>

          <div className="pieArea">
            <div className="pieChart" />

            <div className="legendList">
              {placementStatus.map((item) => (
                <div className="legendItem" key={item.label}>
                  <span style={{ background: item.color }} />
                  <p>{item.label}</p>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reportCard">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Packages</p>
              <h2>Offer Distribution</h2>
            </div>
          </div>

          <div className="barChart">
            {packageStats.map((item) => (
              <div className="barRow" key={item.label}>
                <span>{item.label}</span>
                <div className="barTrack">
                  <div className="barFill" style={{ width: `${item.value}%` }} />
                </div>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reportCard">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Hiring Funnel</p>
            <h2>Placement Pipeline</h2>
          </div>
        </div>

        <div className="pipelineGraph">
          {pipeline.map((item, index) => (
            <div className="pipelineStep" key={item.label}>
              <div className="pipelineCircle">{item.value}</div>
              <p>{item.label}</p>
              {index < pipeline.length - 1 && <div className="pipelineLine" />}
            </div>
          ))}
        </div>
      </section>

      <section className="reportCard">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Department Performance</p>
            <h2>Department Wise Report</h2>
          </div>
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Department</th>
                <th>Total Students</th>
                <th>Placed</th>
                <th>Placement Rate</th>
              </tr>
            </thead>
            <tbody>
              {departmentStats.map((row) => (
                <tr key={row.department}>
                  <td>{row.department}</td>
                  <td>{row.students}</td>
                  <td>{row.placed}</td>
                  <td>
                    <span className="statusBadge selected">{row.rate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Reports;
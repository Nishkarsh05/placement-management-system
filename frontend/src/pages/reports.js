function Reports() {
  const departmentData = [
    { name: 'CSE', value: 82 },
    { name: 'IT', value: 74 },
    { name: 'ECE', value: 61 },
    { name: 'ME', value: 48 },
  ];

  const placementFlow = [
    'Registered',
    'Profile Complete',
    'Applied',
    'Shortlisted',
    'Interview',
    'Offer',
  ];

  return (
    <div className="pageBlock">
      <div className="pageHeader">
        <div>
          <p className="eyebrow">Placement Analytics</p>
          <h2>Reports</h2>
        </div>
      </div>

      <div className="statsGrid">
        <div className="statCard">
          <p>Placement Rate</p>
          <h3>68%</h3>
          <span>Current batch</span>
        </div>

        <div className="statCard">
          <p>Average Package</p>
          <h3>6.4 LPA</h3>
          <span>Across selected students</span>
        </div>

        <div className="statCard">
          <p>Highest Package</p>
          <h3>18 LPA</h3>
          <span>Current season</span>
        </div>

        <div className="statCard">
          <p>Interviews</p>
          <h3>54</h3>
          <span>Scheduled rounds</span>
        </div>
      </div>

      <div className="analyticsGrid">
        <section className="panel">
          <h3>Department Wise Placement</h3>

          {departmentData.map((item) => (
            <div className="progressRow" key={item.name}>
              <span>{item.name}</span>
              <div>
                <b style={{ width: `${item.value}%` }} />
              </div>
              <strong>{item.value}%</strong>
            </div>
          ))}
        </section>

        <section className="panel chartPanel">
          <h3>Placement Split</h3>

          <div className="pieChart">
            <span>68%</span>
          </div>

          <div className="chartLegend">
            <p><b className="dot placed" /> Placed Students</p>
            <p><b className="dot active" /> Active Applications</p>
            <p><b className="dot pending" /> Pending Students</p>
          </div>
        </section>
      </div>

      <section className="panel">
        <h3>Hiring Flow</h3>

        <div className="flowChart">
          {placementFlow.map((step, index) => (
            <div className="flowStep" key={step}>
              <div>{index + 1}</div>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Reports;
function Applications() {
  const applications = [
    { student: 'Student Test', job: 'Frontend Developer', company: 'TCS', status: 'Applied' },
    { student: 'Rahul Sharma', job: 'MERN Stack Intern', company: 'Infosys', status: 'Shortlisted' },
    { student: 'Priya Verma', job: 'Cloud Support Associate', company: 'Amazon', status: 'Interview' },
  ];

  return (
    <div className="pageBlock">
      <div className="pageHeader">
        <div>
          <p className="eyebrow">Application Tracking</p>
          <h2>Applications</h2>
        </div>
      </div>

      <div className="tableCard">
        <table className="dataTable">
          <thead>
            <tr>
              <th>Student</th>
              <th>Job</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={index}>
                <td>{application.student}</td>
                <td>{application.job}</td>
                <td>{application.company}</td>
                <td><span className="statusBadge">{application.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Applications;
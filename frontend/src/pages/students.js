function Students() {
  const students = [
    {
      id: 1,
      name: 'Student Three',
      email: 'student300@gmail.com',
      department: 'CSE',
      cgpa: '8.4',
      status: 'Eligible',
    },
    {
      id: 2,
      name: 'Rahul Sharma',
      email: 'rahul@student.com',
      department: 'IT',
      cgpa: '7.9',
      status: 'Eligible',
    },
    {
      id: 3,
      name: 'Priya Verma',
      email: 'priya@student.com',
      department: 'ECE',
      cgpa: '8.1',
      status: 'Eligible',
    },
  ];

  return (
    <div className="pageBlock">
      <div className="pageHeader">
        <div>
          <p className="eyebrow">Student Records</p>
          <h2>Students</h2>
        </div>
      </div>

      <div className="tableCard">
        <table className="dataTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>CGPA</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.cgpa}</td>
                <td>
                  <span className="statusBadge success">{student.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
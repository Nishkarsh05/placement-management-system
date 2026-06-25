import { useEffect, useState } from 'react';
import api from '../utils/api';

function Students() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await api.get('/students');
        setStudents(response.data.students || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load students');
      }
    };

    loadStudents();
  }, []);

  const fallbackStudents = [
    { name: 'Student Test', email: 'studenttest@gmail.com', department: 'CSE', cgpa: 8.2 },
    { name: 'Rahul Sharma', email: 'rahul@student.com', department: 'IT', cgpa: 7.8 },
    { name: 'Priya Verma', email: 'priya@student.com', department: 'ECE', cgpa: 8.6 },
  ];

  const list = students.length ? students : fallbackStudents;

  return (
    <div className="pageBlock">
      <div className="pageHeader">
        <div>
          <p className="eyebrow">Student Records</p>
          <h2>Students</h2>
        </div>
      </div>

      {error && <p className="softWarning">{error}. Showing demo data.</p>}

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
            {list.map((student, index) => (
              <tr key={student._id || index}>
                <td>{student.user?.name || student.name}</td>
                <td>{student.user?.email || student.email}</td>
                <td>{student.user?.department || student.department || student.branch}</td>
                <td>{student.cgpa || 'Not added'}</td>
                <td><span className="statusBadge success">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
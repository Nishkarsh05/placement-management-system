import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const demoShortlisted = [
  {
    _id: 's1',
    name: 'Nishkarsh Dubey',
    email: 'nishkarsh.final@gmail.com',
    role: 'Frontend Developer Intern',
    company: 'TCS',
    cgpa: '8.2',
    skills: 'React, Node.js, MongoDB',
    resumeUrl: '',
    status: 'Shortlisted',
  },
  {
    _id: 's2',
    name: 'Priya Verma',
    email: 'priya@student.com',
    role: 'Data Analyst Intern',
    company: 'Amazon',
    cgpa: '8.6',
    skills: 'Python, SQL, Power BI',
    resumeUrl: '',
    status: 'Shortlisted',
  },
  {
    _id: 's3',
    name: 'Rahul Sharma',
    email: 'rahul@student.com',
    role: 'Backend Developer Trainee',
    company: 'Infosys',
    cgpa: '7.8',
    skills: 'Java, APIs, SQL',
    resumeUrl: '',
    status: 'Shortlisted',
  },
];

function Shortlisted() {
  const [candidates, setCandidates] = useState([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('shortlistedCandidates') || '[]');

    if (saved.length) {
      setCandidates(saved);
    } else {
      setCandidates(demoShortlisted);
      localStorage.setItem('shortlistedCandidates', JSON.stringify(demoShortlisted));
    }
  }, []);

  const updateCandidateStatus = (candidateId, status) => {
    const updated = candidates.map((candidate) =>
      candidate._id === candidateId ? { ...candidate, status } : candidate
    );

    setCandidates(updated);
    localStorage.setItem('shortlistedCandidates', JSON.stringify(updated));

    const selected = updated.find((candidate) => candidate._id === candidateId);

    if (status === 'Interview') {
      setNotice(`${selected.name} moved to interview setup.`);
    } else {
      setNotice(`${selected.name} marked as rejected.`);
    }
  };

  const activeShortlisted = candidates.filter((candidate) => candidate.status !== 'Rejected');

  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">Recruiter workflow</p>
        <div className="pageHeroRow">
          <div>
            <h2>Shortlisted Candidates</h2>
            <p>Review shortlisted students and move them to interview setup.</p>
          </div>
          <Link className="primaryButton inlineButton" to="/interviews">
            Setup Interviews
          </Link>
        </div>
      </section>

      {notice && <div className="softNotice">{notice}</div>}

      <section className="metricGrid">
        <div className="metricCard">
          <span>Shortlisted</span>
          <strong>{activeShortlisted.length}</strong>
          <p>Ready for interview decision</p>
        </div>
        <div className="metricCard">
          <span>Interview Stage</span>
          <strong>{candidates.filter((item) => item.status === 'Interview').length}</strong>
          <p>Moved to interview setup</p>
        </div>
        <div className="metricCard">
          <span>Rejected</span>
          <strong>{candidates.filter((item) => item.status === 'Rejected').length}</strong>
          <p>Not moving forward</p>
        </div>
        <div className="metricCard">
          <span>Total Reviewed</span>
          <strong>{candidates.length}</strong>
          <p>Candidate decisions</p>
        </div>
      </section>

      <section className="surface">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Candidates</p>
            <h3>Shortlist Review</h3>
          </div>
          <span className="countPill">{candidates.length} records</span>
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Email</th>
                <th>Role</th>
                <th>Company</th>
                <th>CGPA</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate._id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.role}</td>
                  <td>{candidate.company}</td>
                  <td>{candidate.cgpa}</td>
                  <td>{candidate.skills}</td>
                  <td>
                    <span
                      className={`decisionBadge ${
                        candidate.status === 'Rejected' ? 'statusRejected' : 'statusShortlisted'
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </td>
                  <td>
                    <div className="tableActions">
                      <button
                        type="button"
                        className="primaryButton smallActionButton"
                        onClick={() => updateCandidateStatus(candidate._id, 'Interview')}
                      >
                        Move to Interview
                      </button>
                      <button
                        type="button"
                        className="dangerButton smallActionButton"
                        onClick={() => updateCandidateStatus(candidate._id, 'Rejected')}
                      >
                        Reject
                      </button>
                    </div>
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

export default Shortlisted;
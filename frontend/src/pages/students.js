import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../utils/api';
import { getUser } from '../utils/auth';

const demoCandidates = [
  {
    _id: 'demo-student-1',
    name: 'Student Demo',
    email: 'student@test.com',
    phone: '9999999999',
    department: 'CSE',
    cgpa: 8.2,
    branch: 'Computer Science',
    passingYear: 2026,
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    resumeUrl: 'https://drive.google.com',
    projects: 'Placement portal, portfolio website, task manager',
    appliedJob: 'Frontend Developer Intern',
    decisionStatus: 'New',
  },
  {
    _id: 'demo-student-2',
    name: 'Rahul Sharma',
    email: 'rahul@student.com',
    phone: '9876543210',
    department: 'IT',
    cgpa: 7.8,
    branch: 'Information Technology',
    passingYear: 2026,
    skills: ['Java', 'Spring Boot', 'SQL'],
    linkedin: '',
    github: '',
    resumeUrl: '',
    projects: 'Inventory system, REST API project',
    appliedJob: 'Backend Developer Intern',
    decisionStatus: 'Reviewed',
  },
  {
    _id: 'demo-student-3',
    name: 'Priya Verma',
    email: 'priya@student.com',
    phone: '9898989898',
    department: 'ECE',
    cgpa: 8.6,
    branch: 'Electronics',
    passingYear: 2026,
    skills: ['Python', 'Data Analysis', 'Power BI'],
    linkedin: '',
    github: '',
    resumeUrl: '',
    projects: 'Sales dashboard, ML prediction model',
    appliedJob: 'Data Analyst Intern',
    decisionStatus: 'Shortlisted',
  },
  {
    _id: 'demo-student-4',
    name: 'Nishkarsh Dubey',
    email: 'nishkarsh.final@gmail.com',
    phone: '7060151300',
    department: 'CSE',
    cgpa: 8.0,
    branch: 'Computer Science',
    passingYear: 2026,
    skills: ['MERN', 'React', 'Express', 'MongoDB'],
    linkedin: '',
    github: '',
    resumeUrl: '',
    projects: 'Placement Management System',
    appliedJob: 'Full Stack Developer Intern',
    decisionStatus: 'Interview',
  },
];

const statusClass = {
  New: 'statusNew',
  Reviewed: 'statusReviewed',
  Shortlisted: 'statusShortlisted',
  Interview: 'statusInterview',
  Selected: 'statusSelected',
  Rejected: 'statusRejected',
};

function normalizeStudent(student) {
  const profile = student.profile || {};
  const rawSkills = profile.skills || student.skills || [];
  const skills = Array.isArray(rawSkills)
    ? rawSkills
    : String(rawSkills || '')
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);

  return {
    _id: student._id || student.id || student.email,
    name: student.name || student.user?.name || 'Unnamed Candidate',
    email: student.email || student.user?.email || 'No email',
    phone: student.phone || student.user?.phone || 'Not added',
    department: student.department || student.user?.department || profile.department || 'NA',
    cgpa: profile.cgpa || student.cgpa || 'NA',
    branch: profile.branch || student.branch || student.department || 'NA',
    passingYear: profile.passingYear || student.passingYear || 'NA',
    skills: skills.length ? skills : ['Not added'],
    linkedin: profile.linkedin || student.linkedin || '',
    github: profile.github || student.github || '',
    resumeUrl: profile.resumeUrl || student.resumeUrl || '',
    projects: profile.projects || student.projects || 'Not added',
    appliedJob: student.appliedJob || 'Not assigned',
    decisionStatus: student.decisionStatus || 'New',
  };
}

function Students() {
  const user = getUser() || {};
  const isRecruiter = user.role === 'recruiter';
  const pageTitle = isRecruiter ? 'Candidate Pipeline' : 'Student Directory';
  const eyebrow = isRecruiter ? 'Recruitment workspace' : 'Student records';

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [message, setMessage] = useState('');
  const [jobFilter, setJobFilter] = useState('All roles');

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await apiRequest('/students');
        const list = data.students || data || [];
        setCandidates(list.map(normalizeStudent));
        setMessage('');
      } catch {
        setCandidates(demoCandidates);
        setMessage(isRecruiter ? 'Showing presentation-ready candidate data.' : 'Showing demo student data.');
      }
    };

    loadStudents();
  }, [isRecruiter]);

  const roles = useMemo(() => {
    const allRoles = candidates.map((candidate) => candidate.appliedJob).filter(Boolean);
    return ['All roles', ...Array.from(new Set(allRoles))];
  }, [candidates]);

  const filteredCandidates = candidates.filter((candidate) => {
    if (jobFilter === 'All roles') return true;
    return candidate.appliedJob === jobFilter;
  });

  const pipelineCounts = {
    New: candidates.filter((candidate) => candidate.decisionStatus === 'New').length,
    Shortlisted: candidates.filter((candidate) => candidate.decisionStatus === 'Shortlisted').length,
    Interview: candidates.filter((candidate) => candidate.decisionStatus === 'Interview').length,
    Selected: candidates.filter((candidate) => candidate.decisionStatus === 'Selected').length,
  };

  const updateDecision = async (candidateId, decisionStatus) => {
    setCandidates((current) =>
      current.map((candidate) =>
        candidate._id === candidateId ? { ...candidate, decisionStatus } : candidate
      )
    );

    if (selectedCandidate?._id === candidateId) {
      setSelectedCandidate({ ...selectedCandidate, decisionStatus });
    }

    try {
      await apiRequest(`/applications/candidate/${candidateId}/decision`, {
        method: 'PATCH',
        body: JSON.stringify({ decisionStatus }),
      });
    } catch {
      setMessage('Decision saved for demo view. Connect backend applications to persist it.');
    }
  };

  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">{eyebrow}</p>
        <div className="pageHeroRow">
          <div>
            <h2>{pageTitle}</h2>
            <p>
              {isRecruiter
                ? 'Review applicants, open resumes, shortlist candidates, and move them through hiring.'
                : 'Manage student academic and placement records.'}
            </p>
          </div>
          {isRecruiter && (
            <select
              className="compactSelect"
              value={jobFilter}
              onChange={(event) => setJobFilter(event.target.value)}
            >
              {roles.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          )}
        </div>
      </section>

      {isRecruiter && (
        <section className="metricGrid">
          <div className="metricCard">
            <span>New Applications</span>
            <strong>{pipelineCounts.New}</strong>
          </div>
          <div className="metricCard">
            <span>Shortlisted</span>
            <strong>{pipelineCounts.Shortlisted}</strong>
          </div>
          <div className="metricCard">
            <span>Interviews</span>
            <strong>{pipelineCounts.Interview}</strong>
          </div>
          <div className="metricCard">
            <span>Selected</span>
            <strong>{pipelineCounts.Selected}</strong>
          </div>
        </section>
      )}

      {message && <div className="softNotice">{message}</div>}

      <section className="surface">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">{isRecruiter ? 'Candidates' : 'Students'}</p>
            <h3>{isRecruiter ? 'Applicant Review Board' : 'Student Directory'}</h3>
          </div>
          <span className="countPill">{filteredCandidates.length} records</span>
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>CGPA</th>
                <th>Skills</th>
                {isRecruiter && <th>Applied Role</th>}
                {isRecruiter && <th>Decision</th>}
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate._id}>
                  <td>
                    <button
                      className="candidateNameButton"
                      type="button"
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      {candidate.name}
                    </button>
                  </td>
                  <td>{candidate.email}</td>
                  <td>{candidate.department}</td>
                  <td>{candidate.cgpa}</td>
                  <td>{candidate.skills.slice(0, 3).join(', ')}</td>
                  {isRecruiter && <td>{candidate.appliedJob}</td>}
                  {isRecruiter && (
                    <td>
                      <span className={`decisionBadge ${statusClass[candidate.decisionStatus] || ''}`}>
                        {candidate.decisionStatus}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedCandidate && (
        <div className="drawerOverlay" onClick={() => setSelectedCandidate(null)}>
          <aside className="candidateDrawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawerHeader">
              <div>
                <p className="eyebrow">Candidate profile</p>
                <h3>{selectedCandidate.name}</h3>
                <span>{selectedCandidate.email}</span>
              </div>
              <button className="iconButton" type="button" onClick={() => setSelectedCandidate(null)}>
                ×
              </button>
            </div>

            <div className="profileGrid">
              <div>
                <span>Department</span>
                <strong>{selectedCandidate.department}</strong>
              </div>
              <div>
                <span>CGPA</span>
                <strong>{selectedCandidate.cgpa}</strong>
              </div>
              <div>
                <span>Branch</span>
                <strong>{selectedCandidate.branch}</strong>
              </div>
              <div>
                <span>Passing Year</span>
                <strong>{selectedCandidate.passingYear}</strong>
              </div>
            </div>

            <div className="drawerSection">
              <h4>Applied Role</h4>
              <p>{selectedCandidate.appliedJob}</p>
            </div>

            <div className="drawerSection">
              <h4>Skills</h4>
              <div className="skillList">
                {selectedCandidate.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className="drawerSection">
              <h4>Projects</h4>
              <p>{selectedCandidate.projects}</p>
            </div>

            <div className="drawerLinks">
              {selectedCandidate.resumeUrl ? (
                <a href={selectedCandidate.resumeUrl} target="_blank" rel="noreferrer">Open Resume</a>
              ) : (
                <span>Resume not uploaded</span>
              )}
              {selectedCandidate.linkedin && (
                <a href={selectedCandidate.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              )}
              {selectedCandidate.github && (
                <a href={selectedCandidate.github} target="_blank" rel="noreferrer">GitHub</a>
              )}
            </div>

            {isRecruiter && (
              <div className="decisionPanel">
                <button type="button" onClick={() => updateDecision(selectedCandidate._id, 'Reviewed')}>
                  Mark Reviewed
                </button>
                <button type="button" onClick={() => updateDecision(selectedCandidate._id, 'Shortlisted')}>
                  Shortlist
                </button>
                <button type="button" onClick={() => updateDecision(selectedCandidate._id, 'Interview')}>
                  Schedule Interview
                </button>
                <button type="button" className="selectButton" onClick={() => updateDecision(selectedCandidate._id, 'Selected')}>
                  Select
                </button>
                <button type="button" className="rejectButton" onClick={() => updateDecision(selectedCandidate._id, 'Rejected')}>
                  Reject
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default Students;
import { useEffect, useState } from 'react';

const starterRecruiters = [
  {
    id: 'r1',
    name: 'Recruiter Demo',
    email: 'recruiter@test.com',
    company: 'TCS',
    status: 'active',
  },
  {
    id: 'r2',
    name: 'Infosys HR',
    email: 'hr@infosys.com',
    company: 'Infosys',
    status: 'pending',
  },
];

function AdminRecruiters() {
  const [recruiters, setRecruiters] = useState(starterRecruiters);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('adminRecruiters') || 'null');
    if (Array.isArray(saved) && saved.length) {
      setRecruiters(saved);
    }
  }, []);

  function saveRecruiters(nextRecruiters) {
    setRecruiters(nextRecruiters);
    localStorage.setItem('adminRecruiters', JSON.stringify(nextRecruiters));
  }

  function updateStatus(id, status) {
    const nextRecruiters = recruiters.map((recruiter) =>
      recruiter.id === id ? { ...recruiter, status } : recruiter
    );

    saveRecruiters(nextRecruiters);
    setNotice(`Recruiter ${status}.`);
  }

  function removeRecruiter(id) {
    const confirmed = window.confirm('Remove this recruiter account?');
    if (!confirmed) return;

    const nextRecruiters = recruiters.filter((recruiter) => recruiter.id !== id);
    saveRecruiters(nextRecruiters);
    setNotice('Recruiter removed.');
  }

  return (
    <div className="pageStack">
      <section className="pageHero">
        <div>
          <p className="eyebrow">Recruiter Access</p>
          <h1>Recruiter Management</h1>
          <p>Approve recruiter accounts, deactivate access, and check company ownership.</p>
        </div>
      </section>

      {notice && <div className="successBox">{notice}</div>}

      <section className="dataCard">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Recruiters</p>
            <h2>Recruiter Accounts</h2>
          </div>
          <span className="countPill">{recruiters.length} recruiters</span>
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Status</th>
                <th>Admin Action</th>
              </tr>
            </thead>

            <tbody>
              {recruiters.map((recruiter) => (
                <tr key={recruiter.id}>
                  <td>{recruiter.name}</td>
                  <td>{recruiter.email}</td>
                  <td>{recruiter.company}</td>
                  <td>
                    <span className={`statusBadge ${recruiter.status}`}>
                      {recruiter.status}
                    </span>
                  </td>
                  <td>
                    <div className="rowActions">
                      {recruiter.status !== 'active' && (
                        <button onClick={() => updateStatus(recruiter.id, 'active')}>
                          Approve
                        </button>
                      )}

                      {recruiter.status !== 'inactive' && (
                        <button onClick={() => updateStatus(recruiter.id, 'inactive')}>
                          Deactivate
                        </button>
                      )}

                      <button
                        className="dangerButton"
                        onClick={() => removeRecruiter(recruiter.id)}
                      >
                        Remove
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

export default AdminRecruiters;
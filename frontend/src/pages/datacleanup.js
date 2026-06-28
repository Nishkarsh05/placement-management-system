import { useState } from 'react';

const cleanupItems = [
  { key: 'studentApplications', label: 'Student applications' },
  { key: 'interviews', label: 'Interview records' },
  { key: 'shortlistedCandidates', label: 'Shortlisted candidates' },
  { key: 'appliedJobs', label: 'Applied job ids' },
  { key: 'adminUsers', label: 'Local admin user records' },
  { key: 'systemSettings', label: 'System settings' },
];

function DataCleanup() {
  const [notice, setNotice] = useState('');

  function clearItem(item) {
    const confirmed = window.confirm(`Clear ${item.label}?`);
    if (!confirmed) return;
    localStorage.removeItem(item.key);
    setNotice(`${item.label} cleared.`);
  }

  function clearPresentationData() {
    const confirmed = window.confirm('Clear all local presentation data? Login data will stay untouched.');
    if (!confirmed) return;
    cleanupItems.forEach((item) => localStorage.removeItem(item.key));
    setNotice('Presentation data cleared.');
  }

  return (
    <div className="pageStack">
      <section className="pageHero">
        <div><p className="eyebrow">System Maintenance</p><h1>Data Cleanup</h1><p>Remove duplicate local records and reset presentation data without touching login session.</p></div>
      </section>

      {notice && <div className="successBox">{notice}</div>}

      <section className="dataCard">
        <div className="sectionHeader">
          <div><p className="eyebrow">Cleanup Tools</p><h2>Local Records</h2></div>
          <button className="dangerButton" onClick={clearPresentationData}>Clear All Presentation Data</button>
        </div>

        <div className="cleanupGrid">
          {cleanupItems.map((item) => (
            <div className="cleanupCard" key={item.key}>
              <div><h3>{item.label}</h3><p>Storage key: {item.key}</p></div>
              <button onClick={() => clearItem(item)}>Clear</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DataCleanup;
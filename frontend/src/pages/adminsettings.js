import { useEffect, useState } from 'react';

const defaultSettings = {
  placementSeason: '2026 Placement Season',
  activeBatch: '2026',
  departments: 'CSE, IT, ECE, ME, Civil',
  minCgpaDefault: '6.0',
  applicationsOpen: true,
  recruiterApprovalRequired: true,
};

function AdminSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('systemSettings'));
      if (saved) setSettings({ ...defaultSettings, ...saved });
    } catch (error) {
      setSettings(defaultSettings);
    }
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setSettings((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }

  function saveSettings(event) {
    event.preventDefault();
    localStorage.setItem('systemSettings', JSON.stringify(settings));
    setNotice('System settings saved.');
  }

  return (
    <div className="pageStack">
      <section className="pageHero">
        <div><p className="eyebrow">Portal Configuration</p><h1>System Settings</h1><p>Control placement season, active batch, departments, and approval rules.</p></div>
      </section>

      {notice && <div className="successBox">{notice}</div>}

      <section className="formSurface">
        <form className="spaciousForm" onSubmit={saveSettings}>
          <label>Placement Season<input name="placementSeason" value={settings.placementSeason} onChange={handleChange} /></label>
          <label>Active Batch<input name="activeBatch" value={settings.activeBatch} onChange={handleChange} /></label>
          <label>Default Minimum CGPA<input name="minCgpaDefault" value={settings.minCgpaDefault} onChange={handleChange} /></label>
          <label className="fullSpan">Departments<textarea name="departments" value={settings.departments} onChange={handleChange} /></label>

          <label className="checkRow"><input type="checkbox" name="applicationsOpen" checked={settings.applicationsOpen} onChange={handleChange} /> Applications are open</label>
          <label className="checkRow"><input type="checkbox" name="recruiterApprovalRequired" checked={settings.recruiterApprovalRequired} onChange={handleChange} /> Recruiter approval required</label>

          <div className="formActions fullSpan"><button className="primaryButton" type="submit">Save Settings</button></div>
        </form>
      </section>
    </div>
  );
}

export default AdminSettings;
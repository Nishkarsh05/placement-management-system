import { useEffect, useState } from 'react';

const defaultDrive = {
  company: '',
  role: '',
  date: '',
  time: '',
  venue: '',
  coordinator: '',
  status: 'Scheduled',
};

const demoDrives = [
  {
    _id: 'd1',
    company: 'TCS',
    role: 'Frontend Developer Intern',
    date: '2026-07-10',
    time: '10:00',
    venue: 'Seminar Hall A',
    coordinator: 'TPO Office',
    status: 'Scheduled',
  },
  {
    _id: 'd2',
    company: 'Infosys',
    role: 'Backend Developer Trainee',
    date: '2026-07-15',
    time: '11:30',
    venue: 'Computer Lab 2',
    coordinator: 'Placement Cell',
    status: 'Planned',
  },
];

function CampusDrives() {
  const [form, setForm] = useState(defaultDrive);
  const [drives, setDrives] = useState([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('campusDrives') || '[]');
    setDrives(saved.length ? saved : demoDrives);
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newDrive = {
      ...form,
      _id: Date.now().toString(),
    };

    const updated = [newDrive, ...drives];
    setDrives(updated);
    localStorage.setItem('campusDrives', JSON.stringify(updated));
    setForm(defaultDrive);
    setNotice('Campus drive scheduled.');
  };

  const updateStatus = (driveId, status) => {
    const updated = drives.map((drive) =>
      drive._id === driveId ? { ...drive, status } : drive
    );

    setDrives(updated);
    localStorage.setItem('campusDrives', JSON.stringify(updated));
    setNotice(`Drive marked as ${status}.`);
  };

  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">TPO coordination</p>
        <h2>Campus Drives</h2>
        <p>Plan and monitor company visits, interview drives, venues, and coordinators.</p>
      </section>

      {notice && <div className="softNotice">{notice}</div>}

      <section className="surface formSurface">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Drive setup</p>
            <h3>Schedule Campus Drive</h3>
          </div>
        </div>

        <form className="formGrid spaciousForm" onSubmit={handleSubmit}>
          <label>
            Company
            <input name="company" value={form.company} onChange={handleChange} required />
          </label>

          <label>
            Job Role
            <input name="role" value={form.role} onChange={handleChange} required />
          </label>

          <label>
            Date
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </label>

          <label>
            Time
            <input type="time" name="time" value={form.time} onChange={handleChange} required />
          </label>

          <label>
            Venue / Meeting Link
            <input name="venue" value={form.venue} onChange={handleChange} required />
          </label>

          <label>
            Coordinator
            <input name="coordinator" value={form.coordinator} onChange={handleChange} />
          </label>

          <label>
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Planned</option>
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </label>

          <div className="formActions fullWidth">
            <button className="primaryButton" type="submit">Save Drive</button>
          </div>
        </form>
      </section>

      <section className="surface">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Drive calendar</p>
            <h3>Upcoming Drives</h3>
          </div>
          <span className="countPill">{drives.length} drives</span>
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Coordinator</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drives.map((drive) => (
                <tr key={drive._id}>
                  <td>{drive.company}</td>
                  <td>{drive.role}</td>
                  <td>{drive.date}</td>
                  <td>{drive.time}</td>
                  <td>{drive.venue}</td>
                  <td>{drive.coordinator}</td>
                  <td><span className="decisionBadge">{drive.status}</span></td>
                  <td>
                    <div className="tableActions">
                      <button className="secondaryButton smallActionButton" type="button" onClick={() => updateStatus(drive._id, 'Completed')}>
                        Complete
                      </button>
                      <button className="dangerButton smallActionButton" type="button" onClick={() => updateStatus(drive._id, 'Cancelled')}>
                        Cancel
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

export default CampusDrives;
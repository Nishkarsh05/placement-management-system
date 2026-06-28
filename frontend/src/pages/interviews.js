import { useEffect, useState } from 'react';
import { getUser } from '../utils/auth';

const emptyInterview = { candidateName: '', candidateEmail: '', role: '', company: '', date: '', time: '', mode: 'Online', round: 'Technical', meetingLink: '', notes: '' };
const demoInterviews = [
  { id: 'i1', candidateName: 'Student Demo', candidateEmail: 'student@test.com', role: 'Frontend Developer', company: 'TCS', date: '2026-08-10', time: '11:00', mode: 'Online', round: 'Technical', meetingLink: 'https://meet.google.com/demo', notes: 'React and API basics' },
];

function Interviews() {
  const user = getUser() || {};
  const role = String(user.role || 'student').toLowerCase();
  const canSchedule = role === 'recruiter';
  const isAdmin = role === 'admin';
  const isStudent = role === 'student';

  const [interviews, setInterviews] = useState([]);
  const [form, setForm] = useState(emptyInterview);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('interviews') || '[]');
    setInterviews(saved.length ? saved : demoInterviews);
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function scheduleInterview(event) {
    event.preventDefault();
    if (!canSchedule) {
      setNotice('Only recruiters can schedule interviews.');
      return;
    }
    const next = [{ ...form, id: `i-${Date.now()}` }, ...interviews];
    setInterviews(next);
    localStorage.setItem('interviews', JSON.stringify(next));
    setForm(emptyInterview);
    setNotice('Interview scheduled.');
  }

  const visibleInterviews = isStudent
    ? interviews.filter((item) => item.candidateEmail === user.email || item.candidateName === user.name)
    : interviews;

  return (
    <div className="pageStack">
      <section className="pageHero">
        <div>
          <p className="eyebrow">Interview Records</p>
          <h1>{canSchedule ? 'Interview Setup' : isAdmin ? 'Interview Log' : 'Interviews'}</h1>
          <p>{canSchedule ? 'Schedule interview rounds and share meeting details.' : isAdmin ? 'View interview records scheduled by recruiters.' : 'Track your scheduled interviews.'}</p>
        </div>
      </section>

      {notice && <div className="noticeBox">{notice}</div>}

      {canSchedule && (
        <section className="formSurface">
          <div className="sectionHeader"><div><p className="eyebrow">Schedule</p><h2>Create Interview</h2></div></div>
          <form className="spaciousForm" onSubmit={scheduleInterview}>
            <label>Candidate Name<input name="candidateName" value={form.candidateName} onChange={handleChange} /></label>
            <label>Candidate Email<input name="candidateEmail" value={form.candidateEmail} onChange={handleChange} /></label>
            <label>Role<input name="role" value={form.role} onChange={handleChange} /></label>
            <label>Company<input name="company" value={form.company} onChange={handleChange} /></label>
            <label>Date<input type="date" name="date" value={form.date} onChange={handleChange} /></label>
            <label>Time<input type="time" name="time" value={form.time} onChange={handleChange} /></label>
            <label>Mode<select name="mode" value={form.mode} onChange={handleChange}><option>Online</option><option>Offline</option></select></label>
            <label>Round<select name="round" value={form.round} onChange={handleChange}><option>Technical</option><option>HR</option><option>Final</option></select></label>
            <label className="fullSpan">Meeting Link / Location<input name="meetingLink" value={form.meetingLink} onChange={handleChange} /></label>
            <label className="fullSpan">Notes<textarea name="notes" value={form.notes} onChange={handleChange} /></label>
            <div className="formActions fullSpan"><button className="primaryButton" type="submit">Schedule Interview</button></div>
          </form>
        </section>
      )}

      {isAdmin && <section className="infoPanel"><p className="eyebrow">Read Only Access</p><h2>Admin Interview Log</h2><p>Admin can audit interview records. Scheduling belongs to recruiters.</p></section>}

      <section className="dataCard">
        <div className="sectionHeader"><div><p className="eyebrow">Records</p><h2>Interview Schedule</h2></div><span className="countPill">{visibleInterviews.length} records</span></div>
        <div className="tableWrap">
          <table className="dataTable">
            <thead><tr><th>Candidate</th><th>Role</th><th>Company</th><th>Date</th><th>Mode</th><th>Details</th></tr></thead>
            <tbody>
              {visibleInterviews.map((item) => (
                <tr key={item.id}>
                  <td>{item.candidateName}<br />{item.candidateEmail}</td>
                  <td>{item.role}</td>
                  <td>{item.company}</td>
                  <td>{item.date} {item.time}</td>
                  <td><span className="statusBadge active">{item.mode}</span></td>
                  <td>{item.meetingLink || 'Not added'}<br />{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Interviews;
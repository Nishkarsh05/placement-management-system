import { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import { getUser } from '../utils/auth';

const emptyJob = {
  title: '', companyName: '', location: '', package: '', type: 'Full Time', skills: '', minCgpa: '', passingYear: '', branches: '', maxBacklogs: '', deadline: '', description: '',
};

const demoJobs = [
  { _id: 'j1', title: 'Frontend Developer Intern', companyName: 'TCS', location: 'Bangalore', package: '4.5 LPA', type: 'Internship', skills: 'React, JavaScript, CSS', minCgpa: '6.5', deadline: '2026-08-12', description: 'Build frontend modules for business applications.' },
  { _id: 'j2', title: 'Backend Developer Trainee', companyName: 'Infosys', location: 'Pune', package: '5 LPA', type: 'Full Time', skills: 'Node.js, MongoDB, APIs', minCgpa: '6.0', deadline: '2026-08-18', description: 'Work on APIs and database backed services.' },
  { _id: 'j3', title: 'Cloud Support Associate', companyName: 'Amazon', location: 'Hyderabad', package: '6 LPA', type: 'Full Time', skills: 'Linux, Networking, Cloud', minCgpa: '7.0', deadline: '2026-08-25', description: 'Support cloud customers and troubleshoot technical issues.' },
];

function Jobs() {
  const user = getUser() || {};
  const role = String(user.role || 'student').toLowerCase();
  const canPostJob = role === 'recruiter';
  const isStudent = role === 'student';
  const isAdmin = role === 'admin';
  const isTpo = role === 'tpo';

  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(emptyJob);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const data = await apiRequest('/jobs');
      const list = Array.isArray(data) ? data : data.jobs;
      setJobs(Array.isArray(list) && list.length ? list : demoJobs);
    } catch (error) {
      setJobs(demoJobs);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canPostJob) {
      setNotice('Only recruiters can post jobs.');
      return;
    }

    const newJob = { ...form, _id: `local-${Date.now()}` };

    try {
      const saved = await apiRequest('/jobs', { method: 'POST', body: JSON.stringify(form) });
      setJobs((current) => [saved.job || saved, ...current]);
      setNotice('Job posted successfully.');
    } catch (error) {
      setJobs((current) => [newJob, ...current]);
      setNotice('Job saved locally.');
    }

    setForm(emptyJob);
  }

  function applyForJob(job) {
    const application = {
      id: `app-${Date.now()}`,
      studentName: user.name || 'Student Demo',
      email: user.email || 'student@test.com',
      role: job.title,
      company: job.companyName || 'Company not assigned',
      appliedDate: new Date().toLocaleDateString(),
      status: 'Applied',
      interviewDate: '',
      message: 'Your request has been submitted and is waiting for recruiter review.',
    };

    const current = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    localStorage.setItem('studentApplications', JSON.stringify([application, ...current]));
    setNotice('Request applied.');
  }

  return (
    <div className="pageStack">
      <section className="pageHero">
        <div>
          <p className="eyebrow">{canPostJob ? 'Recruiter Jobs' : isStudent ? 'Student Opportunities' : 'Job Records'}</p>
          <h1>{canPostJob ? 'Post and Manage Jobs' : isStudent ? 'Available Jobs' : 'Job Posting Log'}</h1>
          <p>{canPostJob ? 'Create hiring roles for students.' : isStudent ? 'Browse open roles and apply.' : 'View all job postings. Admin and TPO do not create recruiter jobs.'}</p>
        </div>
      </section>

      {notice && <div className="noticeBox">{notice}</div>}

      {canPostJob && (
        <section className="formSurface">
          <div className="sectionHeader"><div><p className="eyebrow">Job Details</p><h2>Create Hiring Role</h2></div></div>
          <form className="spaciousForm" onSubmit={handleSubmit}>
            <label>Job Title<input name="title" value={form.title} onChange={handleChange} placeholder="Frontend Developer Intern" /></label>
            <label>Company Name<input name="companyName" value={form.companyName} onChange={handleChange} placeholder="TCS" /></label>
            <label>Location<input name="location" value={form.location} onChange={handleChange} placeholder="Bangalore" /></label>
            <label>Package<input name="package" value={form.package} onChange={handleChange} placeholder="4.5 LPA" /></label>
            <label>Type<select name="type" value={form.type} onChange={handleChange}><option>Full Time</option><option>Internship</option><option>Contract</option></select></label>
            <label>Skills<input name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js" /></label>
            <label>Minimum CGPA<input name="minCgpa" value={form.minCgpa} onChange={handleChange} /></label>
            <label>Passing Year<input name="passingYear" value={form.passingYear} onChange={handleChange} /></label>
            <label>Eligible Branches<input name="branches" value={form.branches} onChange={handleChange} placeholder="CSE, IT" /></label>
            <label>Max Backlogs<input name="maxBacklogs" value={form.maxBacklogs} onChange={handleChange} /></label>
            <label>Deadline<input type="date" name="deadline" value={form.deadline} onChange={handleChange} /></label>
            <label className="fullSpan">Description<textarea name="description" value={form.description} onChange={handleChange} /></label>
            <div className="formActions fullSpan"><button className="primaryButton" type="submit">Post Job</button></div>
          </form>
        </section>
      )}

      {(isAdmin || isTpo) && (
        <section className="infoPanel">
          <p className="eyebrow">Read Only Access</p>
          <h2>{isAdmin ? 'Admin Job Log' : 'TPO Job Monitoring'}</h2>
          <p>{isAdmin ? 'Admin can audit all jobs posted by recruiters but cannot create hiring roles.' : 'TPO can monitor jobs for coordination but recruiters create postings.'}</p>
        </section>
      )}

      <section className="dataCard">
        <div className="sectionHeader"><div><p className="eyebrow">Open Roles</p><h2>{isStudent ? 'Apply for Jobs' : 'Job Board'}</h2></div><span className="countPill">{jobs.length} jobs</span></div>
        <div className="jobGrid">
          {jobs.map((job) => (
            <article className="jobCard" key={job._id || job.title}>
              <div className="jobCardHeader"><div><p className="eyebrow">{job.companyName}</p><h3>{job.title}</h3></div><span className="statusBadge active">{job.type}</span></div>
              <p className="jobDescription">{job.description}</p>
              <div className="jobMetaGrid"><span>{job.location}</span><span>{job.package}</span><span>CGPA {job.minCgpa || 'NA'}</span><span>{job.deadline || 'Deadline not added'}</span></div>
              {isStudent && <button className="primaryButton" onClick={() => applyForJob(job)}>Apply Now</button>}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Jobs;
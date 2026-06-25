import { useEffect, useState } from 'react';
import api from '../utils/api';

const initialJob = {
  title: '',
  companyName: '',
  location: '',
  salaryPackage: '',
  jobType: 'Full Time',
  skillsRequired: '',
  minimumCgpa: '',
  passingYear: '',
  eligibleBranches: '',
  maxActiveBacklogs: '',
  deadline: '',
  description: '',
};

function Jobs() {
  const [form, setForm] = useState(initialJob);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setJobs(response.data.jobs || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load jobs');
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      await api.post('/jobs', form);
      setForm(initialJob);
      setMessage('Job posted successfully');
      loadJobs();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not post job');
    }
  };

  const demoJobs = [
    { title: 'Frontend Developer', companyName: 'TCS', location: 'Bangalore', salaryPackage: '6 LPA', skillsRequired: 'React, JavaScript' },
    { title: 'MERN Stack Intern', companyName: 'Infosys', location: 'Pune', salaryPackage: '25K/month', skillsRequired: 'Node.js, MongoDB' },
    { title: 'Cloud Support Associate', companyName: 'Amazon', location: 'Hyderabad', salaryPackage: '8 LPA', skillsRequired: 'Linux, Networking' },
  ];

  const list = jobs.length ? jobs : demoJobs;

  return (
    <div className="pageBlock">
      <div className="pageHeader">
        <div>
          <p className="eyebrow">Open Opportunities</p>
          <h2>Jobs</h2>
        </div>
      </div>

      <form className="panel formPanel" onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" required />
        <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
        <input name="salaryPackage" value={form.salaryPackage} onChange={handleChange} placeholder="Package: 6 LPA" />
        <select name="jobType" value={form.jobType} onChange={handleChange}>
          <option>Full Time</option>
          <option>Internship</option>
          <option>Contract</option>
        </select>
        <input name="skillsRequired" value={form.skillsRequired} onChange={handleChange} placeholder="Skills: React, Node.js" />
        <input name="minimumCgpa" value={form.minimumCgpa} onChange={handleChange} placeholder="Minimum CGPA" />
        <input name="passingYear" value={form.passingYear} onChange={handleChange} placeholder="Passing Year" />
        <input name="eligibleBranches" value={form.eligibleBranches} onChange={handleChange} placeholder="Branches: CSE, IT" />
        <input name="maxActiveBacklogs" value={form.maxActiveBacklogs} onChange={handleChange} placeholder="Max Active Backlogs" />
        <input name="deadline" value={form.deadline} onChange={handleChange} type="date" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Job Description" />

        {message && <p className="successText">{message}</p>}
        {error && <p className="softWarning">{error}. Showing demo jobs.</p>}

        <button className="primaryButton" type="submit">Post Job</button>
      </form>

      <div className="cardGrid">
        {list.map((job, index) => (
          <div className="miniCard jobCard" key={job._id || index}>
            <h3>{job.title}</h3>
            <p>{job.company?.name || job.companyName}</p>
            <span>{job.location || 'Remote / Campus'}</span>
            <small>{job.salaryPackage || 'Package not added'}</small>
            <div className="skillLine">{job.skillsRequired || 'Skills not added'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
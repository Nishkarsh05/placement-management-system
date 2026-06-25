import { useEffect, useState } from 'react';
import api from '../utils/api';
import { getCurrentUser } from '../utils/auth';

function Jobs() {
  const user = getCurrentUser();

  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    title: '',
    company: '',
    package: '',
    location: '',
    experience: '',
    jobType: 'full_time',
    skillsRequired: '',
    minimumCGPA: '',
    passingYear: '',
    branches: '',
    maxActiveBacklogs: '',
    description: '',
    deadline: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const canPostJob = ['recruiter', 'tpo', 'admin'].includes(user?.role);
  const canApply = user?.role === 'student';

  const loadData = async () => {
    try {
      const jobsResponse = await api.get('/jobs');
      const companiesResponse = await api.get('/companies');

      setJobs(jobsResponse.data.jobs);
      setCompanies(companiesResponse.data.companies);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load jobs');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('/jobs', form);
      setMessage('Job posted successfully');
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not post job');
    }
  };

  const handleApply = async (jobId) => {
    setMessage('');
    setError('');

    try {
      const { data } = await api.post('/applications', { jobId });
      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not apply for this job');
    }
  };

  return (
    <div className="modulePage">
      <h2>Jobs</h2>

      {canPostJob && (
        <form className="moduleForm" onSubmit={handleSubmit}>
          <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />

          <select name="company" value={form.company} onChange={handleChange} required>
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option value={company._id} key={company._id}>
                {company.name}
              </option>
            ))}
          </select>

          <input name="package" placeholder="Package: 8 LPA" value={form.package} onChange={handleChange} />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          <input name="experience" placeholder="Experience" value={form.experience} onChange={handleChange} />

          <select name="jobType" value={form.jobType} onChange={handleChange}>
            <option value="full_time">Full Time</option>
            <option value="internship">Internship</option>
            <option value="ppo">PPO</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>

          <input name="skillsRequired" placeholder="Skills: React, Node.js" value={form.skillsRequired} onChange={handleChange} />
          <input name="minimumCGPA" placeholder="Minimum CGPA" value={form.minimumCGPA} onChange={handleChange} />
          <input name="passingYear" placeholder="Passing Year" value={form.passingYear} onChange={handleChange} />
          <input name="branches" placeholder="Branches: CSE, IT" value={form.branches} onChange={handleChange} />
          <input name="maxActiveBacklogs" placeholder="Max Active Backlogs" value={form.maxActiveBacklogs} onChange={handleChange} />
          <input name="deadline" type="date" value={form.deadline} onChange={handleChange} />
          <input name="description" placeholder="Job Description" value={form.description} onChange={handleChange} />

          <button className="primaryButton" type="submit">Post Job</button>
        </form>
      )}

      {message && <p className="successText">{message}</p>}
      {error && <p className="errorText">{error}</p>}

      <section className="listGrid">
        {jobs.map((job) => (
          <article className="listCard" key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.company?.name}</p>
            <p>{job.package || 'Package not added'}</p>
            <p>{job.location || 'Location not added'}</p>
            <p>Skills: {job.skillsRequired?.join(', ') || 'Not added'}</p>
            <p>Minimum CGPA: {job.eligibility?.minimumCGPA || 'Not added'}</p>

            {canApply && (
              <button className="primaryButton" type="button" onClick={() => handleApply(job._id)}>
                Apply
              </button>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}

export default Jobs;
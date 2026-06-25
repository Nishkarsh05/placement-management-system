import { useEffect, useState } from 'react';
import api from '../utils/api';

function AiInsights() {
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const response = await api.get('/ai/insights');
        setInsights(response.data);
      } catch (err) {
        setError('AI backend is not connected yet. Showing smart demo insights.');
      }
    };

    loadInsights();
  }, []);

  const recommendedJobs = insights?.recommendedJobs || [
    {
      title: 'Frontend Developer',
      company: 'TCS',
      match: '86%',
      reason: 'Strong match with React, JavaScript, and UI skills',
    },
    {
      title: 'MERN Stack Intern',
      company: 'Infosys',
      match: '82%',
      reason: 'Good fit for Node.js, MongoDB, and React projects',
    },
    {
      title: 'Cloud Support Associate',
      company: 'Amazon',
      match: '74%',
      reason: 'Improve networking and Linux skills for better score',
    },
  ];

  return (
    <div className="pageBlock">
      <div className="pageHeader">
        <div>
          <p className="eyebrow">Smart Placement Assistant</p>
          <h2>AI Insights</h2>
        </div>
      </div>

      {error && <p className="softWarning">{error}</p>}

      <div className="insightGrid">
        <div className="insightCard">
          <p className="eyebrow">Profile Score</p>
          <h3>{insights?.profileScore || 72}%</h3>
          <p>Complete resume, CGPA, GitHub, LinkedIn, and projects to improve readiness.</p>
        </div>

        <div className="insightCard">
          <p className="eyebrow">Best Direction</p>
          <h3>{insights?.topSkill || 'MERN Stack'}</h3>
          <p>Your current profile is strongest for frontend and full-stack roles.</p>
        </div>

        <div className="insightCard">
          <p className="eyebrow">Next Step</p>
          <h3>Upgrade Resume</h3>
          <p>Add live project links, internship work, and clear achievement points.</p>
        </div>
      </div>

      <div className="tableCard">
        <h3>Recommended Jobs</h3>
        <table className="dataTable">
          <thead>
            <tr>
              <th>Job</th>
              <th>Company</th>
              <th>Match</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {recommendedJobs.map((job, index) => (
              <tr key={index}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td><span className="statusBadge success">{job.match}</span></td>
                <td>{job.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AiInsights;
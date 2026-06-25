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
        setError('AI insights are not connected yet. Backend AI route is needed.');
      }
    };

    loadInsights();
  }, []);

  return (
    <div className="pageBlock">
      <div className="pageHeader">
        <div>
          <p className="eyebrow">Smart Placement Helper</p>
          <h2>AI Insights</h2>
        </div>
      </div>

      {error && <p className="errorText">{error}</p>}

      <div className="insightGrid">
        <div className="insightCard">
          <p className="eyebrow">Profile Score</p>
          <h3>{insights?.profileScore || 72}%</h3>
          <p>
            Complete your CGPA, skills, resume URL, and LinkedIn profile to improve your placement readiness.
          </p>
        </div>

        <div className="insightCard">
          <p className="eyebrow">Best Skill Match</p>
          <h3>{insights?.topSkill || 'React + Node.js'}</h3>
          <p>
            Your current profile is strongest for frontend and MERN stack roles.
          </p>
        </div>

        <div className="insightCard">
          <p className="eyebrow">Suggested Action</p>
          <h3>Update Resume</h3>
          <p>
            Add project links, internship details, and measurable achievements before applying.
          </p>
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
            {(insights?.recommendedJobs || [
              {
                title: 'Frontend Developer',
                company: 'TCS',
                match: '86%',
                reason: 'Matches React, JavaScript, and UI skills',
              },
              {
                title: 'MERN Stack Intern',
                company: 'Infosys',
                match: '81%',
                reason: 'Matches Node.js, MongoDB, and React',
              },
            ]).map((job, index) => (
              <tr key={index}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>
                  <span className="statusBadge success">{job.match}</span>
                </td>
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
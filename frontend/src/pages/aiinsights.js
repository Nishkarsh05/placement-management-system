import { useState } from 'react';
import { apiRequest } from '../utils/api';

const defaultForm = {
  skills: 'React, Node.js, MongoDB',
  projects: 'Placement Management System',
  cgpa: '8.2',
  role: 'MERN Stack Developer',
  company: 'TCS',
  experience: '3',
};

function AiInsights() {
  const [form, setForm] = useState(defaultForm);
  const [output, setOutput] = useState('Choose an AI action from the cards below.');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const runAi = async (type) => {
    setLoading(true);

    const demoOutput = {
      questions:
        '1. Explain your Placement Management System architecture.\n2. How does React communicate with Node.js APIs?\n3. How did you design MongoDB schemas?\n4. What is JWT authentication?\n5. How would you improve this app for production?',
      resume:
        'Resume feedback:\n- Add measurable project impact.\n- Add GitHub and live demo links.\n- Mention MERN stack clearly.\n- Add recruiter-focused keywords like API, authentication, dashboard, MongoDB schema.',
      roadmap:
        'Career roadmap:\n1. Strengthen JavaScript and React fundamentals.\n2. Build 2 full-stack MERN projects.\n3. Practice REST APIs, auth, and deployment.\n4. Prepare DSA basics.\n5. Apply for frontend and full-stack internships.',
    };

    try {
      const data = await apiRequest(`/google-ai/${type}`, {
        method: 'POST',
        body: JSON.stringify(form),
      });

      setOutput(data.result || data.message || demoOutput[type] || 'AI response generated.');
    } catch {
      setOutput(demoOutput[type] || 'Demo AI response generated.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">Gemini powered</p>
        <h2>AI Career Coach</h2>
        <p>Generate interview questions, resume feedback, and a placement roadmap using student details.</p>
      </section>

      <section className="aiGrid">
        <div className="surface formSurface">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Student context</p>
              <h3>Profile Inputs</h3>
            </div>
          </div>

          <div className="formGrid spaciousForm">
            <label>
              Skills
              <input name="skills" value={form.skills} onChange={handleChange} />
            </label>

            <label>
              Projects
              <input name="projects" value={form.projects} onChange={handleChange} />
            </label>

            <label>
              CGPA
              <input name="cgpa" value={form.cgpa} onChange={handleChange} />
            </label>

            <label>
              Target Role
              <input name="role" value={form.role} onChange={handleChange} />
            </label>

            <label>
              Target Company
              <input name="company" value={form.company} onChange={handleChange} />
            </label>

            <label>
              Experience / Projects Count
              <input name="experience" value={form.experience} onChange={handleChange} />
            </label>
          </div>
        </div>

        <div className="surface">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Actions</p>
              <h3>AI Tools</h3>
            </div>
          </div>

          <div className="aiActionGrid">
            <button type="button" onClick={() => runAi('interview-questions')}>
              <strong>Generate Interview Questions</strong>
              <span>Technical and HR practice set</span>
            </button>

            <button type="button" onClick={() => runAi('resume-feedback')}>
              <strong>Review Resume</strong>
              <span>Improve profile and resume wording</span>
            </button>

            <button type="button" onClick={() => runAi('career-roadmap')}>
              <strong>Create Career Roadmap</strong>
              <span>Step-by-step preparation plan</span>
            </button>
          </div>
        </div>
      </section>

      <section className="surface aiOutput">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Generated output</p>
            <h3>AI Response</h3>
          </div>
          {loading && <span className="countPill">Generating</span>}
        </div>

        <pre>{output}</pre>
      </section>
    </div>
  );
}

export default AiInsights;
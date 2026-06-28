import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../utils/api';
import { getDashboardPath, saveAuth } from '../utils/auth';

const roleLabels = {
  student: {
    title: 'Student Login',
    subtitle: 'Access jobs, applications, AI career coach, and recruiter chat.',
    email: 'student@test.com',
  },
  recruiter: {
    title: 'Recruiter Login',
    subtitle: 'Post jobs, manage companies, review students, and chat with candidates.',
    email: 'recruiter@test.com',
  },
  tpo: {
    title: 'TPO Login',
    subtitle: 'Monitor placement drives, companies, students, applications, and reports.',
    email: 'tpo@test.com',
  },
  admin: {
    title: 'Admin Login',
    subtitle: 'Manage the complete placement system and all user roles.',
    email: 'admin@test.com',
  },
};

const demoNames = {
  student: 'Student Demo',
  recruiter: 'Recruiter Demo',
  tpo: 'TPO Demo',
  admin: 'Admin Demo',
};

function RoleLogin({ role }) {
  const navigate = useNavigate();
  const details = roleLabels[role] || roleLabels.student;

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const loginDemoMode = () => {
    const demoUser = {
      id: `demo-${role}`,
      name: demoNames[role],
      email: form.email || details.email,
      role,
      department: role === 'student' ? 'CSE' : role.toUpperCase(),
    };

    saveAuth(`demo-token-${role}`, demoUser);
    navigate(getDashboardPath(role));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', form);
      const loggedInUser = response.data.user;

      if (loggedInUser.role !== role) {
        setError(`This is a ${role} login. Your account role is ${loggedInUser.role}.`);
        return;
      }

      saveAuth(response.data.token, loggedInUser);
      navigate(getDashboardPath(loggedInUser.role));
    } catch (err) {
      if (err.message === 'Network Error' || !err.response) {
        loginDemoMode();
        return;
      }

      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="authPage roleAuthPage">
      <section className="loginChoicePanel">
        <p className="caption lightCaption">Placement Portal</p>
        <h1>Role based access</h1>
        <p>
          Choose the correct login for your role. Each user gets a different
          workspace, menu, and dashboard.
        </p>

        <div className="roleLoginLinks">
          <Link to="/student/login">Student</Link>
          <Link to="/recruiter/login">Recruiter</Link>
          <Link to="/tpo/login">TPO</Link>
          <Link to="/admin/login">Admin</Link>
        </div>
      </section>

      <form className="authCard" onSubmit={handleSubmit}>
        <p className="caption">{role} portal</p>
        <h1>{details.title}</h1>
        <p className="authHint">{details.subtitle}</p>

        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder={details.email}
          required
        />

        <label>Password</label>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="123456"
          required
        />

        {error && <p className="errorText">{error}</p>}

        <button className="primaryButton" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : `Login as ${role}`}
        </button>

        <p className="authSwitch">
          New user? <Link to={`/register?role=${role}`}>Create {role} account</Link>
        </p>
      </form>
    </main>
  );
}

export default RoleLogin;
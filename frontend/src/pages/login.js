import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import { getDashboardPath, saveAuth } from '../utils/auth';

const roleInfo = {
  student: {
    title: 'Student Login',
    subtitle: 'Apply for jobs, track applications, use AI coach, and chat with recruiters.',
    demoEmail: 'student@test.com',
  },
  recruiter: {
    title: 'Recruiter Login',
    subtitle: 'Post jobs, manage company profile, review candidates, and schedule interviews.',
    demoEmail: 'recruiter@test.com',
  },
  tpo: {
    title: 'TPO Login',
    subtitle: 'Monitor students, companies, drives, interviews, and placement reports.',
    demoEmail: 'tpo@test.com',
  },
  admin: {
    title: 'Admin Login',
    subtitle: 'Manage users, roles, system settings, reports, and platform data.',
    demoEmail: 'admin@test.com',
  },
};

function getRoleFromPath(pathname) {
  if (pathname.includes('/student/login')) return 'student';
  if (pathname.includes('/recruiter/login')) return 'recruiter';
  if (pathname.includes('/tpo/login')) return 'tpo';
  if (pathname.includes('/admin/login')) return 'admin';
  return '';
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '123456',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const detectedRole = getRoleFromPath(location.pathname);

    setRole(detectedRole);

    if (detectedRole) {
      setForm({
        email: roleInfo[detectedRole].demoEmail,
        password: '123456',
      });
    }
  }, [location.pathname]);

  function openRole(nextRole) {
    navigate(`/${nextRole}/login`);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!role) {
      setError('Please choose a portal first.');
      return;
    }

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role,
        }),
      });

      const user = data.user || {
        name: `${role.charAt(0).toUpperCase()}${role.slice(1)} Demo`,
        email: form.email,
        role,
      };

      saveAuth(data.token || 'demo-token', user);
      navigate(getDashboardPath(user.role));
    } catch (error) {
      const demoUser = {
        name: `${role.charAt(0).toUpperCase()}${role.slice(1)} Demo`,
        email: form.email || roleInfo[role].demoEmail,
        role,
      };

      saveAuth('demo-token', demoUser);
      navigate(getDashboardPath(role));
    }
  }

  if (!role) {
    return (
      <main className="authChoicePage">
        <section className="rolePicker">
          <p>Placement Management System</p>
          <h1>Choose your portal</h1>
          <span>Login with the correct role to open your personalized placement workspace.</span>

          <div className="roleGrid">
            <button type="button" onClick={() => openRole('student')}>
              <strong>Student</strong>
              <small>Jobs, profile, applications, AI coach, chat</small>
            </button>

            <button type="button" onClick={() => openRole('recruiter')}>
              <strong>Recruiter</strong>
              <small>Companies, jobs, candidates, chat</small>
            </button>

            <button type="button" onClick={() => openRole('tpo')}>
              <strong>TPO</strong>
              <small>Students, drives, reports, companies</small>
            </button>

            <button type="button" onClick={() => openRole('admin')}>
              <strong>Admin</strong>
              <small>Complete system overview and control</small>
            </button>
          </div>
        </section>
      </main>
    );
  }

  const info = roleInfo[role];

  return (
    <main className="authPage">
      <section className="authInfoPanel">
        <p>Placement Portal</p>
        <h1>Role based access</h1>
        <span>
          Each user gets a different workspace, menu, dashboard, and permission level.
        </span>

        <div className="authRoleButtons">
          <button type="button" onClick={() => openRole('student')}>Student</button>
          <button type="button" onClick={() => openRole('recruiter')}>Recruiter</button>
          <button type="button" onClick={() => openRole('tpo')}>TPO</button>
          <button type="button" onClick={() => openRole('admin')}>Admin</button>
        </div>
      </section>

      <section className="authCard">
        <p>{role} portal</p>
        <h1>{info.title}</h1>
        <span>{info.subtitle}</span>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={info.demoEmail}
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="123456"
            />
          </label>

          {error && <strong className="formError">{error}</strong>}

          <button type="submit">Login as {role}</button>
        </form>

        <p className="authSwitch">
          New user? <Link to={`/${role}/register`}>Create {role} account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
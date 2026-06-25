import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { saveAuth } from '../utils/auth';

function Login() {
  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', form);

      console.log('Login response:', response.data);

      saveAuth(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      console.log('Login error:', err.response?.data || err.message);

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="authPage">
      <form className="authCard" onSubmit={handleSubmit}>
        <p className="eyebrow">Welcome Back</p>
        <h1>Login to your placement portal</h1>

        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="student@test.com"
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
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="authSwitch">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
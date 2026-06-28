import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import api from '../utils/api';
import { getDashboardPath, saveAuth } from '../utils/auth';

function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedRole = searchParams.get('role') || 'student';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: selectedRole,
    department: '',
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
      const response = await api.post('/auth/register', form);
      saveAuth(response.data.token, response.data.user);
      navigate(getDashboardPath(response.data.user.role));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="authPage">
      <form className="authCard wideAuthCard" onSubmit={handleSubmit}>
        <p className="caption">Create Account</p>
        <h1>Register as {form.role}</h1>

        <div className="formGrid">
          <div>
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div>
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" required />
          </div>

          <div>
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
          </div>

          <div>
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
              <option value="tpo">TPO</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label>Department</label>
            <input name="department" value={form.department} onChange={handleChange} />
          </div>

          <div>
            <label>Password</label>
            <input name="password" value={form.password} onChange={handleChange} type="password" required />
          </div>
        </div>

        {error && <p className="errorText">{error}</p>}

        <button className="primaryButton" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="authSwitch">
          Already registered? <Link to="/login">Choose login portal</Link>
        </p>
      </form>
    </main>
  );
}

export default Register;
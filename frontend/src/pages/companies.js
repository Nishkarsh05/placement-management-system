import { useEffect, useState } from 'react';
import api from '../utils/api';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    name: '',
    industry: '',
    website: '',
    location: '',
    description: '',
    hrName: '',
    hrEmail: '',
    hrPhone: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadCompanies = async () => {
    try {
      const { data } = await api.get('/companies');
      setCompanies(data.companies);
    } catch (err) {
      console.log(err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || 'Could not add company');
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('/companies', {
        name: form.name,
        industry: form.industry,
        website: form.website,
        location: form.location,
        description: form.description,
        hrContact: {
          name: form.hrName,
          email: form.hrEmail,
          phone: form.hrPhone,
        },
      });

      setMessage('Company added successfully');
      setForm({
        name: '',
        industry: '',
        website: '',
        location: '',
        description: '',
        hrName: '',
        hrEmail: '',
        hrPhone: '',
      });
      loadCompanies();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add company');
    }
  };

  return (
    <div className="modulePage">
      <h2>Companies</h2>

      <form className="moduleForm" onSubmit={handleSubmit}>
        <input name="name" placeholder="Company Name" value={form.name} onChange={handleChange} required />
        <input name="industry" placeholder="Industry" value={form.industry} onChange={handleChange} />
        <input name="website" placeholder="Website" value={form.website} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="hrName" placeholder="HR Name" value={form.hrName} onChange={handleChange} />
        <input name="hrEmail" placeholder="HR Email" value={form.hrEmail} onChange={handleChange} />
        <input name="hrPhone" placeholder="HR Phone" value={form.hrPhone} onChange={handleChange} />

        {message && <p className="successText">{message}</p>}
        {error && <p className="errorText">{error}</p>}

        <button className="primaryButton" type="submit">Add Company</button>
      </form>

      <section className="listGrid">
        {companies.map((company) => (
          <article className="listCard" key={company._id}>
            <h3>{company.name}</h3>
            <p>{company.industry || 'Industry not added'}</p>
            <p>{company.location || 'Location not added'}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Companies;
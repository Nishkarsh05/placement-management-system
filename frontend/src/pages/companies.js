import { useEffect, useState } from 'react';
import api from '../utils/api';

const initialCompany = {
  name: '',
  industry: '',
  website: '',
  location: '',
  description: '',
  hrName: '',
  hrEmail: '',
  hrPhone: '',
};

function Companies() {
  const [form, setForm] = useState(initialCompany);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadCompanies = async () => {
    try {
      const response = await api.get('/companies');
      setCompanies(response.data.companies || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load companies');
    }
  };

  useEffect(() => {
    loadCompanies();
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
      await api.post('/companies', form);
      setForm(initialCompany);
      setMessage('Company added successfully');
      loadCompanies();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add company');
    }
  };

  const demoCompanies = [
    { name: 'TCS', industry: 'IT Services', location: 'Bangalore', hrEmail: 'hr@tcs.com' },
    { name: 'Infosys', industry: 'Technology', location: 'Pune', hrEmail: 'hr@infosys.com' },
    { name: 'Amazon', industry: 'Cloud and Ecommerce', location: 'Hyderabad', hrEmail: 'campus@amazon.com' },
  ];

  const list = companies.length ? companies : demoCompanies;

  return (
    <div className="pageBlock">
      <div className="pageHeader">
        <div>
          <p className="eyebrow">Recruiting Partners</p>
          <h2>Companies</h2>
        </div>
      </div>

      <form className="panel formPanel" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Company Name" required />
        <input name="industry" value={form.industry} onChange={handleChange} placeholder="Industry" />
        <input name="website" value={form.website} onChange={handleChange} placeholder="Website" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="hrName" value={form.hrName} onChange={handleChange} placeholder="HR Name" />
        <input name="hrEmail" value={form.hrEmail} onChange={handleChange} placeholder="HR Email" />
        <input name="hrPhone" value={form.hrPhone} onChange={handleChange} placeholder="HR Phone" />

        {message && <p className="successText">{message}</p>}
        {error && <p className="softWarning">{error}. Showing demo data if available.</p>}

        <button className="primaryButton" type="submit">Add Company</button>
      </form>

      <div className="cardGrid">
        {list.map((company, index) => (
          <div className="miniCard" key={company._id || index}>
            <h3>{company.name}</h3>
            <p>{company.industry || 'Technology'}</p>
            <span>{company.location || 'Campus hiring'}</span>
            <small>{company.hrEmail || 'No HR email added'}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;
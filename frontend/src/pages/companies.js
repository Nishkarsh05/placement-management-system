import { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import { getUser } from '../utils/auth';

const emptyCompany = {
  name: '',
  industry: '',
  website: '',
  location: '',
  description: '',
  hrName: '',
  hrEmail: '',
  hrPhone: '',
};

const demoCompanies = [
  { _id: 'c1', name: 'TCS', industry: 'IT Services', website: 'https://www.tcs.com', location: 'Bangalore', description: 'Recruiting partner for software and trainee roles.', hrName: 'Rahul HR', hrEmail: 'hr@tcs.com', hrPhone: '9999999999' },
  { _id: 'c2', name: 'Infosys', industry: 'Technology', website: 'https://www.infosys.com', location: 'Pune', description: 'Campus partner for engineering graduates.', hrName: 'Priya HR', hrEmail: 'hr@infosys.com', hrPhone: '8888888888' },
  { _id: 'c3', name: 'Amazon', industry: 'Cloud and Ecommerce', website: 'https://www.amazon.jobs', location: 'Hyderabad', description: 'Hiring cloud support and analyst interns.', hrName: 'Campus HR', hrEmail: 'campus@amazon.com', hrPhone: '7777777777' },
];

function Companies() {
  const user = getUser() || {};
  const role = String(user.role || 'student').toLowerCase();
  const canAddCompany = role === 'recruiter';
  const isAdmin = role === 'admin';
  const isTpo = role === 'tpo';

  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState(emptyCompany);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      const data = await apiRequest('/companies');
      const list = Array.isArray(data) ? data : data.companies;
      setCompanies(Array.isArray(list) && list.length ? list : demoCompanies);
    } catch (error) {
      setCompanies(demoCompanies);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canAddCompany) {
      setNotice('Only recruiters can add company records.');
      return;
    }

    if (!form.name || !form.industry || !form.location) {
      setNotice('Fill company name, industry, and location.');
      return;
    }

    const newCompany = { ...form, _id: `local-${Date.now()}` };

    try {
      const saved = await apiRequest('/companies', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setCompanies((current) => [saved.company || saved, ...current]);
      setNotice('Company added successfully.');
    } catch (error) {
      setCompanies((current) => [newCompany, ...current]);
      setNotice('Company added locally.');
    }

    setForm(emptyCompany);
  }

  return (
    <div className="pageStack">
      <section className="pageHero">
        <div>
          <p className="eyebrow">Recruiting Partners</p>
          <h1>{isAdmin ? 'Company Enrollment Log' : canAddCompany ? 'My Company' : 'Companies'}</h1>
          <p>
            {isAdmin
              ? 'View every enrolled company and recruiter contact. Admin cannot create recruiter company records.'
              : canAddCompany
              ? 'Create and maintain your company profile for job postings.'
              : 'View recruiting partners and company hiring details.'}
          </p>
        </div>
      </section>

      {notice && <div className="noticeBox">{notice}</div>}

      {canAddCompany && (
        <section className="formSurface">
          <div className="sectionHeader"><div><p className="eyebrow">Company Profile</p><h2>Add Company</h2></div></div>
          <form className="spaciousForm" onSubmit={handleSubmit}>
            <label>Company Name<input name="name" value={form.name} onChange={handleChange} placeholder="Example: TCS" /></label>
            <label>Industry<input name="industry" value={form.industry} onChange={handleChange} placeholder="IT Services" /></label>
            <label>Website<input name="website" value={form.website} onChange={handleChange} placeholder="https://company.com" /></label>
            <label>Location<input name="location" value={form.location} onChange={handleChange} placeholder="Bangalore" /></label>
            <label className="fullSpan">Description<textarea name="description" value={form.description} onChange={handleChange} placeholder="Hiring details" /></label>
            <label>HR Name<input name="hrName" value={form.hrName} onChange={handleChange} placeholder="HR name" /></label>
            <label>HR Email<input name="hrEmail" value={form.hrEmail} onChange={handleChange} placeholder="hr@company.com" /></label>
            <label>HR Phone<input name="hrPhone" value={form.hrPhone} onChange={handleChange} placeholder="Contact number" /></label>
            <div className="formActions fullSpan"><button className="primaryButton" type="submit">Add Company</button></div>
          </form>
        </section>
      )}

      {(isAdmin || isTpo) && (
        <section className="infoPanel">
          <p className="eyebrow">Read Only Access</p>
          <h2>{isAdmin ? 'Admin Company Log' : 'TPO Company Monitoring'}</h2>
          <p>{isAdmin ? 'Admin can audit company records but adding companies belongs to recruiters.' : 'TPO can monitor companies for placement coordination.'}</p>
        </section>
      )}

      <section className="dataCard">
        <div className="sectionHeader">
          <div><p className="eyebrow">Directory</p><h2>Company Network</h2></div>
          <span className="countPill">{companies.length} companies</span>
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr><th>Company</th><th>Industry</th><th>Location</th><th>HR Contact</th><th>Website</th></tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id || company.name}>
                  <td><strong>{company.name}</strong><br /><span>{company.description || 'No description'}</span></td>
                  <td>{company.industry}</td>
                  <td>{company.location}</td>
                  <td>{company.hrName || 'Not added'}<br />{company.hrEmail || 'No email'}</td>
                  <td>{company.website ? <a href={company.website} target="_blank" rel="noreferrer">Open</a> : 'Not added'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Companies;
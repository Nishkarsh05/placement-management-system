import { useEffect, useState } from 'react';
import api from '../utils/api';

const initialProfile = {
  address: '',
  linkedIn: '',
  github: '',
  university: '',
  course: '',
  branch: '',
  cgpa: '',
  passingYear: '',
  activeBacklogs: '',
  skills: '',
  certifications: '',
  resumeTitle: '',
  resumeUrl: '',
};

function Profile() {
  const [form, setForm] = useState(initialProfile);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get('/students/profile');
        if (response.data.profile) {
          setForm({
            ...initialProfile,
            ...response.data.profile,
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load profile');
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('/students/profile', form);
      setMessage('Profile saved successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save profile');
    }
  };

  return (
    <div className="pageBlock">
      <div className="pageHeader">
        <div>
          <p className="eyebrow">Student Details</p>
          <h2>Student Profile</h2>
        </div>
      </div>

      <form className="panel formPanel" onSubmit={handleSubmit}>
        <input name="address" value={form.address || ''} onChange={handleChange} placeholder="Address" />
        <input name="linkedIn" value={form.linkedIn || ''} onChange={handleChange} placeholder="LinkedIn" />
        <input name="github" value={form.github || ''} onChange={handleChange} placeholder="GitHub" />
        <input name="university" value={form.university || ''} onChange={handleChange} placeholder="University" />
        <input name="course" value={form.course || ''} onChange={handleChange} placeholder="Course" />
        <input name="branch" value={form.branch || ''} onChange={handleChange} placeholder="Branch" />
        <input name="cgpa" value={form.cgpa || ''} onChange={handleChange} placeholder="CGPA" />
        <input name="passingYear" value={form.passingYear || ''} onChange={handleChange} placeholder="Passing Year" />
        <input name="activeBacklogs" value={form.activeBacklogs || ''} onChange={handleChange} placeholder="Active Backlogs" />
        <input name="skills" value={form.skills || ''} onChange={handleChange} placeholder="Skills: React, Node, MongoDB" />
        <input name="certifications" value={form.certifications || ''} onChange={handleChange} placeholder="Certifications" />
        <input name="resumeTitle" value={form.resumeTitle || ''} onChange={handleChange} placeholder="Resume Title" />
        <input name="resumeUrl" value={form.resumeUrl || ''} onChange={handleChange} placeholder="Resume URL" />

        {message && <p className="successText">{message}</p>}
        {error && <p className="errorText">{error}</p>}

        <button className="primaryButton" type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default Profile;
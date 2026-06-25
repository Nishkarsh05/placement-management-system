import { useEffect, useState } from 'react';
import api from '../utils/api';

function Profile() {
  const [form, setForm] = useState({
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
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await api.get('/students/profile');
        const p = data.profile;

        setForm({
          address: p.personalDetails?.address || '',
          linkedIn: p.personalDetails?.linkedIn || '',
          github: p.personalDetails?.github || '',
          university: p.academicInfo?.university || '',
          course: p.academicInfo?.course || '',
          branch: p.academicInfo?.branch || '',
          cgpa: p.academicInfo?.cgpa || '',
          passingYear: p.academicInfo?.passingYear || '',
          activeBacklogs: p.academicInfo?.activeBacklogs || '',
          skills: p.skills?.join(', ') || '',
          certifications: p.certifications?.join(', ') || '',
          resumeTitle: p.resume?.title || '',
          resumeUrl: p.resume?.url || '',
        });
      } catch (err) {
  console.log(err.response?.data || err.message);
  setError(err.response?.data?.message || err.message || 'Could not load profile');
}
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toList = (text) => {
    return text
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.put('/students/profile', {
        personalDetails: {
          address: form.address,
          linkedIn: form.linkedIn,
          github: form.github,
        },
        academicInfo: {
          university: form.university,
          course: form.course,
          branch: form.branch,
          cgpa: Number(form.cgpa),
          passingYear: Number(form.passingYear),
          activeBacklogs: Number(form.activeBacklogs),
        },
        skills: toList(form.skills),
        certifications: toList(form.certifications),
        resume: {
          title: form.resumeTitle,
          url: form.resumeUrl,
          uploadedAt: new Date(),
        },
      });

      setMessage('Profile saved successfully');
    } catch (err) {
  console.log(err.response?.data || err.message);
  setError(err.response?.data?.message || err.message || 'Could not save profile');
}
  };

  return (
    <div className="profilePage">
      <h2>Student Profile</h2>

      <form className="profileForm" onSubmit={handleSubmit}>
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="linkedIn" placeholder="LinkedIn" value={form.linkedIn} onChange={handleChange} />
        <input name="github" placeholder="GitHub" value={form.github} onChange={handleChange} />

        <input name="university" placeholder="University" value={form.university} onChange={handleChange} />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />
        <input name="branch" placeholder="Branch" value={form.branch} onChange={handleChange} />
        <input name="cgpa" placeholder="CGPA" value={form.cgpa} onChange={handleChange} />
        <input name="passingYear" placeholder="Passing Year" value={form.passingYear} onChange={handleChange} />
        <input name="activeBacklogs" placeholder="Active Backlogs" value={form.activeBacklogs} onChange={handleChange} />

        <input name="skills" placeholder="Skills: React, Node, MongoDB" value={form.skills} onChange={handleChange} />
        <input name="certifications" placeholder="Certifications" value={form.certifications} onChange={handleChange} />

        <input name="resumeTitle" placeholder="Resume Title" value={form.resumeTitle} onChange={handleChange} />
        <input name="resumeUrl" placeholder="Resume URL" value={form.resumeUrl} onChange={handleChange} />

        {message && <p className="successText">{message}</p>}
        {error && <p className="errorText">{error}</p>}

        <button className="primaryButton" type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
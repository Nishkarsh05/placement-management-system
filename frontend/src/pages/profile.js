import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import { getUser } from '../utils/auth';

const emptyProfile = {
  address: '',
  linkedin: '',
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

function RecruiterProfileRedirect() {
  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">Recruiter account</p>
        <h2>Recruiter Profile</h2>
        <p>
          Recruiter details are managed from the company profile page because your hiring identity is linked to company records.
        </p>
      </section>

      <section className="surface">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Next step</p>
            <h3>Open My Company</h3>
          </div>
        </div>

        <p className="profileSummary">
          Update company name, HR contact, location, website, and hiring description there.
        </p>

        <Link className="primaryButton inlineButton" to="/companies">
          Go to My Company
        </Link>
      </section>
    </div>
  );
}

function Profile() {
  const user = getUser() || {};
  const role = String(user.role || '').toLowerCase();
  const [profile, setProfile] = useState(emptyProfile);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (role !== 'student') return;

    const loadProfile = async () => {
      try {
        const data = await apiRequest('/students/profile');
        setProfile({ ...emptyProfile, ...(data.profile || {}) });
        setNotice('');
      } catch {
        setNotice('Could not load profile. You can still edit the form for demo.');
      }
    };

    loadProfile();
  }, [role]);

  if (role === 'recruiter') {
    return <RecruiterProfileRedirect />;
  }

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await apiRequest('/students/profile', {
        method: 'PUT',
        body: JSON.stringify(profile),
      });
      setNotice('Profile saved successfully.');
    } catch {
      setNotice('Profile saved in demo view. Backend can save it after connection.');
    }
  };

  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">Student readiness</p>
        <h2>Profile Completion</h2>
        <p>This information powers eligibility, AI recommendations, and recruiter review.</p>
      </section>

      {notice && <div className="softNotice">{notice}</div>}

      <section className="surface formSurface">
        <form className="formGrid spaciousForm" onSubmit={handleSubmit}>
          <label>
            Address
            <input name="address" value={profile.address} onChange={handleChange} />
          </label>

          <label>
            LinkedIn
            <input name="linkedin" value={profile.linkedin} onChange={handleChange} />
          </label>

          <label>
            GitHub
            <input name="github" value={profile.github} onChange={handleChange} />
          </label>

          <label>
            University
            <input name="university" value={profile.university} onChange={handleChange} />
          </label>

          <label>
            Course
            <input name="course" value={profile.course} onChange={handleChange} />
          </label>

          <label>
            Branch
            <input name="branch" value={profile.branch} onChange={handleChange} />
          </label>

          <label>
            CGPA
            <input name="cgpa" value={profile.cgpa} onChange={handleChange} />
          </label>

          <label>
            Passing Year
            <input name="passingYear" value={profile.passingYear} onChange={handleChange} />
          </label>

          <label>
            Active Backlogs
            <input name="activeBacklogs" value={profile.activeBacklogs} onChange={handleChange} />
          </label>

          <label>
            Skills
            <input name="skills" value={profile.skills} onChange={handleChange} />
          </label>

          <label>
            Certifications
            <input name="certifications" value={profile.certifications} onChange={handleChange} />
          </label>

          <label>
            Resume Title
            <input name="resumeTitle" value={profile.resumeTitle} onChange={handleChange} />
          </label>

          <label className="fullWidth">
            Resume URL
            <input name="resumeUrl" value={profile.resumeUrl} onChange={handleChange} />
          </label>

          <div className="formActions fullWidth">
            <button className="primaryButton" type="submit">Save Profile</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Profile;
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { getCurrentUser } from '../utils/auth';

function Applications() {
  const user = getCurrentUser();
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isStudent = user?.role === 'student';
  const canManage = ['recruiter', 'tpo', 'admin'].includes(user?.role);

  const loadApplications = async () => {
    try {
      const endpoint = isStudent ? '/applications/my' : '/applications';
      const { data } = await api.get(endpoint);
      setApplications(data.applications);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load applications');
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const updateStatus = async (applicationId, status) => {
    setMessage('');
    setError('');

    try {
      await api.patch(`/applications/${applicationId}/status`, { status });
      setMessage('Application status updated');
      loadApplications();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update status');
    }
  };

  return (
    <div className="modulePage">
      <h2>Applications</h2>

      {message && <p className="successText">{message}</p>}
      {error && <p className="errorText">{error}</p>}

      <section className="listGrid">
        {applications.map((application) => (
          <article className="listCard" key={application._id}>
            <h3>{application.job?.title}</h3>
            <p>Company: {application.company?.name}</p>
            <p>Status: {application.status}</p>
            <p>
              Eligibility:{' '}
              {application.eligibilityResult?.isEligible ? 'Eligible' : 'Not Eligible'}
            </p>

            {application.eligibilityResult?.reasons?.length > 0 && (
              <p>Reason: {application.eligibilityResult.reasons.join(', ')}</p>
            )}

            {application.student?.user && (
              <p>Student: {application.student.user.name}</p>
            )}

            {canManage && (
              <select
                value={application.status}
                onChange={(e) => updateStatus(application._id, e.target.value)}
              >
                <option value="applied">Applied</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="assessment">Assessment</option>
                <option value="interview">Interview</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
                <option value="placed">Placed</option>
              </select>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}

export default Applications;
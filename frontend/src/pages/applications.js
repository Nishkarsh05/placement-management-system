import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../utils/api';
import { getUser } from '../utils/auth';

const demoApplications = [
  {
    _id: 'a1',
    student: 'Student Demo',
    email: 'student@test.com',
    role: 'Frontend Developer',
    company: 'TCS',
    appliedDate: '27 Jun 2026',
    status: 'Applied',
    interviewDate: '',
    message: 'Your application has been submitted and is waiting for recruiter review.',
  },
  {
    _id: 'a2',
    student: 'Student Demo',
    email: 'student@test.com',
    role: 'MERN Stack Intern',
    company: 'Infosys',
    appliedDate: '25 Jun 2026',
    status: 'Interview',
    interviewDate: '30 Jun 2026, 11:00 AM',
    message: 'You have been shortlisted for a technical interview.',
  },
  {
    _id: 'a3',
    student: 'Student Demo',
    email: 'student@test.com',
    role: 'Cloud Associate',
    company: 'Amazon',
    appliedDate: '22 Jun 2026',
    status: 'Selected',
    interviewDate: '',
    message: 'Congratulations. You have been selected for the next placement step.',
  },
];

const statusSteps = ['Applied', 'Reviewed', 'Shortlisted', 'Interview', 'Selected'];

const statusClass = {
  Applied: 'statusNew',
  Reviewed: 'statusReviewed',
  Shortlisted: 'statusShortlisted',
  Interview: 'statusInterview',
  Selected: 'statusSelected',
  Rejected: 'statusRejected',
};

function normalizeStatus(status) {
  const clean = String(status || 'Applied').toLowerCase();

  if (clean === 'applied') return 'Applied';
  if (clean === 'reviewed') return 'Reviewed';
  if (clean === 'shortlisted') return 'Shortlisted';
  if (clean === 'interview') return 'Interview';
  if (clean === 'selected') return 'Selected';
  if (clean === 'rejected') return 'Rejected';

  return 'Applied';
}

function getStatusMessage(status) {
  if (status === 'Applied') return 'Your application is submitted and waiting for recruiter review.';
  if (status === 'Reviewed') return 'Recruiter has reviewed your application.';
  if (status === 'Shortlisted') return 'You are shortlisted. Interview details may be shared soon.';
  if (status === 'Interview') return 'Interview round is scheduled or in progress.';
  if (status === 'Selected') return 'Congratulations. You have been selected.';
  if (status === 'Rejected') return 'This application was not selected for the next stage.';
  return 'Application status is being updated.';
}

function normalizeApplication(application, user) {
  const status = normalizeStatus(application.status);

  return {
    _id: application._id || application.jobId || Date.now().toString(),
    student: application.student?.name || application.student || user.name || 'Student Demo',
    email: application.student?.email || application.email || user.email || 'student@test.com',
    role: application.job?.title || application.role || 'Not assigned',
    company:
      application.company?.name ||
      application.companyName ||
      application.company ||
      'Company not assigned',
    appliedDate: application.createdAt
      ? new Date(application.createdAt).toLocaleDateString()
      : application.appliedDate || new Date().toLocaleDateString(),
    status,
    interviewDate: application.interviewDate
      ? new Date(application.interviewDate).toLocaleString()
      : application.interviewDate || '',
    message: application.message || application.recruiterNote || getStatusMessage(status),
  };
}

function StatusTimeline({ status }) {
  if (status === 'Rejected') {
    return (
      <div className="applicationTimeline rejectedTimeline">
        <span className="done">Applied</span>
        <span className="done">Reviewed</span>
        <span className="rejected">Rejected</span>
      </div>
    );
  }

  const currentIndex = statusSteps.indexOf(status);

  return (
    <div className="applicationTimeline">
      {statusSteps.map((step, index) => (
        <span
          key={step}
          className={index <= currentIndex ? 'done' : ''}
        >
          {step}
        </span>
      ))}
    </div>
  );
}

function Applications() {
  const user = getUser() || {};
  const role = String(user.role || 'student').toLowerCase();
  const isStudent = role === 'student';

  const [applications, setApplications] = useState([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const loadApplications = async () => {
      const localApplications = JSON.parse(localStorage.getItem('studentApplications') || '[]');

      try {
        const data = await apiRequest('/applications');
        const list = data.applications || data || [];
        const merged = isStudent && localApplications.length ? localApplications : list;

        if (!merged.length) {
          setApplications(demoApplications.map((item) => normalizeApplication(item, user)));
          setNotice('Showing sample application statuses.');
          return;
        }

        setApplications(merged.map((item) => normalizeApplication(item, user)));
        setNotice('');
      } catch {
        const fallback = localApplications.length ? localApplications : demoApplications;
        setApplications(fallback.map((item) => normalizeApplication(item, user)));
        setNotice(localApplications.length ? '' : 'Showing sample application statuses.');
      }
    };

    loadApplications();
  }, [isStudent, user]);

  const summary = useMemo(() => {
    return {
      total: applications.length,
      interview: applications.filter((item) => item.status === 'Interview').length,
      selected: applications.filter((item) => item.status === 'Selected').length,
      pending: applications.filter((item) =>
        ['Applied', 'Reviewed', 'Shortlisted'].includes(item.status)
      ).length,
    };
  }, [applications]);

  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">Pipeline</p>
        <h2>{isStudent ? 'My Applications' : 'Applications'}</h2>
        <p>
          {isStudent
            ? 'Track where you applied, interview updates, and selection status.'
            : 'Review student applications and hiring decisions in one place.'}
        </p>
      </section>

      {notice && <div className="softNotice">{notice}</div>}

      <section className="metricGrid">
        <div className="metricCard">
          <span>Total Applications</span>
          <strong>{summary.total}</strong>
          <p>Submitted requests</p>
        </div>
        <div className="metricCard">
          <span>Pending Review</span>
          <strong>{summary.pending}</strong>
          <p>Waiting for decision</p>
        </div>
        <div className="metricCard">
          <span>Interview</span>
          <strong>{summary.interview}</strong>
          <p>Interview stage</p>
        </div>
        <div className="metricCard">
          <span>Selected</span>
          <strong>{summary.selected}</strong>
          <p>Final selection</p>
        </div>
      </section>

      <section className="surface">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Application records</p>
            <h3>{isStudent ? 'Status Tracker' : 'Application Table'}</h3>
          </div>
          <span className="countPill">{applications.length} records</span>
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr>
                {!isStudent && <th>Student</th>}
                <th>Role</th>
                <th>Company</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Interview / Message</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  {!isStudent && <td>{application.student}</td>}
                  <td>{application.role}</td>
                  <td>{application.company}</td>
                  <td>{application.appliedDate}</td>
                  <td>
                    <span className={`decisionBadge ${statusClass[application.status] || ''}`}>
                      {application.status}
                    </span>
                  </td>
                  <td>
                    <strong>{application.interviewDate || 'No interview date yet'}</strong>
                    <p className="tableNote">{application.message}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isStudent && (
        <section className="applicationCards">
          {applications.map((application) => (
            <article className="applicationCard" key={`card-${application._id}`}>
              <div className="applicationCardHeader">
                <div>
                  <p className="eyebrow">{application.company}</p>
                  <h3>{application.role}</h3>
                </div>
                <span className={`decisionBadge ${statusClass[application.status] || ''}`}>
                  {application.status}
                </span>
              </div>

              <StatusTimeline status={application.status} />

              <div className="applicationMessage">
                <strong>{application.interviewDate || 'Update'}</strong>
                <p>{application.message}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default Applications;
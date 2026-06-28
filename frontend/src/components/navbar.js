import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../utils/auth';

const titles = {
  '/student/dashboard': ['Student Dashboard', 'Your placement workspace'],
  '/recruiter/dashboard': ['Recruiter Dashboard', 'Hiring pipeline overview'],
  '/tpo/dashboard': ['TPO Dashboard', 'Campus placement control room'],
  '/admin/dashboard': ['Admin Dashboard', 'System overview'],
  '/profile': ['Profile', 'Student profile and resume'],
  '/student/profile': ['Profile', 'Student profile and resume'],
  '/students': ['Students', 'Student records'],
  '/candidates': ['Candidates', 'Recruitment pipeline'],
  '/companies': ['Company', 'Recruiting partner details'],
  '/jobs': ['Jobs', 'Open roles and hiring criteria'],
  '/applications': ['Applications', 'Track applications and decisions'],
  '/reports': ['Reports', 'Placement analytics'],
  '/ai-insights': ['AI Assistant', 'Smart placement support'],
  '/chat': ['Chat', 'Student recruiter communication'],
};

const pages = [
  { label: 'Dashboard', path: '/dashboard', keywords: 'home overview stats' },
  { label: 'Profile', path: '/profile', keywords: 'student resume details' },
  { label: 'Candidates', path: '/candidates', keywords: 'students applicants shortlist reject select' },
  { label: 'Students', path: '/students', keywords: 'student records directory' },
  { label: 'Company', path: '/companies', keywords: 'company recruiter hr partner' },
  { label: 'Jobs', path: '/jobs', keywords: 'post jobs roles package eligibility' },
  { label: 'Applications', path: '/applications', keywords: 'pipeline applied status decisions' },
  { label: 'AI Assistant', path: '/ai-insights', keywords: 'gemini interview questions resume roadmap' },
  { label: 'Reports', path: '/reports', keywords: 'chart analytics placement report' },
  { label: 'Chat', path: '/chat', keywords: 'message students recruiters' },
];

function getAccountPath(role) {
  if (role === 'recruiter') return '/companies';
  if (role === 'student') return '/profile';
  if (role === 'tpo') return '/reports';
  if (role === 'admin') return '/dashboard';
  return '/dashboard';
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser() || {};
  const role = String(user.role || '').toLowerCase();
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);

  const [title, subtitle] = titles[location.pathname] || ['Placement Portal', 'Management system'];

  const filteredPages = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return pages.slice(0, 6);

    return pages.filter((page) => {
      return `${page.label} ${page.keywords}`.toLowerCase().includes(cleanQuery);
    });
  }, [query]);

  const goToPage = (path) => {
    setShowSearch(false);
    setQuery('');
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goToAi = (type) => {
    setShowAiPanel(false);
    navigate('/ai-insights', { state: { aiAction: type } });
  };

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Placement Management System</p>
        <h1>{title}</h1>
        <span className="topSubtitle">{subtitle}</span>
      </div>

      <div className="topActions">
        <div className="searchBox">
          <input
            className="searchInput"
            placeholder="Search pages"
            value={query}
            onFocus={() => setShowSearch(true)}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowSearch(true);
            }}
          />

          {showSearch && (
            <div className="searchDropdown">
              {filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <button key={page.path} type="button" onClick={() => goToPage(page.path)}>
                    <strong>{page.label}</strong>
                    <span>{page.keywords}</span>
                  </button>
                ))
              ) : (
                <div className="emptySearch">No page found</div>
              )}
            </div>
          )}
        </div>

        <div className="aiTopBox">
          <button
            className="iconButton"
            type="button"
            title="AI assistant"
            onClick={() => setShowAiPanel((current) => !current)}
          >
            ✦
          </button>

          {showAiPanel && (
            <div className="aiTopPanel">
              <p className="eyebrow">AI Assistant</p>
              <h4>Quick Actions</h4>
              <button type="button" onClick={() => goToAi('interview-questions')}>
                Generate interview questions
              </button>
              <button type="button" onClick={() => goToAi('resume-feedback')}>
                Review resume
              </button>
              <button type="button" onClick={() => goToAi('career-roadmap')}>
                Create career roadmap
              </button>
            </div>
          )}
        </div>

        <button className="userButton" type="button" onClick={() => navigate(getAccountPath(role))}>
          ◎ {user.name || 'Account'}
        </button>

        <button className="iconButton" type="button" onClick={handleLogout} title="Logout">
          ↪
        </button>
      </div>
    </header>
  );
}

export default Navbar;
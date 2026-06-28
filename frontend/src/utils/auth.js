export const saveAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
  try {
    const saved = localStorage.getItem('user');
    if (!saved || saved === 'undefined') return null;
    return JSON.parse(saved);
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

export const getCurrentUser = () => getUser();

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getDashboardPath = (role) => {
  const cleanRole = String(role || '').toLowerCase();

  if (cleanRole === 'recruiter') return '/recruiter/dashboard';
  if (cleanRole === 'tpo') return '/tpo/dashboard';
  if (cleanRole === 'admin') return '/admin/dashboard';
  return '/student/dashboard';
};
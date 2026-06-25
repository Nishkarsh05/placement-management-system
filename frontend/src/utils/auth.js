export const saveAuth = (token, user) => {
  if (token) {
    localStorage.setItem('token', token);
  }

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const user = localStorage.getItem('user');

  if (!user || user === 'undefined' || user === 'null') {
    localStorage.removeItem('user');
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    localStorage.removeItem('user');
    return null;
  }
};

export const getCurrentUser = () => {
  return getUser();
};

export const getDashboardPath = (role) => {
  if (role === 'student') return '/dashboard';
  if (role === 'recruiter') return '/dashboard';
  if (role === 'tpo') return '/dashboard';
  if (role === 'admin') return '/dashboard';

  return '/dashboard';
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
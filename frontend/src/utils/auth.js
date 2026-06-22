export const dashboardByRole = {
  student: '/student/dashboard',
  recruiter: '/recruiter/dashboard',
  tpo: '/tpo/dashboard',
  admin: '/admin/dashboard',
};

export const saveAuth = ({ token, user }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const getCurrentUser = () => {
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : null;
};

export const getToken = () => localStorage.getItem('token');

export const getDashboardPath = (role) => dashboardByRole[role] || '/student/dashboard';

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
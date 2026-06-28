import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../utils/api';

const starterUsers = [
  { id: 'u1', name: 'Student Demo', email: 'student@test.com', role: 'student', status: 'active', department: 'CSE' },
  { id: 'u2', name: 'Recruiter Demo', email: 'recruiter@test.com', role: 'recruiter', status: 'active', department: 'Hiring' },
  { id: 'u3', name: 'TPO Demo', email: 'tpo@test.com', role: 'tpo', status: 'active', department: 'Placement Cell' },
  { id: 'u4', name: 'New Recruiter', email: 'newrecruiter@test.com', role: 'recruiter', status: 'pending', department: 'HR' },
];

function readUsers() {
  try {
    const saved = JSON.parse(localStorage.getItem('adminUsers'));
    return Array.isArray(saved) && saved.length ? saved : starterUsers;
  } catch (error) {
    return starterUsers;
  }
}

function AdminUsers() {
  const [users, setUsers] = useState(readUsers);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await apiRequest('/admin/users');
        const list = Array.isArray(data) ? data : data.users;
        if (Array.isArray(list) && list.length) {
          setUsers(list.map((user) => ({ ...user, id: user._id || user.id })));
        }
      } catch (error) {
        setNotice('Backend user API not connected. Admin actions are saved locally for presentation.');
      }
    }
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole = filter === 'all' || user.role === filter || user.status === filter;
      const text = `${user.name} ${user.email} ${user.role} ${user.status}`.toLowerCase();
      return matchesRole && text.includes(search.toLowerCase());
    });
  }, [users, filter, search]);

  function updateUser(id, changes) {
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, ...changes } : user)));
  }

  function removeUser(id) {
    const confirmed = window.confirm('Remove this user from the system?');
    if (!confirmed) return;
    setUsers((current) => current.filter((user) => user.id !== id));
    setNotice('User removed.');
  }

  async function syncAction(id, changes, message) {
    updateUser(id, changes);
    setNotice(message);

    try {
      await apiRequest(`/admin/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
      });
    } catch (error) {
      setNotice(`${message} Saved locally because backend admin route is not connected.`);
    }
  }

  return (
    <div className="pageStack">
      <section className="pageHero">
        <div><p className="eyebrow">Access Control</p><h1>User Management</h1><p>Approve recruiters, manage roles, deactivate accounts, and keep the portal clean.</p></div>
      </section>

      {notice && <div className="noticeBox">{notice}</div>}

      <section className="dataCard">
        <div className="adminToolbar">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search users by name, email, role" />
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="all">All users</option>
            <option value="student">Students</option>
            <option value="recruiter">Recruiters</option>
            <option value="tpo">TPO</option>
            <option value="admin">Admins</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Department</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select value={user.role} onChange={(event) => syncAction(user.id, { role: event.target.value }, 'Role updated.')}>
                      <option value="student">Student</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="tpo">TPO</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td><span className={`statusBadge ${user.status}`}>{user.status}</span></td>
                  <td>{user.department || 'Not added'}</td>
                  <td>
                    <div className="rowActions">
                      {user.status === 'pending' && <button onClick={() => syncAction(user.id, { status: 'active' }, 'Recruiter approved.')}>Approve</button>}
                      {user.status !== 'inactive' && <button onClick={() => syncAction(user.id, { status: 'inactive' }, 'User deactivated.')}>Deactivate</button>}
                      {user.status === 'inactive' && <button onClick={() => syncAction(user.id, { status: 'active' }, 'User reactivated.')}>Reactivate</button>}
                      <button className="dangerButton" onClick={() => removeUser(user.id)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminUsers;
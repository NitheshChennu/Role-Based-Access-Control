import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usersApi } from '../services/api';
import { useApi } from '../hooks/useApi';
import '../styles/UserManagement.css';
import { mockUsers } from '../data/mockData';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
  });
  const [error, setError] = useState(''); 

  const { execute: fetchUsers, loading: loadingUsers } = useApi(usersApi?.getUsers);
  const { execute: createUser, loading: creatingUser } = useApi(usersApi?.createUser);
  const { execute: updateUser } = useApi(usersApi?.updateUser);
  const { execute: deleteUser } = useApi(usersApi?.deleteUser);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const lowercaseQuery = searchQuery.toLowerCase().trim();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery) ||
        user.role.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const loadUsers = async () => {
    let apiData = [];
    try {
      const data = await fetchUsers();
      if (data) {
        apiData = data;
      }
    } catch (error) {
      console.error('Error fetching API users:', error);
    }

    const combinedUsers = [...mockUsers, ...apiData];
    setUsers(combinedUsers);
  };
  //validation for name
  const validateFullName = (name) => {
    const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    return nameRegex.test(name);
  };

  //handle Add user
  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!validateFullName(newUser.name)) {
      setError('Only letters and spaces are allowed');
      return;
    }

    const isDuplicateEmail = users.some(
      (user) => user.email.toLowerCase() === newUser.email.toLowerCase()
    );
    const isDuplicateName = users.some(
      (user) => user.name.toLowerCase() === newUser.name.toLowerCase()
    );

    if (isDuplicateEmail) {
      setError('email');
      return;
    }

    if (isDuplicateName) {
      setError('name');
      return;
    }

    setError('');

    if (usersApi && usersApi.createUser) {
      const data = await createUser(newUser);
      if (data) {
        setUsers((prevUsers) => [...prevUsers, data]);
      }
    } else {
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...newUser, id: prevUsers.length + 1 },
      ]);
    }
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      status: 'active',
    });
  };

  const handleUpdateUser = async (userId, updatedData) => {
    try {
      let updatedUser = null;
  
      if (usersApi?.updateUser) {
        updatedUser = await updateUser(userId, updatedData);
      }
  
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            const updated = { ...user, ...updatedData };
            updatedUser = updatedUser || updated; 
            return updated;
          }
          return user;
        })
      );
      if (updatedUser) {
        console.log(`User updated:`, updatedUser);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };  

  const handleToggleStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
  };

  const handleDeleteUser = async (userId) => {
    if (usersApi && usersApi.deleteUser) {
      const data = await deleteUser(userId);
      if (data) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    } else {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    }
  };

  const StatusBadge = ({ status }) => (
    <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
  );

  if (loadingUsers) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>User Management</h1>
        <div className="search-container">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="content-grid">
        <div className="add-user-card">
          <h2>Add New User</h2>
          <form onSubmit={handleAddUser} className="add-user-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                placeholder="Enter full name"
                required
              />
              {error ==='name' && <p className="error-message">* name already exists</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="Enter email address"
                required
              />
              {error ==='email' && <p className="error-message">* email already exists</p>}
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn-submit"
              disabled={creatingUser}
            >
              {creatingUser ? 'Adding...' : 'Add User'}
            </button>
          </form>
        </div>

        <div className="users-table-card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="user-cell">
                      <div className="user-info">
                        <div className="user-avatar">{user.name.charAt(0)}</div>
                        <div className="user-details">
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleUpdateUser(user.id, { role: e.target.value })
                        }
                        className="role-select"
                      >
                        <option value="admin">Administrator</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                      </select>
                    </td>
                    <td>
                      <StatusBadge status={user.status} />
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className="btn-status"
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;

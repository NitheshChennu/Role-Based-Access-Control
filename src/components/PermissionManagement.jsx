import { useState } from 'react';
import '../styles/PermissionManagement.css';

function PermissionManagement({ permissions, addPermission, deletePermission }) {
  const [newPermission, setNewPermission] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleAddPermission = (e) => {
    e.preventDefault();
    const trimmedPermission = newPermission.trim();

    // Check if permission is empty
    if (!trimmedPermission) {
      setErrorMessage('Permission name cannot be empty.');
      return;
    }

    // check if permission already exists
    if (permissions.includes(trimmedPermission)) {
      setErrorMessage('This permission already exists.');
      return;
    }

    // If no errors, permission will add
    addPermission(trimmedPermission);
    setNewPermission('');
    setErrorMessage('');
  };

  const handleDeletePermission = (permissionToDelete) => {
    deletePermission(permissionToDelete);
  };

  return (
    <div className="permission-management">
      <div className="page-header">
        <h1>Permission Management</h1>
      </div>

      <div className="content-grid">
        <div className="add-permission-card">
          <h2>Add New Permission</h2>
          <form onSubmit={handleAddPermission} className="add-permission-form">
            <div className="form-group">
              <label htmlFor="permissionName">Permission Name</label>
              <input
                id="permissionName"
                type="text"
                value={newPermission}
                onChange={(e) => setNewPermission(e.target.value)}
                placeholder="Enter permission name"
                required
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <button type="submit" className="btn-submit">
              Add Permission
            </button>
          </form>
        </div>

        <div className="permissions-list-card">
          <div className="permissions-grid">
            {permissions.map((permission) => (
              <div key={permission} className="permission-card">
                <div className="permission-content">
                  <div className="permission-details">
                    <h3>{permission}</h3>
                  </div>
                </div>
                <button
                  onClick={() => handleDeletePermission(permission)} 
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PermissionManagement;

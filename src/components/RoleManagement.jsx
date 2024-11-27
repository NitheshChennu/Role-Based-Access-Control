import { useState } from 'react';
import '../styles/RoleManagement.css';

function RoleManagement({ roles, permissions, setRoles }) {
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  });
  //handles the Add role 
  const handleAddRole = (e) => {
    e.preventDefault();
    if (newRole.name.trim()) {
      setRoles([...roles, { ...newRole, id: Date.now(), isEditing: false }]);
      setNewRole({ name: '', description: '', permissions: [] });
    }
  };

  //handles the delete role
  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const handlePermissionToggle = (roleId, permission) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const permissions = role.permissions.includes(permission)
          ? role.permissions.filter(p => p !== permission)
          : [...role.permissions, permission];
        return { ...role, permissions };
      }
      return role;
    }));
  };

  const toggleEditMode = (roleId) => {
    setRoles(roles.map(role =>
      role.id === roleId ? { ...role, isEditing: !role.isEditing } : role
    ));
  };

  const handleSaveChanges = (roleId) => {
    setRoles(roles.map(role =>
      role.id === roleId ? { ...role, isEditing: false } : role
    ));
  };

  return (
    <div className="role-management">
      <div className="page-header">
        <h1>Role Management</h1>
      </div>

      <div className="content-grid">
        <div className="add-role-card">
          <h2>Add New Role</h2>
          <form onSubmit={handleAddRole} className="add-role-form">
            <div className="form-group">
              <label htmlFor="roleName">Role Name</label>
              <input
                id="roleName"
                type="text"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                placeholder="Enter role name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                placeholder="Enter role description"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Initial Permissions</label>
              <div className="permissions-grid">
                {permissions.map(permission => (
                  <label key={permission} className="permission-checkbox">
                    <input
                      type="checkbox"
                      checked={newRole.permissions.includes(permission)}
                      onChange={() => {
                        const updatedPermissions = newRole.permissions.includes(permission)
                          ? newRole.permissions.filter(p => p !== permission)
                          : [...newRole.permissions, permission];
                        setNewRole({ ...newRole, permissions: updatedPermissions });
                      }}
                    />
                    <span>{permission}</span>
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="btn-submit">
              Add Role
            </button>
          </form>
        </div>

        <div className="roles-list-card">
          <div className="roles-grid">
            {roles.map(role => (
              <div key={role.id} className="role-card">
                <div className="role-header">
                  <h3>{role.name}</h3>
                  <div>
                    {role.isEditing ? (
                      <button onClick={() => handleSaveChanges(role.id)} className="btn-save">
                        Save
                      </button>
                    ) : (
                      <button onClick={() => toggleEditMode(role.id)} className="btn-edit">
                        Edit
                      </button>
                    )}
                    <button onClick={() => handleDeleteRole(role.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="role-description">{role.description}</p>
                <div className="role-permissions">
                  <h4>Permissions</h4>
                  <div className="permissions-grid">
                    {permissions.map(permission => (
                      <label key={permission} className="permission-checkbox">
                        <input
                          type="checkbox"
                          disabled={!role.isEditing}
                          checked={role.permissions.includes(permission)}
                          onChange={() => handlePermissionToggle(role.id, permission)}
                        />
                        <span>{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleManagement;

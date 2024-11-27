import { useState } from 'react';
import Sidebar from './components/Sidebar';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import PermissionManagement from './components/PermissionManagement';
import { mockPermissions as initialPermissions, mockRoles } from './data/mockData';
import './App.css';

function App() {
  // State for managing active tab
  const [activeTab, setActiveTab] = useState('users');

  // State for permissions and roles
  const [permissions, setPermissions] = useState(initialPermissions);
  const [roles, setRoles] = useState(mockRoles);

  // State for Sidebar toggle on mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Permission management handlers
  const addPermission = (newPermission) => {
    if (newPermission && !permissions.includes(newPermission)) {
      setPermissions([...permissions, newPermission]);
    }
  };

  const deletePermission = (permissionToDelete) => {
    setPermissions((prevPermissions) =>
      prevPermissions.filter((permission) => permission !== permissionToDelete)
    );
  };

  // Role management handlers
  const addRole = (newRole) => {
    setRoles([...roles, newRole]);
  };

  const deleteRole = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  // Rendering content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement roles={roles} setRoles={setRoles} />;
      case 'roles':
        return (
          <RoleManagement
            roles={roles}
            permissions={permissions}
            setRoles={setRoles}
            addRole={addRole}
            deleteRole={deleteRole}
          />
        );
      case 'permissions':
        return (
          <PermissionManagement
            permissions={permissions}
            addPermission={addPermission}
            deletePermission={deletePermission}
          />
        );
      default:
        return <UserManagement roles={roles} setRoles={setRoles} />;
    }
  };

  return (
    <div className="app">
      {/* Sidebar with toggle functionality */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content area */}
      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

export default App;

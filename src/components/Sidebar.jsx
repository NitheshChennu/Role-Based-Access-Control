import { FaUsers, FaUserTag, FaKey } from 'react-icons/fa';
import '../styles/Sidebar.css';

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar">
      <div className="logo">RBAC Admin</div>

      <nav className="nav">
        <button
          className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FaUsers className="nav-icon" /> Users
        </button>
        <button
          className={`nav-item ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          <FaUserTag className="nav-icon" /> Roles
        </button>
        <button
          className={`nav-item ${activeTab === 'permissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('permissions')}
        >
          <FaKey className="nav-icon" /> Permissions
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;

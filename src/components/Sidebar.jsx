import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* Navigation config per role */
const navConfig = {
  admin: {
    title: 'ADMIN PANEL',
    sections: [
      {
        label: 'Main',
        items: [
          { path: '/admin', icon: '📊', label: 'Dashboard' },
          { path: '/admin/overview', icon: '🏗️', label: 'Project Overview' },
          { path: '/admin/reports', icon: '📋', label: 'Reports' },
        ],
      },
    ],
  },
  engineering: {
    title: 'ENGINEERING',
    sections: [
      {
        label: 'Main',
        items: [
          { path: '/engineering', icon: '📊', label: 'Dashboard' },
          { path: '/engineering/passport', icon: '🏛️', label: 'Project Passport' },
        ],
      },
      {
        label: 'Management',
        items: [
          { path: '/engineering/tasks', icon: '📋', label: 'Task Manager' },
          { path: '/engineering/workers', icon: '👷', label: 'Worker Manager' },
          { path: '/engineering/contractor', icon: '🤝', label: 'Contractor' },
        ],
      },
      {
        label: 'Records',
        items: [
          { path: '/engineering/documents', icon: '📂', label: 'Documents' },
          { path: '/engineering/site-diary', icon: '📒', label: 'Site Diary' },
          { path: '/engineering/reports', icon: '📈', label: 'Reports' },
        ],
      },
      {
        label: 'Finance & Map',
        items: [
          { path: '/engineering/finance', icon: '💰', label: 'Financial Tracker' },
          { path: '/engineering/map', icon: '🗺️', label: 'Map View' },
        ],
      },
    ],
  },
  worker: {
    title: 'WORKER',
    sections: [
      {
        label: 'Main',
        items: [
          { path: '/worker', icon: '🏠', label: 'Dashboard' },
          { path: '/worker/tasks', icon: '📋', label: 'My Tasks' },
          { path: '/worker/attendance', icon: '📅', label: 'Attendance' },
        ],
      },
      {
        label: 'Actions',
        items: [
          { path: '/worker/upload', icon: '📸', label: 'Upload Photos' },
          { path: '/worker/issues', icon: '⚠️', label: 'Report Issue' },
          { path: '/worker/notices', icon: '📢', label: 'Notices' },
        ],
      },
    ],
  },
};

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;
  const config = navConfig[user.role];
  if (!config) return null;

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">🏗</div>
        <span>CampusBuild</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {config.sections.map((section, i) => (
          <div className="sidebar-section" key={i}>
            <div className="sidebar-section-title">{section.label}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === `/${user.role}`}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">{user.avatar}</div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.title}</div>
          </div>
        </div>
        <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: 8 }} onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { initialNotifications } from '../data/mockData';

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications] = useState(initialNotifications);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roleLabel = {
    admin: 'Admin Panel',
    engineering: 'Engineering Core',
    worker: 'Worker Portal',
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="hamburger" onClick={onMenuClick}>☰</button>
        <h2>{roleLabel[user?.role] || 'Portal'}</h2>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search..." />
        </div>
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button className="notification-btn" onClick={() => setShowNotifs(!showNotifs)}>
            🔔
            {unreadCount > 0 && <span className="notif-count">{unreadCount}</span>}
          </button>
          {showNotifs && (
            <div className="notification-dropdown">
              <div className="notif-header">
                <h4>Notifications</h4>
                <button className="btn btn-sm btn-secondary">Mark all read</button>
              </div>
              <div className="notif-list">
                {notifications.map((n) => (
                  <div className="notif-item" key={n.id}>
                    {!n.read && <div className="notif-dot" />}
                    <div className="notif-content">
                      <p>{n.message}</p>
                      <span className="notif-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

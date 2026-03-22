import { initialTasks, initialNotifications } from '../../data/mockData';
import { StatusBadge, ProgressBar } from '../../components/SharedComponents';

export default function WorkerDashboard() {
  const myTasks = initialTasks.filter(t => t.assignedTo === 'U003');
  const todayTasks = myTasks.filter(t => t.status === 'in-progress');
  const pendingTasks = myTasks.filter(t => t.status === 'not-started');
  const completedTasks = myTasks.filter(t => t.status === 'completed');

  return (
    <div>
      <div className="page-header">
        <h1>🏠 My Dashboard</h1>
        <p>Welcome, Ramesh Kumar — Here's your day at a glance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { icon: '📋', bg: '#DBEAFE', label: "Today's Tasks", value: todayTasks.length },
          { icon: '⏳', bg: '#FEF3C7', label: 'Pending', value: pendingTasks.length },
          { icon: '✅', bg: '#D1FAE5', label: 'Completed', value: completedTasks.length },
          { icon: '📅', bg: '#EDE9FE', label: 'Attendance', value: 'Present ✓' },
        ].map((s, i) => (
          <div className="card" key={i}>
            <div className="stat-card">
              <div className="card-icon" style={{ background: s.bg, fontSize: '1.2rem' }}>{s.icon}</div>
              <div className="stat-info">
                <h4>{s.label}</h4>
                <div className="stat-value">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Tasks */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3>📋 Today's Tasks</h3>
        </div>
        {todayTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <h3>No active tasks</h3>
            <p>You have no tasks in progress right now.</p>
          </div>
        ) : (
          todayTasks.map(t => (
            <div className="worker-task-card" key={t.id}>
              <div className="task-title">{t.title}</div>
              <div className="task-meta">
                <span>📍 {t.location}</span>
                <span>📅 Due: {t.deadline}</span>
                <StatusBadge status={t.priority} />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: 12 }}>{t.description}</p>
              <StatusBadge status={t.status} />
            </div>
          ))
        )}
      </div>

      {/* Pending Tasks */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3>⏳ Pending Tasks</h3>
          <span className="badge badge-yellow">{pendingTasks.length}</span>
        </div>
        {pendingTasks.map(t => (
          <div className="worker-task-card" key={t.id}>
            <div className="task-title">{t.title}</div>
            <div className="task-meta">
              <span>📍 {t.location}</span>
              <span>📅 Due: {t.deadline}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Notifications */}
      <div className="card">
        <div className="card-header">
          <h3>🔔 Recent Notifications</h3>
        </div>
        {initialNotifications.filter(n => ['update', 'info'].includes(n.type)).slice(0, 3).map(n => (
          <div key={n.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--gray-100)', display: 'flex', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.read ? 'var(--gray-300)' : 'var(--primary)', marginTop: 6, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '0.85rem' }}>{n.message}</p>
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

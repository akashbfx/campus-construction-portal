import { projectPassport, workBreakdown, initialTasks, initialWorkers, initialNotifications, financialData, formatINR } from '../../data/mockData';
import { StatusBadge, ProgressBar } from '../../components/SharedComponents';

export default function EngDashboard() {
  const pp = projectPassport;
  const activeTasks = initialTasks.filter(t => t.status !== 'completed');
  const completedTasks = initialTasks.filter(t => t.status === 'completed');
  const activeStage = workBreakdown.find(s => s.status === 'in-progress');
  const presentWorkers = initialWorkers.filter(w => w.attendance === 'present').length;
  const unreadNotifs = initialNotifications.filter(n => !n.read);

  return (
    <div>
      <div className="page-header">
        <h1>Engineering Dashboard</h1>
        <p>Welcome, Er. Ankit Verma — Full project control center</p>
      </div>

      {/* Quick Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { icon: '📊', bg: '#DBEAFE', label: 'Progress', value: `${pp.progressPercentage}%`, sub: `Stage: ${pp.currentStage}` },
          { icon: '📋', bg: '#D1FAE5', label: 'Active Tasks', value: activeTasks.length, sub: `${completedTasks.length} completed` },
          { icon: '👷', bg: '#FEF3C7', label: 'Workers On Site', value: `${presentWorkers}/${initialWorkers.length}`, sub: 'Present today' },
          { icon: '💰', bg: '#EDE9FE', label: 'Budget Available', value: formatINR(financialData.available), sub: `of ${formatINR(financialData.totalAllocated)}` },
        ].map((s, i) => (
          <div className={`card animate-slide-up delay-${i + 1}`} key={i}>
            <div className="stat-card">
              <div className="card-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div className="stat-info">
                <h4>{s.label}</h4>
                <div className="stat-value">{s.value}</div>
                <div className="stat-change positive">{s.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Current Stage Progress */}
        <div className="card">
          <div className="card-header">
            <h3>Current Stage: {activeStage?.stage}</h3>
            <StatusBadge status="in-progress" />
          </div>
          <ProgressBar value={activeStage?.progress || 0} />
          <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: 8 }}>{activeStage?.progress}% complete</p>
          <div style={{ marginTop: 16 }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Sub-tasks</h4>
            {activeStage?.subtasks.map((st, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: '0.85rem' }}>
                <span>{i < 3 ? '✅' : '⬜'}</span>
                <span style={{ color: i < 3 ? 'var(--gray-400)' : 'var(--gray-700)', textDecoration: i < 3 ? 'line-through' : 'none' }}>{st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Status Summary */}
        <div className="card">
          <div className="card-header">
            <h3>Task Status Summary</h3>
          </div>
          <div>
            {[
              { label: 'Completed', count: completedTasks.length, color: 'var(--green)', bg: 'var(--green-light)' },
              { label: 'In Progress', count: initialTasks.filter(t => t.status === 'in-progress').length, color: 'var(--yellow)', bg: 'var(--yellow-light)' },
              { label: 'Not Started', count: initialTasks.filter(t => t.status === 'not-started').length, color: 'var(--gray-400)', bg: 'var(--gray-100)' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: item.color, fontSize: '1.1rem' }}>{item.count}</div>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.label}</span>
                <div style={{ flex: 1 }} />
                <ProgressBar value={(item.count / initialTasks.length) * 100} color={item.label === 'Completed' ? 'green' : item.label === 'In Progress' ? 'yellow' : ''} />
              </div>
            ))}
          </div>

          {/* Worker Attendance Quick View */}
          <div style={{ marginTop: 20 }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>Worker Activity</h4>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {initialWorkers.slice(0, 5).map(w => (
                <div key={w.id} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: w.attendance === 'present' ? 'var(--green)' : 'var(--red)' }} />
                  <span>{w.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications + Recent Tasks */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>🔔 Notifications ({unreadNotifs.length} unread)</h3>
          </div>
          {initialNotifications.slice(0, 5).map(n => (
            <div key={n.id} style={{ display: 'flex', gap: 8, padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', marginTop: 6, flexShrink: 0 }} />}
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-700)' }}>{n.message}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{n.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <h3>📋 Recent Updates</h3>
          </div>
          {initialTasks.slice(0, 4).map(t => (
            <div key={t.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <div className="flex-between">
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.title}</span>
                <StatusBadge status={t.status} />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: 4 }}>{t.location} • Due: {t.deadline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

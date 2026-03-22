import { useState } from 'react';
import { initialTasks } from '../../data/mockData';
import { StatusBadge, ConfirmDialog } from '../../components/SharedComponents';

export default function WorkerTasks() {
  const [tasks, setTasks] = useState(initialTasks.filter(t => t.assignedTo === 'U003'));
  const [activeTab, setActiveTab] = useState('all');
  const [confirmAction, setConfirmAction] = useState(null);

  const filtered = activeTab === 'all' ? tasks : tasks.filter(t => t.status === activeTab);

  const updateStatus = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    setConfirmAction(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1>📋 My Tasks</h1>
        <p>View and update your assigned tasks</p>
      </div>

      {/* Filter Tabs */}
      <div className="tabs" style={{ marginBottom: 24 }}>
        {[
          { key: 'all', label: 'All' },
          { key: 'in-progress', label: 'In Progress' },
          { key: 'not-started', label: 'Not Started' },
          { key: 'completed', label: 'Completed' },
        ].map(t => (
          <button key={t.key} className={`tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
            {t.label} ({t.key === 'all' ? tasks.length : tasks.filter(x => x.status === t.key).length})
          </button>
        ))}
      </div>

      {/* Task Cards */}
      {filtered.map(t => (
        <div className="worker-task-card" key={t.id} style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div className="task-title">{t.title}</div>
            <StatusBadge status={t.status} />
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: 12 }}>{t.description}</p>
          <div className="task-meta" style={{ marginBottom: 16 }}>
            <span>📍 {t.location}</span>
            <span>📅 Due: {t.deadline}</span>
            <StatusBadge status={t.priority} />
          </div>

          {/* Action Buttons — Large for mobile */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {t.status === 'not-started' && (
              <button className="worker-big-btn btn-primary" style={{ flex: 1 }}
                onClick={() => setConfirmAction({ taskId: t.id, newStatus: 'in-progress', label: 'Start Working' })}>
                ▶️ Start Working
              </button>
            )}
            {t.status === 'in-progress' && (
              <button className="worker-big-btn btn-success" style={{ flex: 1 }}
                onClick={() => setConfirmAction({ taskId: t.id, newStatus: 'completed', label: 'Mark Complete' })}>
                ✅ Mark Complete
              </button>
            )}
            {t.status === 'completed' && (
              <div style={{ flex: 1, textAlign: 'center', padding: 12, background: 'var(--green-light)', borderRadius: 'var(--radius-md)', color: '#065F46', fontWeight: 600 }}>
                ✅ Task Completed
              </div>
            )}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="empty-state card">
          <div className="empty-icon">📭</div>
          <h3>No tasks found</h3>
          <p>No tasks match the selected filter.</p>
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={!!confirmAction}
        title={confirmAction?.label || 'Update Task'}
        message={`Are you sure you want to change this task status?`}
        onCancel={() => setConfirmAction(null)}
        onConfirm={() => updateStatus(confirmAction.taskId, confirmAction.newStatus)}
      />
    </div>
  );
}

import { useState } from 'react';
import { initialTasks, initialWorkers } from '../../data/mockData';
import { StatusBadge, Modal, ConfirmDialog } from '../../components/SharedComponents';

export default function TaskManager() {
  const [tasks, setTasks] = useState([...initialTasks]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const blankTask = { id: '', title: '', description: '', location: '', deadline: '', priority: 'medium', status: 'not-started', assignedTo: 'U003', stage: 'Structure', createdBy: 'U002' };

  const filtered = filterStatus === 'all' ? tasks : tasks.filter(t => t.status === filterStatus);

  const handleSave = () => {
    if (editTask.id) {
      setTasks(tasks.map(t => t.id === editTask.id ? editTask : t));
    } else {
      setTasks([...tasks, { ...editTask, id: `T${String(tasks.length + 1).padStart(3, '0')}` }]);
    }
    setShowModal(false);
    setEditTask(null);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    setConfirmDelete(null);
  };

  const workerName = (userId) => {
    const w = initialWorkers.find(w => w.userId === userId);
    return w ? w.name : userId;
  };

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1>📋 Task Manager</h1>
          <p>Create, assign, and track construction tasks</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditTask({ ...blankTask }); setShowModal(true); }}>
          + New Task
        </button>
      </div>

      {/* Filters */}
      <div className="tabs" style={{ marginBottom: 24 }}>
        {['all', 'not-started', 'in-progress', 'completed'].map(s => (
          <button key={s} className={`tab ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>
            {s === 'all' ? 'All' : s.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} ({s === 'all' ? tasks.length : tasks.filter(t => t.status === s).length})
          </button>
        ))}
      </div>

      {/* Task Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Location</th>
                <th>Assigned To</th>
                <th>Deadline</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{t.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: 2 }}>{t.description.substring(0, 60)}...</div>
                  </td>
                  <td>{t.location}</td>
                  <td>{workerName(t.assignedTo)}</td>
                  <td>{t.deadline}</td>
                  <td><StatusBadge status={t.priority} /></td>
                  <td><StatusBadge status={t.status} /></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => { setEditTask({ ...t }); setShowModal(true); }}>✏️</button>
                      <button className="btn btn-sm btn-danger" onClick={() => setConfirmDelete(t.id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal open={showModal} onClose={() => { setShowModal(false); setEditTask(null); }} title={editTask?.id ? 'Edit Task' : 'Create New Task'} wide>
        {editTask && (
          <>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Task Title</label>
                  <input value={editTask.title} onChange={e => setEditTask({ ...editTask, title: e.target.value })} placeholder="Enter task title" />
                </div>
                <div className="form-group">
                  <label>Location (Floor/Zone)</label>
                  <input value={editTask.location} onChange={e => setEditTask({ ...editTask, location: e.target.value })} placeholder="e.g., 1st Floor — Zone A" />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={3} value={editTask.description} onChange={e => setEditTask({ ...editTask, description: e.target.value })} placeholder="Task instructions..." />
              </div>
              <div className="form-row-3">
                <div className="form-group">
                  <label>Deadline</label>
                  <input type="date" value={editTask.deadline} onChange={e => setEditTask({ ...editTask, deadline: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select value={editTask.priority} onChange={e => setEditTask({ ...editTask, priority: e.target.value })}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={editTask.status} onChange={e => setEditTask({ ...editTask, status: e.target.value })}>
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Assign To Worker</label>
                  <select value={editTask.assignedTo} onChange={e => setEditTask({ ...editTask, assignedTo: e.target.value })}>
                    {initialWorkers.map(w => <option key={w.userId} value={w.userId}>{w.name} ({w.trade})</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Stage</label>
                  <select value={editTask.stage} onChange={e => setEditTask({ ...editTask, stage: e.target.value })}>
                    {['Site Preparation', 'Foundation', 'Structure', 'Masonry', 'Plumbing', 'Electrical', 'Finishing'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => { setShowModal(false); setEditTask(null); }}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>{editTask.id ? 'Update Task' : 'Create Task'}</button>
            </div>
          </>
        )}
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete Task?"
        message="This will permanently remove the task. Are you sure?"
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => handleDelete(confirmDelete)}
      />
    </div>
  );
}

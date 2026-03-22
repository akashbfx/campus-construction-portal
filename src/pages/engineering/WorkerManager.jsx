import { useState } from 'react';
import { initialWorkers } from '../../data/mockData';
import { StatusBadge, Modal } from '../../components/SharedComponents';

export default function WorkerManager() {
  const [workers, setWorkers] = useState([...initialWorkers]);
  const [showModal, setShowModal] = useState(false);
  const [editWorker, setEditWorker] = useState(null);
  const [filter, setFilter] = useState('all');

  const blankWorker = { id: '', userId: '', name: '', trade: '', phone: '', dailyWage: 0, status: 'active', attendance: 'absent', joinDate: '' };

  const filtered = filter === 'all' ? workers : workers.filter(w => w.status === filter);

  const handleSave = () => {
    if (editWorker.id) {
      setWorkers(workers.map(w => w.id === editWorker.id ? editWorker : w));
    } else {
      const newId = `W${String(workers.length + 1).padStart(3, '0')}`;
      setWorkers([...workers, { ...editWorker, id: newId, userId: `U${String(workers.length + 10).padStart(3, '0')}` }]);
    }
    setShowModal(false);
    setEditWorker(null);
  };

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1>👷 Worker Manager</h1>
          <p>Manage construction workers and attendance</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditWorker({ ...blankWorker }); setShowModal(true); }}>
          + Add Worker
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total', value: workers.length, icon: '👥', bg: '#DBEAFE' },
          { label: 'Active', value: workers.filter(w => w.status === 'active').length, icon: '✅', bg: '#D1FAE5' },
          { label: 'Present', value: workers.filter(w => w.attendance === 'present').length, icon: '📍', bg: '#FEF3C7' },
          { label: 'Absent', value: workers.filter(w => w.attendance === 'absent').length, icon: '⛔', bg: '#FEE2E2' },
        ].map((s, i) => (
          <div className="card" key={i}>
            <div className="stat-card">
              <div className="card-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div className="stat-info">
                <h4>{s.label}</h4>
                <div className="stat-value">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="tabs" style={{ marginBottom: 20 }}>
        {['all', 'active', 'inactive'].map(s => (
          <button key={s} className={`tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Trade</th>
                <th>Phone</th>
                <th>Daily Wage</th>
                <th>Status</th>
                <th>Attendance</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td style={{ fontWeight: 600 }}>{w.name}</td>
                  <td>{w.trade}</td>
                  <td>{w.phone}</td>
                  <td>₹{w.dailyWage}</td>
                  <td><StatusBadge status={w.status} /></td>
                  <td><StatusBadge status={w.attendance} /></td>
                  <td>{w.joinDate}</td>
                  <td>
                    <button className="btn btn-sm btn-secondary" onClick={() => { setEditWorker({ ...w }); setShowModal(true); }}>✏️ Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <Modal open={showModal} onClose={() => { setShowModal(false); setEditWorker(null); }} title={editWorker?.id ? 'Edit Worker' : 'Add Worker'}>
        {editWorker && (
          <>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input value={editWorker.name} onChange={e => setEditWorker({ ...editWorker, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Trade</label>
                  <select value={editWorker.trade} onChange={e => setEditWorker({ ...editWorker, trade: e.target.value })}>
                    {['Mason', 'Carpenter', 'Steel Fixer', 'Electrician', 'Plumber', 'Painter', 'Helper'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input value={editWorker.phone} onChange={e => setEditWorker({ ...editWorker, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Daily Wage (₹)</label>
                  <input type="number" value={editWorker.dailyWage} onChange={e => setEditWorker({ ...editWorker, dailyWage: Number(e.target.value) })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select value={editWorker.status} onChange={e => setEditWorker({ ...editWorker, status: e.target.value })}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Join Date</label>
                  <input type="date" value={editWorker.joinDate} onChange={e => setEditWorker({ ...editWorker, joinDate: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => { setShowModal(false); setEditWorker(null); }}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>{editWorker.id ? 'Update' : 'Add Worker'}</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

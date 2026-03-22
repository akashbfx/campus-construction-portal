import { useState } from 'react';
import { initialSiteDiary, qualityRegister, materialTestLog, hindranceRegister } from '../../data/mockData';
import { StatusBadge, Modal } from '../../components/SharedComponents';

export default function SiteDiary() {
  const [activeTab, setActiveTab] = useState('diary');
  const [diary, setDiary] = useState([...initialSiteDiary]);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({ date: '', weather: 'Clear', temperature: '', workDone: '', labour: { skilled: 0, unskilled: 0 }, materials: '', hindrance: 'None', remarks: '' });

  const handleAddEntry = () => {
    const entry = { ...newEntry, id: `SD${String(diary.length + 1).padStart(3, '0')}`, author: 'Er. Suresh Yadav' };
    setDiary([entry, ...diary]);
    setShowAddEntry(false);
    setNewEntry({ date: '', weather: 'Clear', temperature: '', workDone: '', labour: { skilled: 0, unskilled: 0 }, materials: '', hindrance: 'None', remarks: '' });
  };

  const tabs = [
    { key: 'diary', label: '📒 Site Diary', count: diary.length },
    { key: 'quality', label: '✅ Quality Register', count: qualityRegister.length },
    { key: 'material', label: '🧱 Material Test Log', count: materialTestLog.length },
    { key: 'hindrance', label: '⚠️ Hindrance Register', count: hindranceRegister.length },
  ];

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1>📒 Site Monitoring</h1>
          <p>Daily site diary, quality and material registers</p>
        </div>
        {activeTab === 'diary' && (
          <button className="btn btn-primary" onClick={() => setShowAddEntry(true)}>+ New Entry</button>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 24 }}>
        {tabs.map(t => (
          <button key={t.key} className={`tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Site Diary */}
      {activeTab === 'diary' && (
        <div>
          {diary.map(entry => (
            <div className="card" key={entry.id} style={{ marginBottom: 16 }}>
              <div className="flex-between" style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h3 style={{ fontSize: '1rem' }}>📅 {entry.date}</h3>
                  <span className="badge badge-blue">{entry.weather} • {entry.temperature}</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>By: {entry.author}</span>
              </div>
              <div className="grid-2" style={{ gap: 16 }}>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Work Done</h4>
                  <p style={{ fontSize: '0.9rem' }}>{entry.workDone}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Labour</h4>
                  <p style={{ fontSize: '0.9rem' }}>Skilled: {entry.labour.skilled} | Unskilled: {entry.labour.unskilled}</p>
                </div>
              </div>
              <div className="grid-2" style={{ gap: 16, marginTop: 12 }}>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Materials</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)' }}>{entry.materials}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Hindrance</h4>
                  <p style={{ fontSize: '0.85rem', color: entry.hindrance === 'None' ? 'var(--green)' : 'var(--red)' }}>{entry.hindrance}</p>
                </div>
              </div>
              {entry.remarks && (
                <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--gray-600)' }}>
                  💬 {entry.remarks}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quality Register */}
      {activeTab === 'quality' && (
        <div className="card">
          <div className="table-container">
            <table>
              <thead><tr><th>Test</th><th>Date</th><th>Result</th><th>Standard</th><th>Status</th></tr></thead>
              <tbody>
                {qualityRegister.map(q => (
                  <tr key={q.id}>
                    <td style={{ fontWeight: 500 }}>{q.test}</td>
                    <td>{q.date}</td>
                    <td>{q.result}</td>
                    <td>{q.standard}</td>
                    <td><StatusBadge status={q.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Material Test Log */}
      {activeTab === 'material' && (
        <div className="card">
          <div className="table-container">
            <table>
              <thead><tr><th>Material</th><th>Supplier</th><th>Test Date</th><th>Result</th><th>Certificate</th></tr></thead>
              <tbody>
                {materialTestLog.map(m => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 500 }}>{m.material}</td>
                    <td>{m.supplier}</td>
                    <td>{m.testDate}</td>
                    <td><StatusBadge status={m.result} /></td>
                    <td>{m.certificate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hindrance Register */}
      {activeTab === 'hindrance' && (
        <div className="card">
          <div className="table-container">
            <table>
              <thead><tr><th>Date</th><th>Description</th><th>Cause</th><th>Duration</th><th>Action Taken</th><th>Resolved</th></tr></thead>
              <tbody>
                {hindranceRegister.map(h => (
                  <tr key={h.id}>
                    <td>{h.date}</td>
                    <td style={{ fontWeight: 500 }}>{h.description}</td>
                    <td>{h.cause}</td>
                    <td>{h.duration}</td>
                    <td>{h.action}</td>
                    <td><StatusBadge status={h.resolved ? 'resolved' : 'open'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Entry Modal */}
      <Modal open={showAddEntry} onClose={() => setShowAddEntry(false)} title="New Site Diary Entry" wide>
        <div className="modal-body">
          <div className="form-row-3">
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={newEntry.date} onChange={e => setNewEntry({ ...newEntry, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Weather</label>
              <select value={newEntry.weather} onChange={e => setNewEntry({ ...newEntry, weather: e.target.value })}>
                <option>Clear</option><option>Partly Cloudy</option><option>Cloudy</option><option>Rainy</option>
              </select>
            </div>
            <div className="form-group">
              <label>Temperature</label>
              <input value={newEntry.temperature} onChange={e => setNewEntry({ ...newEntry, temperature: e.target.value })} placeholder="e.g., 22°C" />
            </div>
          </div>
          <div className="form-group">
            <label>Work Done Today</label>
            <textarea rows={3} value={newEntry.workDone} onChange={e => setNewEntry({ ...newEntry, workDone: e.target.value })} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Skilled Labour</label>
              <input type="number" value={newEntry.labour.skilled} onChange={e => setNewEntry({ ...newEntry, labour: { ...newEntry.labour, skilled: Number(e.target.value) } })} />
            </div>
            <div className="form-group">
              <label>Unskilled Labour</label>
              <input type="number" value={newEntry.labour.unskilled} onChange={e => setNewEntry({ ...newEntry, labour: { ...newEntry.labour, unskilled: Number(e.target.value) } })} />
            </div>
          </div>
          <div className="form-group">
            <label>Materials Used</label>
            <input value={newEntry.materials} onChange={e => setNewEntry({ ...newEntry, materials: e.target.value })} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Hindrance</label>
              <input value={newEntry.hindrance} onChange={e => setNewEntry({ ...newEntry, hindrance: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Remarks</label>
              <input value={newEntry.remarks} onChange={e => setNewEntry({ ...newEntry, remarks: e.target.value })} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowAddEntry(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleAddEntry}>Add Entry</button>
        </div>
      </Modal>
    </div>
  );
}

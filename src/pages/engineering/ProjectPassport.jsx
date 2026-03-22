import { useState } from 'react';
import { projectPassport as initialPP } from '../../data/mockData';
import { StatusBadge, ProgressBar, Modal } from '../../components/SharedComponents';

export default function ProjectPassport() {
  const [pp, setPP] = useState({ ...initialPP });
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...initialPP });
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const handleSave = () => {
    setPP({ ...editData });
    setEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1>🏛️ Hostel Project Passport</h1>
          <p>Central data hub — {pp.projectName}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {editing ? (
            <>
              <button className="btn btn-success" onClick={handleSave}>💾 Save Changes</button>
              <button className="btn btn-secondary" onClick={() => { setEditing(false); setEditData({ ...pp }); }}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => { setEditing(true); setEditData({ ...pp }); }}>✏️ Edit Passport</button>
          )}
        </div>
      </div>

      {/* Identity Card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="flex-between" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 56, height: 56, background: 'var(--primary-light)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🏗️</div>
            <div>
              {editing ? (
                <input value={editData.projectName} onChange={e => handleChange('projectName', e.target.value)} style={{ fontSize: '1.2rem', fontWeight: 700, border: '1px solid var(--gray-300)', borderRadius: 6, padding: '4px 8px' }} />
              ) : (
                <h2 style={{ fontSize: '1.2rem' }}>{pp.projectName}</h2>
              )}
              <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>ID: {pp.id} • Building: {pp.buildingId}</p>
            </div>
          </div>
          <StatusBadge status={pp.status} />
        </div>

        <div className="grid-4">
          {[
            { label: 'Block Name', field: 'blockName' },
            { label: 'Floors', field: 'numberOfFloors' },
            { label: 'Total Area', field: 'totalArea' },
            { label: 'Current Stage', field: 'currentStage' },
            { label: 'Start Date', field: 'startDate', type: 'date' },
            { label: 'Expected Completion', field: 'expectedCompletionDate', type: 'date' },
            { label: 'Year', field: 'yearOfConstruction', type: 'number' },
            { label: 'Status', field: 'status', type: 'select', options: ['Planning', 'Approved', 'In Progress', 'Delayed', 'Completed'] },
          ].map((item, i) => (
            <div key={i} style={{ padding: 12, background: 'var(--gray-50)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
              {editing ? (
                item.type === 'select' ? (
                  <select value={editData[item.field]} onChange={e => handleChange(item.field, e.target.value)} style={{ padding: '6px 8px' }}>
                    {item.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={item.type || 'text'} value={editData[item.field]} onChange={e => handleChange(item.field, e.target.value)} style={{ padding: '6px 8px' }} />
                )
              ) : (
                <div style={{ fontWeight: 600 }}>{pp[item.field]}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress + Budget */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header"><h3>📊 Progress</h3></div>
          <div style={{ textAlign: 'center', margin: '16px 0' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)' }}>{pp.progressPercentage}%</div>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>Overall completion</p>
          </div>
          <ProgressBar value={pp.progressPercentage} />
          {editing && (
            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>Update Progress %</label>
              <input type="range" min="0" max="100" value={editData.progressPercentage} onChange={e => handleChange('progressPercentage', parseInt(e.target.value))} style={{ border: 'none', boxShadow: 'none', padding: 0 }} />
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-header"><h3>💰 Budget</h3></div>
          {[
            { label: 'Allocated', value: pp.budgetAllocated, field: 'budgetAllocated' },
            { label: 'Used', value: pp.budgetUsed, field: 'budgetUsed' },
            { label: 'Remaining', value: pp.budgetRemaining, field: 'budgetRemaining' },
          ].map((item, i) => (
            <div key={i} className="flex-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <span style={{ color: 'var(--gray-600)', fontSize: '0.85rem' }}>{item.label}</span>
              {editing ? (
                <input type="number" value={editData[item.field]} onChange={e => handleChange(item.field, Number(e.target.value))} style={{ width: 160, textAlign: 'right', padding: '4px 8px' }} />
              ) : (
                <span style={{ fontWeight: 700 }}>₹{(item.value / 10000000).toFixed(2)} Cr</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Engineers + Contractor */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header"><h3>👷 Engineers In Charge</h3></div>
          {pp.engineers.map((eng, i) => (
            <div key={i} className="flex-between" style={{ padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{eng.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{eng.phone}</div>
              </div>
              <span className="badge badge-blue">{eng.role}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header"><h3>🤝 Contractor</h3></div>
          {[
            { label: 'Firm', value: pp.contractor.name },
            { label: 'Contact', value: pp.contractor.contactPerson },
            { label: 'Phone', value: pp.contractor.phone },
            { label: 'GSTIN', value: pp.contractor.gstin },
            { label: 'License', value: pp.contractor.license },
          ].map((item, i) => (
            <div key={i} className="flex-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{item.label}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header"><h3>📅 Milestones & Timeline</h3></div>
        <div className="timeline">
          {pp.milestones.map((m) => (
            <div className={`timeline-item ${m.status === 'completed' ? 'completed' : ''}`} key={m.id}>
              <div className="flex-between">
                <div className="tl-date">{m.date}</div>
                <StatusBadge status={m.status} />
              </div>
              <div className="tl-title">{m.title}</div>
              <div className="tl-desc">{m.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Photos placeholder */}
      <div className="card">
        <div className="card-header">
          <h3>📸 Project Photos</h3>
          <button className="btn btn-sm btn-primary" onClick={() => setShowPhotoModal(true)}>Upload Photo</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {['Site Preparation', 'Foundation Work', 'G.F. Structure', 'Progress Oct 2025'].map((label, i) => (
            <div key={i} style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius-md)', padding: 40, textAlign: 'center', fontSize: '0.8rem', color: 'var(--gray-400)' }}>
              📷<br />{label}
            </div>
          ))}
        </div>
      </div>

      {/* Photo Upload Modal */}
      <Modal open={showPhotoModal} onClose={() => setShowPhotoModal(false)} title="Upload Project Photo">
        <div className="modal-body">
          <div className="file-upload-area">
            <div className="upload-icon">📸</div>
            <p><strong>Click to upload</strong> or drag and drop</p>
            <p style={{ fontSize: '0.75rem', marginTop: 4 }}>JPG, PNG (max 10MB)</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowPhotoModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { setShowPhotoModal(false); alert('Photo uploaded (mock)'); }}>Upload</button>
        </div>
      </Modal>
    </div>
  );
}

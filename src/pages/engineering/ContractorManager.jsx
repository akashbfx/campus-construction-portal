import { useState } from 'react';
import { projectPassport } from '../../data/mockData';
import { Modal } from '../../components/SharedComponents';

export default function ContractorManager() {
  const [contractor, setContractor] = useState({ ...projectPassport.contractor });
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...projectPassport.contractor });
  const [showDocModal, setShowDocModal] = useState(false);

  const handleSave = () => {
    setContractor({ ...editData });
    setEditing(false);
  };

  const manpower = [
    { type: 'Masons', count: 8 },
    { type: 'Carpenters', count: 4 },
    { type: 'Steel Fixers', count: 3 },
    { type: 'Electricians', count: 2 },
    { type: 'Plumbers', count: 2 },
    { type: 'Helpers', count: 12 },
    { type: 'Supervisors', count: 2 },
  ];

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1>🤝 Contractor Management</h1>
          <p>Manage contractor profile and details</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {editing ? (
            <>
              <button className="btn btn-success" onClick={handleSave}>💾 Save</button>
              <button className="btn btn-secondary" onClick={() => { setEditing(false); setEditData({ ...contractor }); }}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => { setEditing(true); setEditData({ ...contractor }); }}>✏️ Edit</button>
          )}
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Contractor Profile */}
        <div className="card">
          <div className="card-header">
            <h3>Contractor Profile</h3>
            <span className="badge badge-green">Verified</span>
          </div>
          {[
            { label: 'Firm Name', field: 'name' },
            { label: 'Contact Person', field: 'contactPerson' },
            { label: 'Phone', field: 'phone' },
            { label: 'GSTIN', field: 'gstin' },
            { label: 'License No.', field: 'license' },
            { label: 'Address', field: 'address' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', fontWeight: 500, textTransform: 'uppercase', marginBottom: 2 }}>{item.label}</div>
              {editing ? (
                <input value={editData[item.field]} onChange={e => setEditData({ ...editData, [item.field]: e.target.value })} style={{ padding: '6px 8px' }} />
              ) : (
                <div style={{ fontWeight: 500 }}>{contractor[item.field]}</div>
              )}
            </div>
          ))}
        </div>

        {/* Manpower */}
        <div className="card">
          <div className="card-header">
            <h3>Manpower Deployed</h3>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
              Total: {manpower.reduce((sum, m) => sum + m.count, 0)}
            </span>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Count</th>
                  <th>Distribution</th>
                </tr>
              </thead>
              <tbody>
                {manpower.map((m, i) => {
                  const total = manpower.reduce((s, x) => s + x.count, 0);
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{m.type}</td>
                      <td>{m.count}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="progress-bar" style={{ width: 100 }}>
                            <div className="progress-fill" style={{ width: `${(m.count / total) * 100}%` }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{((m.count / total) * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="card">
        <div className="card-header">
          <h3>📂 Contractor Documents</h3>
          <button className="btn btn-sm btn-primary" onClick={() => setShowDocModal(true)}>Upload</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Registration Certificate', type: 'PDF', status: 'Verified' },
                { name: 'GST Registration', type: 'PDF', status: 'Verified' },
                { name: 'Contractor License', type: 'PDF', status: 'Verified' },
                { name: 'Insurance Policy', type: 'PDF', status: 'Pending' },
                { name: 'Bank Details', type: 'PDF', status: 'Verified' },
              ].map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>📄 {d.name}</td>
                  <td>{d.type}</td>
                  <td><span className={`badge ${d.status === 'Verified' ? 'badge-green' : 'badge-yellow'}`}>{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showDocModal} onClose={() => setShowDocModal(false)} title="Upload Contractor Document">
        <div className="modal-body">
          <div className="form-group">
            <label>Document Type</label>
            <select><option>Registration Certificate</option><option>Insurance</option><option>License</option><option>Other</option></select>
          </div>
          <div className="file-upload-area">
            <div className="upload-icon">📁</div>
            <p><strong>Click to upload</strong> or drag and drop</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowDocModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { setShowDocModal(false); }}>Upload</button>
        </div>
      </Modal>
    </div>
  );
}

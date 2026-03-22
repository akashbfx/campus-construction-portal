import { useState } from 'react';
import { initialDocuments } from '../../data/mockData';
import { Modal, FileUpload } from '../../components/SharedComponents';

const categories = ['All', 'Drawings', 'Estimates', 'BOQ', 'Approvals', 'Work Orders', 'Bills', 'Certificates', 'Site Photos'];

export default function Documents() {
  const [docs, setDocs] = useState([...initialDocuments]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: '', category: 'Drawings' });

  const filtered = activeCategory === 'All' ? docs : docs.filter(d => d.category === activeCategory);

  const handleUpload = () => {
    const doc = {
      id: `D${String(docs.length + 1).padStart(3, '0')}`,
      name: newDoc.name || 'Untitled Document',
      category: newDoc.category,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'Er. Ankit Verma',
      size: '1.2 MB',
      type: 'PDF',
    };
    setDocs([doc, ...docs]);
    setShowUploadModal(false);
    setNewDoc({ name: '', category: 'Drawings' });
  };

  const catIcon = { Drawings: '📐', Estimates: '📊', BOQ: '📋', Approvals: '✅', 'Work Orders': '📝', Bills: '💰', Certificates: '📜', 'Site Photos': '📸' };

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1>📂 Document Management</h1>
          <p>Upload and manage project documents</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowUploadModal(true)}>📤 Upload Document</button>
      </div>

      {/* Category Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {['Drawings', 'Bills', 'Approvals', 'Site Photos'].map(cat => (
          <div className="card" key={cat} style={{ cursor: 'pointer' }} onClick={() => setActiveCategory(cat)}>
            <div className="stat-card">
              <div className="card-icon" style={{ background: 'var(--primary-light)', fontSize: '1.2rem' }}>{catIcon[cat]}</div>
              <div className="stat-info">
                <h4>{cat}</h4>
                <div className="stat-value">{docs.filter(d => d.category === cat).length}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Filter Tabs */}
      <div className="tabs" style={{ marginBottom: 20, flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} className={`tab ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>
            {c} ({c === 'All' ? docs.length : docs.filter(d => d.category === c).length})
          </button>
        ))}
      </div>

      {/* Document Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Category</th>
                <th>Upload Date</th>
                <th>Uploaded By</th>
                <th>Size</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{catIcon[d.category] || '📄'}</span>
                      <span style={{ fontWeight: 600 }}>{d.name}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-blue">{d.category}</span></td>
                  <td>{d.uploadDate}</td>
                  <td>{d.uploadedBy}</td>
                  <td>{d.size}</td>
                  <td>{d.type}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-sm btn-secondary">👁 View</button>
                      <button className="btn btn-sm btn-secondary">📥</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal open={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Document">
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Document Name</label>
              <input value={newDoc.name} onChange={e => setNewDoc({ ...newDoc, name: e.target.value })} placeholder="Enter document name" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={newDoc.category} onChange={e => setNewDoc({ ...newDoc, category: e.target.value })}>
                {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>File</label>
            <FileUpload />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowUploadModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
        </div>
      </Modal>
    </div>
  );
}

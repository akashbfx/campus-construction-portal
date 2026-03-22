import { useState } from 'react';
import { FileUpload } from '../../components/SharedComponents';

export default function WorkerUpload() {
  const [uploads, setUploads] = useState([
    { id: 1, name: 'Column A3 — Before Casting.jpg', date: '2025-12-14', task: 'Column Casting', status: 'Reviewed' },
    { id: 2, name: 'Foundation Zone B — Progress.jpg', date: '2025-12-12', task: 'Foundation Work', status: 'Pending' },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpload = (files) => {
    const newUploads = files.map((f, i) => ({
      id: uploads.length + i + 1,
      name: f.name,
      date: new Date().toISOString().split('T')[0],
      task: 'Current Task',
      status: 'Pending',
    }));
    setUploads([...newUploads, ...uploads]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div>
      <div className="page-header">
        <h1>📸 Upload Photos</h1>
        <p>Upload progress photos for your assigned tasks</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div style={{ padding: 16, background: 'var(--green-light)', borderRadius: 'var(--radius-md)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8, color: '#065F46', fontWeight: 500 }}>
          ✅ Photos uploaded successfully! They will be reviewed by the engineer.
        </div>
      )}

      {/* Upload Area */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3>Upload New Photos</h3>
        </div>
        <FileUpload onUpload={handleUpload} />
      </div>

      {/* Upload History */}
      <div className="card">
        <div className="card-header">
          <h3>Upload History</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>File</th>
                <th>Date</th>
                <th>Task</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map(u => (
                <tr key={u.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>📷</span>
                    <span style={{ fontWeight: 500 }}>{u.name}</span>
                  </td>
                  <td>{u.date}</td>
                  <td>{u.task}</td>
                  <td>
                    <span className={`badge ${u.status === 'Reviewed' ? 'badge-green' : 'badge-yellow'}`}>{u.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

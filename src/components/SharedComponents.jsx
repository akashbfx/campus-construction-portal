import { useState } from 'react';

export function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal ${wide ? 'modal-wide' : ''}`} onClick={e => e.stopPropagation()} style={wide ? { maxWidth: 800 } : {}}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="btn btn-icon btn-secondary" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
        <div className="confirm-icon">⚠️</div>
        <h3>{title || 'Are you sure?'}</h3>
        <p>{message || 'This action cannot be undone.'}</p>
        <div className="confirm-buttons">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const colorMap = {
    completed: 'green', paid: 'green', pass: 'green', active: 'green', present: 'green', approved: 'green', resolved: 'green',
    'in-progress': 'yellow', 'in progress': 'yellow', pending: 'yellow', partially: 'yellow',
    delayed: 'red', overdue: 'red', rejected: 'red', absent: 'red', open: 'red', high: 'red',
    'not-started': 'gray', 'not started': 'gray', inactive: 'gray', planning: 'gray', low: 'blue', medium: 'orange',
  };
  const color = colorMap[status?.toLowerCase()] || 'blue';
  return <span className={`badge badge-${color}`}>{status}</span>;
}

export function ProgressBar({ value, color }) {
  const fillColor = color || (value >= 75 ? 'green' : value >= 40 ? '' : 'yellow');
  return (
    <div className="progress-bar">
      <div className={`progress-fill ${fillColor}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

export function FileUpload({ onUpload }) {
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer?.files || []);
    setFiles(prev => [...prev, ...dropped]);
    if (onUpload) onUpload(dropped);
  };

  const handleSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selected]);
    if (onUpload) onUpload(selected);
  };

  return (
    <div>
      <div
        className="file-upload-area"
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => document.getElementById('file-input-hidden').click()}
      >
        <div className="upload-icon">📁</div>
        <p><strong>Click to upload</strong> or drag and drop</p>
        <p style={{ fontSize: '0.75rem', marginTop: 4 }}>PDF, JPG, PNG, XLSX (max 10MB)</p>
        <input id="file-input-hidden" type="file" multiple hidden onChange={handleSelect} />
      </div>
      {files.length > 0 && (
        <div style={{ marginTop: 12 }}>
          {files.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: '0.875rem' }}>
              <span>📄</span>
              <span>{f.name}</span>
              <span style={{ color: 'var(--gray-400)', marginLeft: 'auto' }}>{(f.size / 1024).toFixed(0)} KB</span>
              <button className="btn btn-sm btn-secondary" onClick={() => setFiles(files.filter((_, j) => j !== i))}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function EmptyState({ icon, title, description }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon || '📭'}</div>
      <h3>{title || 'No data yet'}</h3>
      <p>{description || 'Items will appear here once added.'}</p>
    </div>
  );
}

export function LoadingSpinner() {
  return <div className="loading-spinner" />;
}

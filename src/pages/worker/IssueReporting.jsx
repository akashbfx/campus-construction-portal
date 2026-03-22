import { useState } from 'react';
import { initialIssues } from '../../data/mockData';
import { StatusBadge } from '../../components/SharedComponents';

export default function IssueReporting() {
  const [issues, setIssues] = useState([...initialIssues]);
  const [showForm, setShowForm] = useState(false);
  const [newIssue, setNewIssue] = useState({ type: 'Material Shortage', description: '', priority: 'medium' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const issue = {
      id: `ISS${String(issues.length + 1).padStart(3, '0')}`,
      type: newIssue.type,
      description: newIssue.description,
      reportedBy: 'Ramesh Kumar',
      date: new Date().toISOString().split('T')[0],
      status: 'open',
      priority: newIssue.priority,
    };
    setIssues([issue, ...issues]);
    setShowForm(false);
    setNewIssue({ type: 'Material Shortage', description: '', priority: 'medium' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1>⚠️ Report Issue</h1>
          <p>Report material shortages, delays, or safety issues</p>
        </div>
        {!showForm && (
          <button className="btn btn-primary btn-lg" onClick={() => setShowForm(true)}>
            + Report New Issue
          </button>
        )}
      </div>

      {/* Success */}
      {submitted && (
        <div style={{ padding: 16, background: 'var(--green-light)', borderRadius: 'var(--radius-md)', marginBottom: 24, color: '#065F46', fontWeight: 500 }}>
          ✅ Issue reported successfully! The engineering team has been notified.
        </div>
      )}

      {/* Report Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="card-header">
            <h3>Report New Issue</h3>
            <button className="btn btn-sm btn-secondary" onClick={() => setShowForm(false)}>✕</button>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Issue Type</label>
              <select value={newIssue.type} onChange={e => setNewIssue({ ...newIssue, type: e.target.value })}>
                <option>Material Shortage</option>
                <option>Safety Issue</option>
                <option>Delay</option>
                <option>Equipment Failure</option>
                <option>Quality Concern</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select value={newIssue.priority} onChange={e => setNewIssue({ ...newIssue, priority: e.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={4} value={newIssue.description} onChange={e => setNewIssue({ ...newIssue, description: e.target.value })} placeholder="Describe the issue in detail..." />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="worker-big-btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
              📤 Submit Report
            </button>
            <button className="worker-big-btn btn-secondary" style={{ flex: 0.5 }} onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Issue History */}
      <div className="card">
        <div className="card-header">
          <h3>Reported Issues</h3>
          <span className="badge badge-blue">{issues.length} total</span>
        </div>
        {issues.map(iss => (
          <div key={iss.id} style={{ padding: 16, borderBottom: '1px solid var(--gray-100)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span className="badge badge-orange">{iss.type}</span>
                  <StatusBadge status={iss.priority} />
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-700)' }}>{iss.description}</p>
              </div>
              <StatusBadge status={iss.status} />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 4 }}>
              Reported by {iss.reportedBy} • {iss.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

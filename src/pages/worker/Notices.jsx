import { initialNotices } from '../../data/mockData';
import { StatusBadge } from '../../components/SharedComponents';

export default function Notices() {
  const priorityIcon = { high: '🔴', medium: '🟡', low: '🟢' };

  return (
    <div>
      <div className="page-header">
        <h1>📢 Notices</h1>
        <p>Important notices and instructions from engineers</p>
      </div>

      {initialNotices.map((notice, i) => (
        <div className={`card animate-slide-up delay-${i + 1}`} key={notice.id} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '1.2rem' }}>{priorityIcon[notice.priority] || '🔵'}</span>
              <h3 style={{ fontSize: '1rem' }}>{notice.title}</h3>
            </div>
            <StatusBadge status={notice.priority} />
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--gray-700)', lineHeight: 1.7, marginBottom: 12, padding: '8px 12px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)' }}>
            {notice.message}
          </p>
          <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', display: 'flex', gap: 16 }}>
            <span>📅 {notice.date}</span>
            <span>By: {notice.issuedBy}</span>
          </div>
        </div>
      ))}

      {initialNotices.length === 0 && (
        <div className="card empty-state">
          <div className="empty-icon">📭</div>
          <h3>No Notices</h3>
          <p>No notices have been posted yet.</p>
        </div>
      )}
    </div>
  );
}

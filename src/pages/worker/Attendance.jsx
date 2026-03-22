import { useState } from 'react';

export default function Attendance() {
  const [marked, setMarked] = useState(false);
  const [history] = useState([
    { date: '2025-12-14', status: 'present', checkIn: '08:05 AM' },
    { date: '2025-12-13', status: 'present', checkIn: '07:58 AM' },
    { date: '2025-12-12', status: 'present', checkIn: '08:12 AM' },
    { date: '2025-12-11', status: 'absent', checkIn: '—' },
    { date: '2025-12-10', status: 'present', checkIn: '08:00 AM' },
    { date: '2025-12-09', status: 'present', checkIn: '07:55 AM' },
    { date: '2025-12-08', status: 'present', checkIn: '08:10 AM' },
  ]);

  const today = new Date().toISOString().split('T')[0];
  const presentDays = history.filter(h => h.status === 'present').length;

  return (
    <div>
      <div className="page-header">
        <h1>📅 Attendance</h1>
        <p>Mark your daily attendance</p>
      </div>

      {/* Mark Attendance Card */}
      <div className="card" style={{ marginBottom: 24, textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>{marked ? '✅' : '📅'}</div>
        <h2 style={{ marginBottom: 8 }}>{today}</h2>
        <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>
          {marked ? 'Your attendance has been recorded for today.' : 'Tap the button below to mark your attendance.'}
        </p>
        <button
          className={`worker-big-btn ${marked ? 'btn-success' : 'btn-primary'}`}
          style={{ maxWidth: 400, margin: '0 auto' }}
          onClick={() => setMarked(true)}
          disabled={marked}
        >
          {marked ? '✅ Marked Present' : '📍 Mark Present'}
        </button>
        {marked && (
          <p style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--green)' }}>
            Checked in at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {[
          { label: 'Present Days', value: presentDays, icon: '✅', bg: '#D1FAE5' },
          { label: 'Absent Days', value: history.length - presentDays, icon: '❌', bg: '#FEE2E2' },
          { label: 'Attendance %', value: ((presentDays / history.length) * 100).toFixed(0) + '%', icon: '📊', bg: '#DBEAFE' },
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

      {/* History */}
      <div className="card">
        <div className="card-header">
          <h3>Attendance History</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Check-in Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{h.date}</td>
                  <td>
                    <span className={`badge ${h.status === 'present' ? 'badge-green' : 'badge-red'}`}>
                      {h.status === 'present' ? '✅ Present' : '❌ Absent'}
                    </span>
                  </td>
                  <td>{h.checkIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

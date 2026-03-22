import { projectPassport, financialData, formatINR, initialTasks, initialWorkers, workBreakdown, initialSiteDiary } from '../../data/mockData';
import { StatusBadge, ProgressBar } from '../../components/SharedComponents';

export default function AdminReports() {
  const pp = projectPassport;
  const fd = financialData;

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1>Reports</h1>
          <p>Project reports and summary data</p>
        </div>
        <button className="btn btn-primary">📥 Export Report (Mock)</button>
      </div>

      {/* Summary Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Overall Progress', value: `${pp.progressPercentage}%`, icon: '📊' },
          { label: 'Budget Utilization', value: `${((fd.totalBooked / fd.totalAllocated) * 100).toFixed(1)}%`, icon: '💰' },
          { label: 'Active Workers', value: initialWorkers.filter(w => w.status === 'active').length, icon: '👷' },
          { label: 'Tasks Completed', value: initialTasks.filter(t => t.status === 'completed').length + '/' + initialTasks.length, icon: '✅' },
        ].map((s, i) => (
          <div className="card" key={i}>
            <div className="stat-card">
              <div className="card-icon" style={{ background: 'var(--primary-light)' }}>{s.icon}</div>
              <div className="stat-info">
                <h4>{s.label}</h4>
                <div className="stat-value">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stage-wise Progress Report */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3>Stage-wise Progress Report</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Sub-tasks</th>
                <th>Progress</th>
                <th style={{ width: 180 }}>Bar</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {workBreakdown.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600 }}>{s.stage}</td>
                  <td>{s.subtasks.length}</td>
                  <td>{s.progress}%</td>
                  <td><ProgressBar value={s.progress} color={s.status === 'completed' ? 'green' : ''} /></td>
                  <td><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Financial Summary */}
        <div className="card">
          <div className="card-header">
            <h3>Financial Summary</h3>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Allocated</th>
                  <th>Spent</th>
                  <th>Utilization</th>
                </tr>
              </thead>
              <tbody>
                {fd.expenses.map((e, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{e.category}</td>
                    <td>{formatINR(e.allocated)}</td>
                    <td>{formatINR(e.spent)}</td>
                    <td>{e.allocated > 0 ? ((e.spent / e.allocated) * 100).toFixed(1) + '%' : '0%'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Worker Activity Summary */}
        <div className="card">
          <div className="card-header">
            <h3>Worker Activity</h3>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Trade</th>
                  <th>Status</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {initialWorkers.map((w) => (
                  <tr key={w.id}>
                    <td style={{ fontWeight: 500 }}>{w.name}</td>
                    <td>{w.trade}</td>
                    <td><StatusBadge status={w.status} /></td>
                    <td><StatusBadge status={w.attendance} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Site Diary */}
      <div className="card">
        <div className="card-header">
          <h3>Recent Site Diary Entries</h3>
        </div>
        {initialSiteDiary.map(entry => (
          <div key={entry.id} style={{ padding: 16, borderBottom: '1px solid var(--gray-100)' }}>
            <div className="flex-between" style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{entry.date}</span>
                <span className="badge badge-blue">{entry.weather} • {entry.temperature}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>By: {entry.author}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-700)', marginBottom: 4 }}>{entry.workDone}</p>
            {entry.hindrance !== 'None' && (
              <p style={{ fontSize: '0.8rem', color: 'var(--red)' }}>⚠️ Hindrance: {entry.hindrance}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

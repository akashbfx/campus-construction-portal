import { workBreakdown, initialTasks, initialWorkers, financialData, formatINR, projectPassport } from '../../data/mockData';
import { StatusBadge, ProgressBar } from '../../components/SharedComponents';

export default function EngReports() {
  const pp = projectPassport;
  const fd = financialData;

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1>📈 Engineering Reports</h1>
          <p>Detailed project analysis and reports</p>
        </div>
        <button className="btn btn-primary">📥 Export All (Mock)</button>
      </div>

      {/* Summary */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { icon: '📊', label: 'Overall Progress', value: `${pp.progressPercentage}%`, bg: '#DBEAFE' },
          { icon: '🏗️', label: 'Current Stage', value: pp.currentStage, bg: '#D1FAE5' },
          { icon: '📋', label: 'Total Tasks', value: initialTasks.length, bg: '#FEF3C7' },
          { icon: '💰', label: 'Budget Used', value: formatINR(fd.totalBooked), bg: '#EDE9FE' },
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

      {/* Work Breakdown Report */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3>Work Breakdown Report</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Sub-tasks</th>
                <th>Progress</th>
                <th style={{ width: 180 }}>Progress Bar</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {workBreakdown.map(s => (
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
        {/* Task Report */}
        <div className="card">
          <div className="card-header"><h3>Task Summary</h3></div>
          {[
            { label: 'Completed', count: initialTasks.filter(t => t.status === 'completed').length, color: 'var(--green)' },
            { label: 'In Progress', count: initialTasks.filter(t => t.status === 'in-progress').length, color: 'var(--yellow)' },
            { label: 'Not Started', count: initialTasks.filter(t => t.status === 'not-started').length, color: 'var(--gray-400)' },
          ].map((s, i) => (
            <div key={i} className="flex-between" style={{ padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: s.color }} />
                <span>{s.label}</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{s.count}</span>
            </div>
          ))}
        </div>

        {/* Financial Report */}
        <div className="card">
          <div className="card-header"><h3>Financial Report</h3></div>
          <div className="table-container">
            <table>
              <thead><tr><th>Category</th><th>Allocated</th><th>Spent</th><th>%</th></tr></thead>
              <tbody>
                {fd.expenses.map((e, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{e.category}</td>
                    <td>{formatINR(e.allocated)}</td>
                    <td>{formatINR(e.spent)}</td>
                    <td>{e.allocated > 0 ? ((e.spent / e.allocated) * 100).toFixed(0) + '%' : '0%'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Worker Report */}
      <div className="card">
        <div className="card-header"><h3>Worker Status Report</h3></div>
        <div className="table-container">
          <table>
            <thead><tr><th>Name</th><th>Trade</th><th>Wage/Day</th><th>Status</th><th>Attendance</th><th>Join Date</th></tr></thead>
            <tbody>
              {initialWorkers.map(w => (
                <tr key={w.id}>
                  <td style={{ fontWeight: 500 }}>{w.name}</td>
                  <td>{w.trade}</td>
                  <td>₹{w.dailyWage}</td>
                  <td><StatusBadge status={w.status} /></td>
                  <td><StatusBadge status={w.attendance} /></td>
                  <td>{w.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

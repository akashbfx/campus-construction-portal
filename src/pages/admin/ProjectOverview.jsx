import { projectPassport, workBreakdown, formatINR } from '../../data/mockData';
import { StatusBadge, ProgressBar } from '../../components/SharedComponents';

export default function ProjectOverview() {
  const pp = projectPassport;

  return (
    <div>
      <div className="page-header">
        <h1>Project Overview</h1>
        <p>Complete view of the hostel construction project</p>
      </div>

      {/* Project Info Card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="card-icon" style={{ background: '#DBEAFE', fontSize: '1.5rem' }}>🏛️</div>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>{pp.projectName}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>ID: {pp.id} • Building: {pp.buildingId}</p>
            </div>
          </div>
          <StatusBadge status={pp.status} />
        </div>

        <div className="grid-4" style={{ marginBottom: 16 }}>
          {[
            { label: 'Block', value: pp.blockName },
            { label: 'Floors', value: pp.numberOfFloors },
            { label: 'Total Area', value: pp.totalArea },
            { label: 'Current Stage', value: pp.currentStage },
          ].map((item, i) => (
            <div key={i} style={{ padding: 12, background: 'var(--gray-50)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', fontWeight: 500, textTransform: 'uppercase' }}>{item.label}</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: 2 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div className="grid-3">
          {[
            { label: 'Start Date', value: pp.startDate },
            { label: 'Expected Completion', value: pp.expectedCompletionDate },
            { label: 'Year', value: pp.yearOfConstruction },
          ].map((item, i) => (
            <div key={i} style={{ padding: 12, background: 'var(--gray-50)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', fontWeight: 500, textTransform: 'uppercase' }}>{item.label}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: 2 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Budget */}
        <div className="card">
          <div className="card-header">
            <h3>💰 Budget Summary</h3>
          </div>
          {[
            { label: 'Allocated', value: formatINR(pp.budgetAllocated), color: 'var(--primary)' },
            { label: 'Used', value: formatINR(pp.budgetUsed), color: 'var(--yellow)' },
            { label: 'Remaining', value: formatINR(pp.budgetRemaining), color: 'var(--green)' },
          ].map((item, i) => (
            <div key={i} className="flex-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--gray-600)' }}>{item.label}</span>
              </div>
              <span style={{ fontWeight: 700 }}>{item.value}</span>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <ProgressBar value={(pp.budgetUsed / pp.budgetAllocated) * 100} />
          </div>
        </div>

        {/* Engineers */}
        <div className="card">
          <div className="card-header">
            <h3>👷 Engineers In Charge</h3>
          </div>
          {pp.engineers.map((eng, i) => (
            <div key={i} className="flex-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{eng.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{eng.role} • {eng.phone}</div>
              </div>
              <span className="badge badge-blue">{eng.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones / Timeline */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3>📅 Project Milestones</h3>
        </div>
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

      {/* Work Breakdown */}
      <div className="card">
        <div className="card-header">
          <h3>📊 Work Breakdown Structure</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Progress</th>
                <th style={{ width: 200 }}>Bar</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {workBreakdown.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600 }}>{s.stage}</td>
                  <td>{s.progress}%</td>
                  <td><ProgressBar value={s.progress} color={s.status === 'completed' ? 'green' : s.status === 'in-progress' ? '' : ''} /></td>
                  <td><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { financialData, formatINR } from '../../data/mockData';
import { StatusBadge, ProgressBar } from '../../components/SharedComponents';

export default function FinancialTracker() {
  const [fd] = useState(financialData);

  return (
    <div>
      <div className="page-header">
        <h1>💰 Financial Tracker</h1>
        <p>Track fund allocation, expenses, and bill payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Allocated', value: formatINR(fd.totalAllocated), icon: '🏦', bg: '#DBEAFE', color: 'var(--primary)' },
          { label: 'Total Booked', value: formatINR(fd.totalBooked), icon: '📊', bg: '#FEF3C7', color: 'var(--yellow)' },
          { label: 'Available Funds', value: formatINR(fd.available), icon: '💚', bg: '#D1FAE5', color: 'var(--green)' },
        ].map((s, i) => (
          <div className="card" key={i}>
            <div className="stat-card">
              <div className="card-icon" style={{ background: s.bg, fontSize: '1.3rem' }}>{s.icon}</div>
              <div className="stat-info">
                <h4>{s.label}</h4>
                <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Budget Utilization */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3>Budget Utilization by Category</h3>
        </div>
        <div>
          {fd.expenses.map((e, i) => {
            const pct = e.allocated > 0 ? (e.spent / e.allocated) * 100 : 0;
            return (
              <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid var(--gray-100)' }}>
                <div className="flex-between" style={{ marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{e.category}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                    {formatINR(e.spent)} / {formatINR(e.allocated)} ({pct.toFixed(0)}%)
                  </span>
                </div>
                <ProgressBar value={pct} color={pct > 80 ? 'red' : pct > 50 ? 'yellow' : 'green'} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bills */}
      <div className="card">
        <div className="card-header">
          <h3>📄 Bills & Payments</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bill</th>
                <th>Description</th>
                <th>Contractor</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fd.bills.map(b => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 600 }}>{b.id}</td>
                  <td>{b.description}</td>
                  <td>{b.contractor}</td>
                  <td style={{ fontWeight: 600 }}>{formatINR(b.amount)}</td>
                  <td>{b.date}</td>
                  <td><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 16, padding: 16, background: 'var(--gray-50)', borderRadius: 'var(--radius-md)' }}>
          <div className="flex-between">
            <span style={{ fontWeight: 600 }}>Total Bills Amount</span>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>
              {formatINR(fd.bills.reduce((sum, b) => sum + b.amount, 0))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

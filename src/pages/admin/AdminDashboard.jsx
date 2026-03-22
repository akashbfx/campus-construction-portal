import { useState, useEffect, useRef } from 'react';
import { projectPassport, financialData, formatINR, initialTasks, initialWorkers, initialNotifications, workBreakdown } from '../../data/mockData';
import { StatusBadge, ProgressBar } from '../../components/SharedComponents';

/* Lightweight canvas-based donut chart */
function DonutChart({ value, size = 120, color = '#2563EB' }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    const cx = size / 2, cy = size / 2, r = size / 2 - 10, lw = 12;
    ctx.clearRect(0, 0, size, size);
    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = lw;
    ctx.stroke();
    // Value ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * value / 100));
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineCap = 'round';
    ctx.stroke();
    // Center text
    ctx.fillStyle = '#111827';
    ctx.font = `700 ${size / 4.5}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${value}%`, cx, cy);
  }, [value, size, color]);
  return <canvas ref={canvasRef} />;
}

/* Simple bar chart via canvas */
function BarChart({ data, height = 200 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.parentElement.offsetWidth;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = height + 'px';
    ctx.clearRect(0, 0, w, height);
    const max = Math.max(...data.map(d => d.value));
    const barW = Math.min(40, (w - 40) / data.length - 10);
    const gap = (w - data.length * barW) / (data.length + 1);
    data.forEach((d, i) => {
      const x = gap + i * (barW + gap);
      const barH = (d.value / max) * (height - 50);
      const y = height - barH - 30;
      // Bar
      ctx.fillStyle = d.color || '#2563EB';
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, 4);
      ctx.fill();
      // Label
      ctx.fillStyle = '#6B7280';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.label, x + barW / 2, height - 10);
    });
  }, [data, height]);
  return <canvas ref={canvasRef} style={{ width: '100%' }} />;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const pp = projectPassport;
  const fd = financialData;
  const pendingTasks = initialTasks.filter(t => t.status !== 'completed').length;
  const totalWorkers = initialWorkers.length;
  const activeWorkers = initialWorkers.filter(w => w.attendance === 'present').length;
  const delayedStages = workBreakdown.filter(w => w.status === 'delayed').length;

  useEffect(() => { setTimeout(() => setLoading(false), 500); }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <div className="loading-spinner" />
        <p style={{ color: 'var(--gray-400)', marginTop: 16 }}>Loading dashboard...</p>
      </div>
    );
  }

  const statsCards = [
    { icon: '🏗️', bg: '#DBEAFE', label: 'Project Status', value: pp.status, change: `${pp.progressPercentage}% complete` },
    { icon: '💰', bg: '#D1FAE5', label: 'Budget Used', value: formatINR(fd.totalBooked), change: `of ${formatINR(fd.totalAllocated)}` },
    { icon: '👷', bg: '#FEF3C7', label: 'Active Workers', value: `${activeWorkers}/${totalWorkers}`, change: `${activeWorkers} on site today` },
    { icon: '📋', bg: '#EDE9FE', label: 'Pending Tasks', value: pendingTasks, change: `${initialTasks.length} total tasks` },
  ];

  const stageChartData = workBreakdown.map(s => ({
    label: s.stage.split(' ')[0].substring(0, 6),
    value: s.progress || 1,
    color: s.status === 'completed' ? '#10B981' : s.status === 'in-progress' ? '#F59E0B' : '#D1D5DB',
  }));

  return (
    <div>
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, Dr. Rajesh Sharma — Here&apos;s your project overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {statsCards.map((s, i) => (
          <div className={`card animate-slide-up delay-${i + 1}`} key={i}>
            <div className="stat-card">
              <div className="card-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div className="stat-info">
                <h4>{s.label}</h4>
                <div className="stat-value">{s.value}</div>
                <div className="stat-change positive">{s.change}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Project Progress Card */}
        <div className="card animate-slide-up delay-3">
          <div className="card-header">
            <h3>Project Progress</h3>
            <StatusBadge status={pp.status} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <DonutChart value={pp.progressPercentage} />
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{pp.projectName}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: 12 }}>
                {pp.numberOfFloors} • {pp.totalArea} • Stage: {pp.currentStage}
              </p>
              <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div className="flex-between">
                  <span style={{ color: 'var(--gray-500)' }}>Start Date</span>
                  <span style={{ fontWeight: 500 }}>{pp.startDate}</span>
                </div>
                <div className="flex-between">
                  <span style={{ color: 'var(--gray-500)' }}>Expected Completion</span>
                  <span style={{ fontWeight: 500 }}>{pp.expectedCompletionDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="card animate-slide-up delay-4">
          <div className="card-header">
            <h3>Budget Overview</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Total: {formatINR(fd.totalAllocated)}</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            {[
              { label: 'Allocated', value: fd.totalAllocated, color: '#2563EB' },
              { label: 'Used', value: fd.totalBooked, color: '#F59E0B' },
              { label: 'Available', value: fd.available, color: '#10B981' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                <span style={{ flex: 1, fontSize: '0.85rem', color: 'var(--gray-600)' }}>{item.label}</span>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{formatINR(item.value)}</span>
              </div>
            ))}
          </div>
          <ProgressBar value={(fd.totalBooked / fd.totalAllocated) * 100} color="yellow" />
          <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 6 }}>
            {((fd.totalBooked / fd.totalAllocated) * 100).toFixed(1)}% of budget utilized
          </p>
        </div>
      </div>

      <div className="grid-2">
        {/* Stage Progress */}
        <div className="card animate-slide-up delay-5">
          <div className="card-header">
            <h3>Stage-wise Progress</h3>
          </div>
          <BarChart data={stageChartData} height={200} />
        </div>

        {/* Recent Notifications */}
        <div className="card animate-slide-up delay-6">
          <div className="card-header">
            <h3>Recent Notifications</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {initialNotifications.slice(0, 5).map(n => (
              <div key={n.id} style={{ display: 'flex', gap: 8, padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.read ? 'var(--gray-300)' : 'var(--primary)', marginTop: 6, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gray-700)' }}>{n.message}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

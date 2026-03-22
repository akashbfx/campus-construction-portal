import { useState, useEffect, useRef } from 'react';
import { projectPassport } from '../../data/mockData';
import { StatusBadge, ProgressBar } from '../../components/SharedComponents';

/* Canvas-based map placeholder since Leaflet requires npm install */
function CampusMap({ onPinClick }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.parentElement.offsetWidth;
    const h = 500;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    // Background
    ctx.fillStyle = '#E8F5E9';
    ctx.fillRect(0, 0, w, h);

    // Roads
    ctx.strokeStyle = '#BDBDBD';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    // Horizontal road
    ctx.beginPath(); ctx.moveTo(0, h * 0.5); ctx.lineTo(w, h * 0.5); ctx.stroke();
    // Vertical road
    ctx.beginPath(); ctx.moveTo(w * 0.5, 0); ctx.lineTo(w * 0.5, h); ctx.stroke();
    // Secondary roads
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#D5D5D5';
    ctx.beginPath(); ctx.moveTo(w * 0.25, h * 0.2); ctx.lineTo(w * 0.25, h * 0.8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w * 0.75, h * 0.2); ctx.lineTo(w * 0.75, h * 0.8); ctx.stroke();

    // Buildings
    const buildings = [
      { x: w * 0.1, y: h * 0.15, w: 80, h: 50, label: 'Library', color: '#90CAF9' },
      { x: w * 0.35, y: h * 0.1, w: 100, h: 45, label: 'Admin Block', color: '#CE93D8' },
      { x: w * 0.65, y: h * 0.15, w: 90, h: 50, label: 'Dept. of CS', color: '#A5D6A7' },
      { x: w * 0.1, y: h * 0.6, w: 85, h: 50, label: 'Girls Hostel', color: '#F48FB1' },
      { x: w * 0.35, y: h * 0.65, w: 90, h: 45, label: 'Canteen', color: '#FFCC80' },
      { x: w * 0.65, y: h * 0.6, w: 80, h: 50, label: 'Sports Complex', color: '#80DEEA' },
      { x: w * 0.1, y: h * 0.35, w: 75, h: 40, label: 'Dept. of EE', color: '#B0BEC5' },
    ];

    buildings.forEach(b => {
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, b.w, b.h, 6);
      ctx.fill();
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = '#333';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(b.label, b.x + b.w / 2, b.y + b.h / 2 + 4);
    });

    // Target building - hostel under construction (highlighted)
    const hx = w * 0.58, hy = h * 0.35, hw = 100, hh = 55;
    // Glow effect
    ctx.shadowColor = '#2563EB';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#2563EB';
    ctx.beginPath();
    ctx.roundRect(hx, hy, hw, hh, 8);
    ctx.fill();
    ctx.shadowBlur = 0;
    // Stripes for construction
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(hx + i * 18 + 2, hy + 2, 8, hh - 4);
    }
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏗️ Block C', hx + hw / 2, hy + hh / 2 - 4);
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('(Under Construction)', hx + hw / 2, hy + hh / 2 + 12);

    // Pin marker
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(hx + hw / 2, hy - 15, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFF';
    ctx.font = '12px sans-serif';
    ctx.fillText('📍', hx + hw / 2 - 6, hy - 11);

    // Legend
    ctx.fillStyle = '#FFF';
    ctx.fillRect(10, h - 60, 200, 50);
    ctx.strokeStyle = '#DDD';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, h - 60, 200, 50);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Campus Map — Legend', 20, h - 42);
    ctx.font = '10px Inter, sans-serif';
    ctx.fillStyle = '#2563EB';
    ctx.fillRect(20, h - 32, 12, 12);
    ctx.fillStyle = '#666';
    ctx.fillText('Active Construction', 38, h - 22);
    ctx.fillStyle = '#90CAF9';
    ctx.fillRect(130, h - 32, 12, 12);
    ctx.fillStyle = '#666';
    ctx.fillText('Existing', 148, h - 22);

    // Click handler
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (mx >= hx && mx <= hx + hw && my >= hy && my <= hy + hh) {
        onPinClick?.();
      }
    };
    canvas.addEventListener('click', handleClick);
    return () => canvas.removeEventListener('click', handleClick);
  }, [onPinClick]);

  return <canvas ref={canvasRef} style={{ width: '100%', cursor: 'pointer', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)' }} />;
}

export default function MapView() {
  const [showPassport, setShowPassport] = useState(false);
  const pp = projectPassport;

  return (
    <div>
      <div className="page-header">
        <h1>🗺️ Campus Map</h1>
        <p>Click on the highlighted building to view project details</p>
      </div>

      <div className="card" style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
        <CampusMap onPinClick={() => setShowPassport(true)} />
      </div>

      {showPassport && (
        <div className="card animate-slide-up" style={{ marginBottom: 24 }}>
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, background: 'var(--primary-light)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🏗️</div>
              <div>
                <h3>{pp.projectName}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{pp.id} • {pp.blockName}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StatusBadge status={pp.status} />
              <button className="btn btn-sm btn-secondary" onClick={() => setShowPassport(false)}>✕</button>
            </div>
          </div>
          <div className="grid-4" style={{ marginTop: 8 }}>
            {[
              { label: 'Floors', value: pp.numberOfFloors },
              { label: 'Area', value: pp.totalArea },
              { label: 'Stage', value: pp.currentStage },
              { label: 'Progress', value: `${pp.progressPercentage}%` },
            ].map((item, i) => (
              <div key={i} style={{ padding: 12, background: 'var(--gray-50)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>{item.label}</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <ProgressBar value={pp.progressPercentage} />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: 8 }}>
            Coordinates: {pp.geoLocation.lat}, {pp.geoLocation.lng}
          </p>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const roles = [
  { key: 'admin', icon: '👨‍💼', bg: '#DBEAFE', title: 'Admin', desc: 'Director / Dean — View & approve', credentials: 'Auto login as Director' },
  { key: 'engineering', icon: '🔧', bg: '#D1FAE5', title: 'Engineering Core', desc: 'SE / EE / JE — Full control', credentials: 'Auto login as SE' },
  { key: 'worker', icon: '👷', bg: '#FEF3C7', title: 'Worker', desc: 'Site worker — Tasks & attendance', credentials: 'Auto login as Mason' },
];

export default function Login() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selected) return;
    setLoading(true);
    setTimeout(() => {
      login(selected);
      navigate(`/${selected}`);
    }, 600);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">🏗</div>
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Select your role to continue</p>

        <div className="role-selector">
          {roles.map((r) => (
            <div
              key={r.key}
              className={`role-option ${selected === r.key ? 'selected' : ''}`}
              onClick={() => setSelected(r.key)}
            >
              <div className="role-icon" style={{ background: r.bg }}>{r.icon}</div>
              <div className="role-details">
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary btn-lg"
          style={{ width: '100%' }}
          onClick={handleLogin}
          disabled={!selected || loading}
        >
          {loading ? '⏳ Signing in...' : 'Sign In →'}
        </button>

        <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 16 }}>
          Demo system — Select a role and click Sign In
        </p>
      </div>
    </div>
  );
}

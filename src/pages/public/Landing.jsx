import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="logo">
          <div className="logo-box">🏗</div>
          CampusBuild
        </div>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/login" className="btn btn-primary">Login →</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content animate-slide-left">
          <h1>
            Smart Campus<br />
            <span>Construction</span><br />
            Management
          </h1>
          <p>
            A centralized digital platform to manage hostel construction projects&nbsp;—
            from planning to completion. Track progress, assign tasks, manage workers,
            and monitor budgets in real time.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary btn-lg">Get Started →</Link>
            <Link to="/about" className="btn btn-secondary btn-lg">Learn More</Link>
          </div>
        </div>

        <div className="hero-visual animate-slide-right">
          <div className="hero-card">
            <div className="project-header">
              <div className="project-icon">🏛️</div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>New Meaga Ladies Hostel</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Project ID: PRJ-2025-001</p>
              </div>
              <span className="badge badge-yellow" style={{ marginLeft: 'auto' }}>In Progress</span>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
                <span style={{ color: 'var(--gray-500)' }}>Overall Progress</span>
                <span style={{ fontWeight: 600 }}>38%</span>
              </div>
              <div className="progress-bar" style={{ height: 10 }}>
                <div className="progress-fill" style={{ width: '38%' }} />
              </div>
            </div>
            <div className="mini-stats">
              <div className="mini-stat">
                <div className="ms-value">G+9</div>
                <div className="ms-label">Floors</div>
              </div>
              <div className="mini-stat">
                <div className="ms-value">₹71.6 Cr</div>
                <div className="ms-label">Budget</div>
              </div>
              <div className="mini-stat">
                <div className="ms-value">200</div>
                <div className="ms-label">Workers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-title">
          <h2>Everything You Need</h2>
          <p>Comprehensive tools for every stakeholder in the construction process.</p>
        </div>
        <div className="features-grid">
          {[
            { icon: '👨‍💼', title: 'Admin Dashboard', desc: 'Monitor projects, approve stages, track budgets, and view comprehensive reports — all from a single command center.' },
            { icon: '🔧', title: 'Engineering Core', desc: 'Full control over project setup, task assignment, document management, site monitoring, and financial tracking.' },
            { icon: '👷', title: 'Worker Portal', desc: 'Mobile-friendly interface for viewing tasks, marking attendance, uploading progress photos, and reporting issues.' },
            { icon: '📊', title: 'Real-time Tracking', desc: 'Live progress bars, milestone tracking, and status updates keep everyone informed at every stage.' },
            { icon: '📂', title: 'Document Hub', desc: 'Centralized storage for drawings, estimates, BOQ, work orders, bills, and certificates.' },
            { icon: '🗺️', title: 'Campus Map', desc: 'Interactive map view to locate building projects within the campus with quick access to project details.' },
          ].map((f, i) => (
            <div className={`feature-card animate-slide-up delay-${i + 1}`} key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        © 2025 CampusBuild — Campus Construction Management Portal. All rights reserved.
      </footer>
    </div>
  );
}

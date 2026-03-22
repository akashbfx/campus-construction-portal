import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      <nav className="landing-nav">
        <Link to="/" className="logo">
          <div className="logo-box">🏗</div>
          CampusBuild
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login" className="btn btn-primary">Login →</Link>
        </div>
      </nav>

      <div className="about-hero animate-fade">
        <h1>About CampusBuild</h1>
        <p>
          CampusBuild is a centralized digital construction management system designed specifically
          for managing campus infrastructure projects like hostels, academic buildings, and labs.
          It connects administrators, engineers, and construction workers through a single seamless platform.
        </p>
      </div>

      <div className="about-content">
        <div className="about-grid">
          {[
            { icon: '🎯', title: 'Our Mission', desc: 'To digitize campusconstruction management, ensuring transparency, accountability, and efficiency at every stage of the building process.' },
            { icon: '👥', title: 'Role-Based Access', desc: 'Three distinct portals — Admin for oversight, Engineering for full project control, and Worker for task management — each tailored to specific needs.' },
            { icon: '📐', title: 'Project Passport', desc: 'Every project has a central digital passport containing all critical information — from geo-location and budget to milestones and documents.' },
            { icon: '📱', title: 'Mobile Ready', desc: 'The worker portal is designed mobile-first with large buttons and simple interfaces, making it easy to use on-site with a smartphone.' },
          ].map((item, i) => (
            <div className={`about-card animate-slide-up delay-${i + 1}`} key={i}>
              <div className="about-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="landing-footer">
        © 2025 CampusBuild — Campus Construction Management Portal.
      </footer>
    </div>
  );
}

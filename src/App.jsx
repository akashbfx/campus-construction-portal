import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Public Pages
import Landing from './pages/public/Landing';
import About from './pages/public/About';
import Login from './pages/public/Login';

// Layout
import Layout from './components/Layout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectOverview from './pages/admin/ProjectOverview';
import AdminReports from './pages/admin/AdminReports';

// Engineering Pages
import EngDashboard from './pages/engineering/EngDashboard';
import ProjectPassport from './pages/engineering/ProjectPassport';
import TaskManager from './pages/engineering/TaskManager';
import WorkerManager from './pages/engineering/WorkerManager';
import ContractorManager from './pages/engineering/ContractorManager';
import Documents from './pages/engineering/Documents';
import SiteDiary from './pages/engineering/SiteDiary';
import EngReports from './pages/engineering/EngReports';
import FinancialTracker from './pages/engineering/FinancialTracker';
import MapView from './pages/engineering/MapView';

// Worker Pages
import WorkerDashboard from './pages/worker/WorkerDashboard';
import WorkerTasks from './pages/worker/WorkerTasks';
import Attendance from './pages/worker/Attendance';
import WorkerUpload from './pages/worker/WorkerUpload';
import IssueReporting from './pages/worker/IssueReporting';
import Notices from './pages/worker/Notices';

/* ProtectedRoute — redirects to login if not authenticated, or wrong role */
function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
      <Route path="/admin/overview" element={<ProtectedRoute allowedRoles={['admin']}><Layout><ProjectOverview /></Layout></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><Layout><AdminReports /></Layout></ProtectedRoute>} />

      {/* Engineering Routes */}
      <Route path="/engineering" element={<ProtectedRoute allowedRoles={['engineering']}><Layout><EngDashboard /></Layout></ProtectedRoute>} />
      <Route path="/engineering/passport" element={<ProtectedRoute allowedRoles={['engineering']}><Layout><ProjectPassport /></Layout></ProtectedRoute>} />
      <Route path="/engineering/tasks" element={<ProtectedRoute allowedRoles={['engineering']}><Layout><TaskManager /></Layout></ProtectedRoute>} />
      <Route path="/engineering/workers" element={<ProtectedRoute allowedRoles={['engineering']}><Layout><WorkerManager /></Layout></ProtectedRoute>} />
      <Route path="/engineering/contractor" element={<ProtectedRoute allowedRoles={['engineering']}><Layout><ContractorManager /></Layout></ProtectedRoute>} />
      <Route path="/engineering/documents" element={<ProtectedRoute allowedRoles={['engineering']}><Layout><Documents /></Layout></ProtectedRoute>} />
      <Route path="/engineering/site-diary" element={<ProtectedRoute allowedRoles={['engineering']}><Layout><SiteDiary /></Layout></ProtectedRoute>} />
      <Route path="/engineering/reports" element={<ProtectedRoute allowedRoles={['engineering']}><Layout><EngReports /></Layout></ProtectedRoute>} />
      <Route path="/engineering/finance" element={<ProtectedRoute allowedRoles={['engineering']}><Layout><FinancialTracker /></Layout></ProtectedRoute>} />
      <Route path="/engineering/map" element={<ProtectedRoute allowedRoles={['engineering']}><Layout><MapView /></Layout></ProtectedRoute>} />

      {/* Worker Routes */}
      <Route path="/worker" element={<ProtectedRoute allowedRoles={['worker']}><Layout><WorkerDashboard /></Layout></ProtectedRoute>} />
      <Route path="/worker/tasks" element={<ProtectedRoute allowedRoles={['worker']}><Layout><WorkerTasks /></Layout></ProtectedRoute>} />
      <Route path="/worker/attendance" element={<ProtectedRoute allowedRoles={['worker']}><Layout><Attendance /></Layout></ProtectedRoute>} />
      <Route path="/worker/upload" element={<ProtectedRoute allowedRoles={['worker']}><Layout><WorkerUpload /></Layout></ProtectedRoute>} />
      <Route path="/worker/issues" element={<ProtectedRoute allowedRoles={['worker']}><Layout><IssueReporting /></Layout></ProtectedRoute>} />
      <Route path="/worker/notices" element={<ProtectedRoute allowedRoles={['worker']}><Layout><Notices /></Layout></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

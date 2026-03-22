/* ======================================
   MOCK DATA — Campus Construction Portal
   ====================================== */

// --- Users ---
export const users = {
  admin: {
    id: 'U001',
    name: 'Dr. Prasad Krishna',
    role: 'admin',
    title: 'Director',
    email: 'director@campus.edu',
    avatar: 'RS',
  },
  engineering: {
    id: 'U002',
    name: 'Er. Viswanath',
    role: 'engineering',
    title: 'Superintending Engineer',
    email: 'se@campus.edu',
    avatar: 'AV',
  },
  worker: {
    id: 'U003',
    name: 'Ramesh Kumar',
    role: 'worker',
    title: 'Mason',
    email: 'ramesh@campus.edu',
    avatar: 'RK',
  },
};

// --- Project Passport ---
export const projectPassport = {
  id: 'PRJ-2025-001',
  projectName: 'New Mega Ladies Hostel',
  buildingId: 'BLD-C-2025',
  blockName: 'Block C',
  geoLocation: { lat: 28.6139, lng: 77.209 },
  numberOfFloors: 'G+9',
  totalArea: '17179.20 m²',
  yearOfConstruction: 2025,
  startDate: '2025-03-15',
  expectedCompletionDate: '2027-03-15',
  currentStage: 'Structure',
  engineers: [
    { name: 'Er. S. Sreenesh', role: 'SE', phone: '9876543210' },
    { name: 'Er. P. K. Jose', role: 'EE', phone: '9876543211' },
    { name: 'Er. M. Viswanath', role: 'EE', phone: '9876543212' },
     { name: 'Vinod R', role: 'JE', phone: '9876543212' },
  ],
  contractor: {
    name: 'M/s BuildRight Constructions',
    contactPerson: 'Vikram Patel',
    phone: '9988776655',
    gstin: '07AABCU9603R1ZM',
    license: 'CON-2024-7849',
    address: '45, Industrial Area, Sector 12, New Delhi',
  },
  budgetAllocated: 85000000,
  budgetUsed: 32500000,
  budgetRemaining: 52500000,
  progressPercentage: 38,
  status: 'In Progress',
  milestones: [
    { id: 'M1', title: 'Site Preparation', date: '2025-03-15', status: 'completed', description: 'Land clearing and boundary fencing' },
    { id: 'M2', title: 'Foundation Work', date: '2025-05-20', status: 'completed', description: 'RCC footing and plinth beam' },
    { id: 'M3', title: 'Ground Floor Structure', date: '2025-08-10', status: 'completed', description: 'Columns, beams and slab for G.F.' },
    { id: 'M4', title: 'First Floor Structure', date: '2025-11-01', status: 'in-progress', description: 'Columns, beams and slab for 1st floor' },
    { id: 'M5', title: 'Second Floor Structure', date: '2026-01-15', status: 'pending', description: 'Structure for 2nd floor' },
    { id: 'M6', title: 'Third Floor Structure', date: '2026-03-01', status: 'pending', description: 'Structure for 3rd floor' },
    { id: 'M7', title: 'Fourth Floor Structure', date: '2026-04-15', status: 'pending', description: 'Structure for 4th floor' },
    { id: 'M8', title: 'Masonry & Plastering', date: '2026-05-30', status: 'pending', description: 'Brick work, plastering and finishing' },
    { id: 'M9', title: 'MEP Works', date: '2026-07-01', status: 'pending', description: 'Plumbing, electrical and sanitarywork' },
    { id: 'M10', title: 'Final Finishing & Handover', date: '2026-08-30', status: 'pending', description: 'Painting, flooring, handover' },
  ],
};

// --- Work Breakdown Structure (Stages & Sub-tasks) ---
export const workBreakdown = [
  { id: 'S1', stage: 'Site Preparation', progress: 100, status: 'completed', subtasks: ['Land survey', 'Boundary fencing', 'Temporary shed', 'Water & electricity connection'] },
  { id: 'S2', stage: 'Foundation', progress: 100, status: 'completed', subtasks: ['Excavation', 'PCC', 'RCC footing', 'Plinth beam', 'Anti-termite treatment'] },
  { id: 'S3', stage: 'Structure', progress: 45, status: 'in-progress', subtasks: ['Columns — G.F.', 'Beams — G.F.', 'Slab — G.F.', 'Columns — 1st Floor', 'Beams — 1st Floor', 'Slab — 1st Floor'] },
  { id: 'S4', stage: 'Masonry', progress: 0, status: 'pending', subtasks: ['Brick work — external', 'Brick work — internal', 'Plastering — internal', 'Plastering — external'] },
  { id: 'S5', stage: 'Plumbing', progress: 0, status: 'pending', subtasks: ['Water supply lines', 'Drainage lines', 'Sanitary fixtures', 'Rainwater harvesting'] },
  { id: 'S6', stage: 'Electrical', progress: 0, status: 'pending', subtasks: ['Conduit laying', 'Wiring', 'DB & MCB installation', 'Light fixtures', 'Earthing'] },
  { id: 'S7', stage: 'Finishing', progress: 0, status: 'pending', subtasks: ['Flooring', 'Painting', 'Door & windows', 'Railing', 'External development'] },
];

// --- Tasks ---
export const initialTasks = [
  { id: 'T001', title: 'Column Casting — 1st Floor (A1-A5)', description: 'Cast RCC columns A1 through A5 on the first floor using M25 grade concrete.', location: '1st Floor — Zone A', deadline: '2025-12-20', priority: 'high', status: 'in-progress', assignedTo: 'U003', stage: 'Structure', createdBy: 'U002' },
  { id: 'T002', title: 'Beam Shuttering — 1st Floor', description: 'Install formwork shuttering for beams on first floor.', location: '1st Floor — Zone B', deadline: '2025-12-25', priority: 'high', status: 'not-started', assignedTo: 'U003', stage: 'Structure', createdBy: 'U002' },
  { id: 'T003', title: 'Steel Binding — Slab 1st Floor', description: 'Bind reinforcement steel for first floor slab as per drawing.', location: '1st Floor', deadline: '2026-01-05', priority: 'medium', status: 'not-started', assignedTo: 'U003', stage: 'Structure', createdBy: 'U002' },
  { id: 'T004', title: 'Concrete Curing — G.F. Columns', description: 'Continue water curing of ground floor columns for 14 days.', location: 'Ground Floor', deadline: '2025-12-15', priority: 'low', status: 'completed', assignedTo: 'U003', stage: 'Structure', createdBy: 'U002' },
  { id: 'T005', title: 'Site Cleaning — Zone C', description: 'Clean debris and waste materials from Zone C area.', location: 'Ground Floor — Zone C', deadline: '2025-12-18', priority: 'low', status: 'completed', assignedTo: 'U003', stage: 'Site Preparation', createdBy: 'U002' },
  { id: 'T006', title: 'Plinth Beam Inspection', description: 'Inspect plinth beam alignment and level before backfilling.', location: 'Foundation Level', deadline: '2025-12-10', priority: 'high', status: 'completed', assignedTo: 'U003', stage: 'Foundation', createdBy: 'U002' },
];

// --- Workers ---
export const initialWorkers = [
  { id: 'W001', userId: 'U003', name: 'Ramesh Kumar', trade: 'Mason', phone: '9123456780', dailyWage: 800, status: 'active', attendance: 'present', joinDate: '2025-03-15' },
  { id: 'W002', userId: 'U004', name: 'Sunil Sharma', trade: 'Carpenter', phone: '9123456781', dailyWage: 750, status: 'active', attendance: 'present', joinDate: '2025-03-20' },
  { id: 'W003', userId: 'U005', name: 'Mohan Lal', trade: 'Steel Fixer', phone: '9123456782', dailyWage: 850, status: 'active', attendance: 'absent', joinDate: '2025-04-01' },
  { id: 'W004', userId: 'U006', name: 'Kamal Singh', trade: 'Electrician', phone: '9123456783', dailyWage: 900, status: 'active', attendance: 'present', joinDate: '2025-04-15' },
  { id: 'W005', userId: 'U007', name: 'Dinesh Yadav', trade: 'Plumber', phone: '9123456784', dailyWage: 850, status: 'active', attendance: 'present', joinDate: '2025-05-01' },
  { id: 'W006', userId: 'U008', name: 'Prem Chand', trade: 'Helper', phone: '9123456785', dailyWage: 550, status: 'inactive', attendance: 'absent', joinDate: '2025-03-15' },
  { id: 'W007', userId: 'U009', name: 'Arun Pal', trade: 'Mason', phone: '9123456786', dailyWage: 800, status: 'active', attendance: 'present', joinDate: '2025-06-01' },
  { id: 'W008', userId: 'U010', name: 'Govind Das', trade: 'Painter', phone: '9123456787', dailyWage: 700, status: 'active', attendance: 'present', joinDate: '2025-07-01' },
];

// --- Documents ---
export const initialDocuments = [
  { id: 'D001', name: 'Architectural Drawing — G.F. Plan', category: 'Drawings', uploadDate: '2025-03-10', uploadedBy: 'Er. Ankit Verma', size: '2.4 MB', type: 'PDF' },
  { id: 'D002', name: 'Structural Drawing — Foundation', category: 'Drawings', uploadDate: '2025-03-12', uploadedBy: 'Er. Priya Singh', size: '3.1 MB', type: 'PDF' },
  { id: 'D003', name: 'Detailed Estimate — Civil Works', category: 'Estimates', uploadDate: '2025-02-28', uploadedBy: 'Er. Ankit Verma', size: '1.8 MB', type: 'PDF' },
  { id: 'D004', name: 'BOQ — Main Building', category: 'BOQ', uploadDate: '2025-03-01', uploadedBy: 'Er. Ankit Verma', size: '980 KB', type: 'XLSX' },
  { id: 'D005', name: 'Administrative Approval', category: 'Approvals', uploadDate: '2025-02-15', uploadedBy: 'Admin Office', size: '540 KB', type: 'PDF' },
  { id: 'D006', name: 'Work Order — Contractor', category: 'Work Orders', uploadDate: '2025-03-05', uploadedBy: 'Er. Ankit Verma', size: '620 KB', type: 'PDF' },
  { id: 'D007', name: 'RA Bill No. 1', category: 'Bills', uploadDate: '2025-06-15', uploadedBy: 'Er. Suresh Yadav', size: '440 KB', type: 'PDF' },
  { id: 'D008', name: 'RA Bill No. 2', category: 'Bills', uploadDate: '2025-09-20', uploadedBy: 'Er. Suresh Yadav', size: '520 KB', type: 'PDF' },
  { id: 'D009', name: 'Completion Certificate — Foundation', category: 'Certificates', uploadDate: '2025-05-25', uploadedBy: 'Er. Priya Singh', size: '380 KB', type: 'PDF' },
  { id: 'D010', name: 'Site Photo — Oct 2025', category: 'Site Photos', uploadDate: '2025-10-30', uploadedBy: 'Er. Suresh Yadav', size: '5.2 MB', type: 'JPG' },
];

// --- Site Diary Entries ---
export const initialSiteDiary = [
  { id: 'SD001', date: '2025-12-14', weather: 'Clear', temperature: '22°C', workDone: 'Column casting for 1st floor Zone A completed. Shuttering for Zone B started.', labour: { skilled: 12, unskilled: 18 }, materials: 'Cement — 40 bags, Steel — 2 tons, Sand — 5 trucks', hindrance: 'None', remarks: 'Work progressing as per schedule.', author: 'Er. Suresh Yadav' },
  { id: 'SD002', date: '2025-12-13', weather: 'Partly Cloudy', temperature: '20°C', workDone: 'Steel binding for columns A1-A3 completed. Concrete ordered for next day.', labour: { skilled: 10, unskilled: 15 }, materials: 'Steel — 1.5 tons, Binding wire — 50 kg', hindrance: 'Slight delay in steel delivery by 2 hours.', remarks: 'Extra labour arranged for column casting.', author: 'Er. Suresh Yadav' },
  { id: 'SD003', date: '2025-12-12', weather: 'Clear', temperature: '21°C', workDone: 'Shuttering work for first floor columns in Zone A. Curing of ground floor slab continued.', labour: { skilled: 14, unskilled: 20 }, materials: 'Shuttering material, Plywood — 20 sheets', hindrance: 'None', remarks: 'Quality of shuttering alignment checked — OK.', author: 'Er. Suresh Yadav' },
];

// --- Financial Data ---
export const financialData = {
  totalAllocated: 85000000,
  totalBooked: 32500000,
  available: 52500000,
  bills: [
    { id: 'B001', description: 'RA Bill No. 1 — Foundation Work', amount: 12500000, date: '2025-06-15', status: 'paid', contractor: 'M/s BuildRight Constructions' },
    { id: 'B002', description: 'RA Bill No. 2 — G.F. Structure', amount: 15000000, date: '2025-09-20', status: 'paid', contractor: 'M/s BuildRight Constructions' },
    { id: 'B003', description: 'RA Bill No. 3 — 1st Floor (Partial)', amount: 5000000, date: '2025-12-10', status: 'pending', contractor: 'M/s BuildRight Constructions' },
  ],
  expenses: [
    { category: 'Civil Works', allocated: 55000000, spent: 27500000 },
    { category: 'Electrical', allocated: 10000000, spent: 0 },
    { category: 'Plumbing', allocated: 8000000, spent: 0 },
    { category: 'Finishing', allocated: 7000000, spent: 0 },
    { category: 'Contingency', allocated: 5000000, spent: 5000000 },
  ],
};

// --- Notifications ---
export const initialNotifications = [
  { id: 'N001', message: 'RA Bill No. 3 submitted for approval', time: '10 minutes ago', read: false, type: 'info' },
  { id: 'N002', message: 'Task "Column Casting — 1st Floor" marked as in-progress by Ramesh Kumar', time: '1 hour ago', read: false, type: 'update' },
  { id: 'N003', message: 'Worker Mohan Lal marked absent today', time: '3 hours ago', read: false, type: 'warning' },
  { id: 'N004', message: 'Milestone "Ground Floor Structure" completed', time: '2 days ago', read: true, type: 'success' },
  { id: 'N005', message: 'Material shortage reported — Steel (8mm bars)', time: '2 days ago', read: true, type: 'alert' },
  { id: 'N006', message: 'New document uploaded: Structural Drawing — 1st Floor', time: '3 days ago', read: true, type: 'info' },
];

// --- Issues Reported ---
export const initialIssues = [
  { id: 'ISS001', type: 'Material Shortage', description: 'Steel bars (8mm) stock is running low. Need 2 more tons.', reportedBy: 'Ramesh Kumar', date: '2025-12-13', status: 'open', priority: 'high' },
  { id: 'ISS002', type: 'Safety Issue', description: 'Safety net on first floor scaffolding needs replacement.', reportedBy: 'Sunil Sharma', date: '2025-12-12', status: 'resolved', priority: 'high' },
  { id: 'ISS003', type: 'Delay', description: 'Concrete mixer breakdown causing 4 hour delay.', reportedBy: 'Ramesh Kumar', date: '2025-12-10', status: 'resolved', priority: 'medium' },
];

// --- Notices for Workers ---
export const initialNotices = [
  { id: 'NT001', title: 'Safety Helmet Mandatory', message: 'All workers must wear safety helmets at all times on site. Non-compliance will result in penalties.', date: '2025-12-14', issuedBy: 'Er. Ankit Verma', priority: 'high' },
  { id: 'NT002', title: 'Schedule Change — Column Casting', message: 'Column casting for Zone B has been moved to December 20. Prepare shuttering accordingly.', date: '2025-12-13', issuedBy: 'Er. Priya Singh', priority: 'medium' },
  { id: 'NT003', title: 'Weekly Off — Sunday', message: 'Reminder: All workers have a weekly off on Sunday. Emergency duty roster will be posted separately.', date: '2025-12-11', issuedBy: 'Er. Suresh Yadav', priority: 'low' },
];

// --- Quality Register ---
export const qualityRegister = [
  { id: 'QR001', test: 'Cube Test — M25 Concrete', date: '2025-12-10', result: 'Pass — 28.4 MPa', standard: '25 MPa min', status: 'pass' },
  { id: 'QR002', test: 'Slump Test — Concrete', date: '2025-12-10', result: '85mm', standard: '75-100mm', status: 'pass' },
  { id: 'QR003', test: 'Steel Tensile Test — Fe500', date: '2025-11-28', result: '520 MPa', standard: '500 MPa min', status: 'pass' },
  { id: 'QR004', test: 'Soil Bearing Capacity', date: '2025-03-10', result: '18 T/m²', standard: '15 T/m² min', status: 'pass' },
];

// --- Material Test Log ---
export const materialTestLog = [
  { id: 'MT001', material: 'OPC Cement — 53 Grade', supplier: 'Ambuja Cements', testDate: '2025-03-05', result: 'Approved', certificate: 'Yes' },
  { id: 'MT002', material: 'TMT Steel — Fe500D', supplier: 'Tata Steel', testDate: '2025-03-08', result: 'Approved', certificate: 'Yes' },
  { id: 'MT003', material: 'River Sand — Zone II', supplier: 'Local', testDate: '2025-03-10', result: 'Approved', certificate: 'Yes' },
  { id: 'MT004', material: 'Coarse Aggregate — 20mm', supplier: 'Local', testDate: '2025-03-10', result: 'Approved', certificate: 'Yes' },
];

// --- Hindrance Register ---
export const hindranceRegister = [
  { id: 'H001', date: '2025-12-13', description: 'Steel delivery delayed by 2 hours', cause: 'Supplier issue', duration: '2 hours', action: 'Called backup supplier', resolved: true },
  { id: 'H002', date: '2025-12-10', description: 'Concrete mixer breakdown', cause: 'Mechanical fault', duration: '4 hours', action: 'Hired another mixer', resolved: true },
  { id: 'H003', date: '2025-11-15', description: 'Heavy rain — work stopped', cause: 'Weather', duration: '1 day', action: 'Covered exposed areas with tarpaulin', resolved: true },
];

// --- Helper to format currency in Indian format ---
export function formatINR(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

// --- Helper to get status color ---
export function getStatusColor(status) {
  const s = status?.toLowerCase();
  if (['completed', 'paid', 'pass', 'active', 'present', 'approved', 'resolved'].includes(s)) return 'green';
  if (['in-progress', 'in progress', 'partially', 'pending'].includes(s)) return 'yellow';
  if (['delayed', 'overdue', 'rejected', 'absent', 'open', 'high'].includes(s)) return 'red';
  if (['not-started', 'not started', 'inactive', 'planning'].includes(s)) return 'gray';
  return 'blue';
}

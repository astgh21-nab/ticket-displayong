import { TrendingUp, CheckCircle, Clock, AlertCircle, Ticket, Users, Activity, Calendar, ArrowUp, ArrowDown, Zap, Award, BarChart3, Settings, Bell, User, Menu, ChevronRight, Sparkles, Eye, ThumbsUp, MessageCircle, Clock as ClockIcon, AlertTriangle, ArrowLeft, Home, LayoutDashboard, PieChart, Target, Flag, Star, TrendingDown, Layers, GitBranch, Shield, Cloud, Database, Code, Smartphone, Layout, Briefcase, Heart, PieChart as PieChartIcon, LineChart, BarChart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie, Radar, PolarArea } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  RadialLinearScale
);

export default function HandlerDashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [handlerName, setHandlerName] = useState("Ticket Handler");
  const [assignedTickets, setAssignedTickets] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    if (userName) {
      setHandlerName(userName);
    } else if (userEmail) {
      setHandlerName(userEmail.split('@')[0]);
    }
    
    loadTicketsFromStorage();
    
    return () => clearInterval(timer);
  }, []);

  const loadTicketsFromStorage = () => {
    const savedTickets = localStorage.getItem("assignedTickets");
    if (savedTickets) {
      setAssignedTickets(JSON.parse(savedTickets));
    } else {
      const defaultTickets = getDefaultTickets();
      setAssignedTickets(defaultTickets);
      localStorage.setItem("assignedTickets", JSON.stringify(defaultTickets));
    }
  };

  const getDefaultTickets = () => {
    return [
      { id: "TKT-001", title: "New developer onboarding access request", project: "User & Access Management", projectIcon: "👥", status: "Open", priority: "High", assignedBy: "Sarah Johnson", assignedDate: "2025-04-01", dueDate: "2025-04-10", description: "New developer starting next week needs full access to repositories and databases", createdAt: "2025-04-01" },
      { id: "TKT-002", title: "Role change from Editor to Admin", project: "User & Access Management", projectIcon: "👥", status: "In Progress", priority: "Critical", assignedBy: "Mike Chen", assignedDate: "2025-04-02", dueDate: "2025-04-08", description: "Senior developer needs admin access for deployment", createdAt: "2025-04-02" },
      { id: "TKT-003", title: "Remove access for departed employee", project: "User & Access Management", projectIcon: "👥", status: "Open", priority: "High", assignedBy: "HR Department", assignedDate: "2025-04-03", dueDate: "2025-04-09", description: "Employee left the company, need to revoke all access", createdAt: "2025-04-03" },
      { id: "TKT-004", title: "Guest access for contractor", project: "User & Access Management", projectIcon: "👥", status: "Done", priority: "Medium", assignedBy: "Project Manager", assignedDate: "2025-03-28", dueDate: "2025-04-05", description: "External contractor needs limited access to specific repos", createdAt: "2025-03-28" },
      { id: "TKT-005", title: "Permission review for Q1", project: "User & Access Management", projectIcon: "👥", status: "Review", priority: "Medium", assignedBy: "Security Team", assignedDate: "2025-04-01", dueDate: "2025-04-15", description: "Quarterly access review for all employees", createdAt: "2025-04-01" },
      { id: "TKT-006", title: "API access token request", project: "User & Access Management", projectIcon: "👥", status: "Open", priority: "High", assignedBy: "DevOps Team", assignedDate: "2025-04-04", dueDate: "2025-04-11", description: "New API integration needs access tokens", createdAt: "2025-04-04" },
      { id: "TKT-007", title: "MFA setup for new users", project: "User & Access Management", projectIcon: "👥", status: "In Progress", priority: "Medium", assignedBy: "IT Security", assignedDate: "2025-04-02", dueDate: "2025-04-12", description: "Configure MFA for recently onboarded users", createdAt: "2025-04-02" },
      { id: "TKT-008", title: "Database read access request", project: "User & Access Management", projectIcon: "👥", status: "Open", priority: "Low", assignedBy: "Data Team", assignedDate: "2025-04-05", dueDate: "2025-04-20", description: "Analyst needs read access to production database", createdAt: "2025-04-05" },
      { id: "TKT-009", title: "Q1 expense reimbursement", project: "Financial & Payments", projectIcon: "💰", status: "In Progress", priority: "High", assignedBy: "Finance Dept", assignedDate: "2025-03-30", dueDate: "2025-04-10", description: "Process Q1 travel and entertainment expenses", createdAt: "2025-03-30" },
      { id: "TKT-010", title: "Invoice payment delayed", project: "Financial & Payments", projectIcon: "💰", status: "Open", priority: "Critical", assignedBy: "Vendor Management", assignedDate: "2025-04-01", dueDate: "2025-04-07", description: "Vendor invoice INV-2025-001 is overdue", createdAt: "2025-04-01" },
      { id: "TKT-011", title: "Budget approval for new hardware", project: "Financial & Payments", projectIcon: "💰", status: "Review", priority: "Medium", assignedBy: "IT Manager", assignedDate: "2025-04-03", dueDate: "2025-04-18", description: "Need budget approval for new developer laptops", createdAt: "2025-04-03" },
      { id: "TKT-012", title: "Client payment status inquiry", project: "Financial & Payments", projectIcon: "💰", status: "Open", priority: "High", assignedBy: "Sales Team", assignedDate: "2025-04-04", dueDate: "2025-04-11", description: "Client asking about payment status for invoice INV-089", createdAt: "2025-04-04" },
      { id: "TKT-013", title: "Monthly subscription billing", project: "Financial & Payments", projectIcon: "💰", status: "Done", priority: "Low", assignedBy: "Billing Team", assignedDate: "2025-03-25", dueDate: "2025-04-01", description: "Process monthly subscription renewals", createdAt: "2025-03-25" },
      { id: "TKT-014", title: "Refund request processing", project: "Financial & Payments", projectIcon: "💰", status: "In Progress", priority: "Medium", assignedBy: "Customer Support", assignedDate: "2025-04-02", dueDate: "2025-04-14", description: "Customer requested refund for duplicate charge", createdAt: "2025-04-02" },
      { id: "TKT-015", title: "New laptop for developer", project: "Hardware & Equipment", projectIcon: "💻", status: "In Progress", priority: "High", assignedBy: "IT Dept", assignedDate: "2025-04-01", dueDate: "2025-04-09", description: "New MacBook Pro for backend developer", createdAt: "2025-04-01" },
      { id: "TKT-016", title: "Monitor replacement", project: "Hardware & Equipment", projectIcon: "💻", status: "Done", priority: "Medium", assignedBy: "Office Manager", assignedDate: "2025-03-28", dueDate: "2025-04-04", description: "Replace broken 27-inch monitor in design team", createdAt: "2025-03-28" },
      { id: "TKT-017", title: "Keyboard and mouse set", project: "Hardware & Equipment", projectIcon: "💻", status: "Open", priority: "Low", assignedBy: "Employee", assignedDate: "2025-04-05", dueDate: "2025-04-19", description: "Ergonomic keyboard and mouse request", createdAt: "2025-04-05" },
      { id: "TKT-018", title: "Conference room equipment", project: "Hardware & Equipment", projectIcon: "💻", status: "Open", priority: "Medium", assignedBy: "Facilities", assignedDate: "2025-04-03", dueDate: "2025-04-17", description: "New cameras and microphones for meeting rooms", createdAt: "2025-04-03" },
      { id: "TKT-019", title: "Desk and chair request", project: "Hardware & Equipment", projectIcon: "💻", status: "Review", priority: "Low", assignedBy: "HR", assignedDate: "2025-04-02", dueDate: "2025-04-16", description: "New standing desk and ergonomic chair", createdAt: "2025-04-02" },
      { id: "TKT-020", title: "Adobe Creative Cloud license", project: "Software & Licensing", projectIcon: "📦", status: "Open", priority: "High", assignedBy: "Design Team", assignedDate: "2025-04-01", dueDate: "2025-04-10", description: "New designer needs Adobe Creative Cloud license", createdAt: "2025-04-01" },
      { id: "TKT-021", title: "Jira license renewal", project: "Software & Licensing", projectIcon: "📦", status: "In Progress", priority: "Critical", assignedBy: "IT Admin", assignedDate: "2025-03-30", dueDate: "2025-05-01", description: "Annual Jira Software license renewal", createdAt: "2025-03-30" },
      { id: "TKT-022", title: "VS Code extension licenses", project: "Software & Licensing", projectIcon: "📦", status: "Done", priority: "Low", assignedBy: "Dev Team", assignedDate: "2025-03-27", dueDate: "2025-04-03", description: "Purchase licenses for paid VS Code extensions", createdAt: "2025-03-27" },
      { id: "TKT-023", title: "Database tool license", project: "Software & Licensing", projectIcon: "📦", status: "Open", priority: "Medium", assignedBy: "DBA Team", assignedDate: "2025-04-04", dueDate: "2025-04-18", description: "License for DBeaver Pro for database team", createdAt: "2025-04-04" },
      { id: "TKT-024", title: "Compliance software audit", project: "Software & Licensing", projectIcon: "📦", status: "Review", priority: "High", assignedBy: "Compliance", assignedDate: "2025-04-02", dueDate: "2025-04-12", description: "Software license compliance audit for Q2", createdAt: "2025-04-02" },
      { id: "TKT-025", title: "Production server downtime", project: "Support & Incidents", projectIcon: "⚡", status: "In Progress", priority: "Critical", assignedBy: "DevOps", assignedDate: "2025-04-03", dueDate: "2025-04-05", description: "API gateway returning 500 errors, impacting customers", createdAt: "2025-04-03" },
      { id: "TKT-026", title: "Client complaint about response time", project: "Support & Incidents", projectIcon: "⚡", status: "Open", priority: "High", assignedBy: "Customer Support", assignedDate: "2025-04-04", dueDate: "2025-04-11", description: "Client upset about slow ticket resolution", createdAt: "2025-04-04" },
      { id: "TKT-027", title: "Database performance issue", project: "Support & Incidents", projectIcon: "⚡", status: "In Progress", priority: "High", assignedBy: "DBA", assignedDate: "2025-04-02", dueDate: "2025-04-09", description: "Slow queries affecting dashboard performance", createdAt: "2025-04-02" },
      { id: "TKT-028", title: "Security vulnerability report", project: "Support & Incidents", projectIcon: "⚡", status: "Open", priority: "Critical", assignedBy: "Security Team", assignedDate: "2025-04-05", dueDate: "2025-04-07", description: "Critical security vulnerability in authentication module", createdAt: "2025-04-05" },
      { id: "TKT-029", title: "Mobile app crash report", project: "Support & Incidents", projectIcon: "⚡", status: "Done", priority: "High", assignedBy: "QA Team", assignedDate: "2025-03-29", dueDate: "2025-04-04", description: "iOS app crashing on startup for some users", createdAt: "2025-03-29" },
      { id: "TKT-030", title: "Data backup failure", project: "Support & Incidents", projectIcon: "⚡", status: "Open", priority: "Critical", assignedBy: "Infrastructure", assignedDate: "2025-04-05", dueDate: "2025-04-06", description: "Automated backup job failing for past 3 days", createdAt: "2025-04-05" },
    ];
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Statistics based on actual assigned tickets
  const stats = {
    total: assignedTickets.length,
    open: assignedTickets.filter(t => t.status === "Open").length,
    inProgress: assignedTickets.filter(t => t.status === "In Progress").length,
    inReview: assignedTickets.filter(t => t.status === "Review").length,
    resolved: assignedTickets.filter(t => t.status === "Done").length,
    closed: assignedTickets.filter(t => t.status === "Closed").length,
    urgent: assignedTickets.filter(t => t.priority === "Critical").length,
    high: assignedTickets.filter(t => t.priority === "High").length,
    medium: assignedTickets.filter(t => t.priority === "Medium").length,
    low: assignedTickets.filter(t => t.priority === "Low").length,
    avgResponseTime: "2.1h",
    avgResolutionTime: "3.5d",
    satisfaction: "94%",
    slaCompliance: "96",
    reopened: 2,
    escalated: 3,
    monthlyGrowth: "+12%",
    weeklyActive: 45,
    myTickets: assignedTickets.length,
    myResolved: assignedTickets.filter(t => t.status === "Done").length,
  };

  // Get project distribution
  const projectStats = {
    userAccess: assignedTickets.filter(t => t.project === "User & Access Management").length,
    financial: assignedTickets.filter(t => t.project === "Financial & Payments").length,
    hardware: assignedTickets.filter(t => t.project === "Hardware & Equipment").length,
    software: assignedTickets.filter(t => t.project === "Software & Licensing").length,
    support: assignedTickets.filter(t => t.project === "Support & Incidents").length,
  };

  // Weekly Data based on ticket creation
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Assigned',
        data: [5, 4, 6, 3, 5, 2, 0],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Resolved',
        data: [3, 2, 4, 2, 3, 1, 0],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'In Progress',
        data: [2, 2, 2, 1, 2, 1, 0],
        borderColor: '#f59e0b',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  // Priority Distribution
  const priorityData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [{
      data: [stats.urgent, stats.high, stats.medium, stats.low],
      backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  // Status Distribution Pie
  const statusData = {
    labels: ['Open', 'In Progress', 'Review', 'Done'],
    datasets: [{
      data: [stats.open, stats.inProgress, stats.inReview, stats.resolved],
      backgroundColor: ['#ef4444', '#f59e0b', '#8b5cf6', '#10b981'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  // Category Distribution by Project
  const categoryData = {
    labels: ['User Access', 'Financial', 'Hardware', 'Software', 'Support'],
    datasets: [{
      data: [projectStats.userAccess, projectStats.financial, projectStats.hardware, projectStats.software, projectStats.support],
      backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'],
      borderRadius: 6,
    }],
  };

  // Monthly Data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Assigned',
        data: [8, 12, 15, 30, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: 'Resolved',
        data: [6, 9, 12, 18, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  // Department Performance Radar
  const departmentRadarData = {
    labels: ['User Access', 'Financial', 'Hardware', 'Software', 'Support'],
    datasets: [{
      label: 'Performance %',
      data: [94, 88, 91, 86, 82],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3b82f6',
      borderWidth: 2,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#fff',
      pointRadius: 4,
    }],
  };

  // SLA Compliance Bar
  const slaData = {
    labels: ['User Access', 'Financial', 'Hardware', 'Software', 'Support'],
    datasets: [{
      label: 'SLA %',
      data: [98, 94, 92, 89, 86],
      backgroundColor: '#10b981',
      borderRadius: 6,
    }],
  };

  // Polar Area Chart - Priority Impact
  const polarData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [{
      data: [stats.urgent, stats.high, stats.medium, stats.low],
      backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  // Resolution Time Trend
  const resolutionTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Avg Resolution (days)',
        data: [5, 4.5, 3.8, 3.2],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
      {
        label: 'Avg Response (hours)',
        data: [3.2, 2.8, 2.4, 2.1],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  // Customer Satisfaction Trend
  const satisfactionTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Satisfaction %',
      data: [88, 90, 92, 93, 94, 95],
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 5,
      pointBackgroundColor: '#8b5cf6',
    }],
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Open": return { bg: "#dbeafe", color: "#2563eb", dot: "#3b82f6" };
      case "In Progress": return { bg: "#fed7aa", color: "#ea580c", dot: "#f97316" };
      case "Review": return { bg: "#f3e8ff", color: "#9333ea", dot: "#a855f7" };
      case "Done": return { bg: "#d1fae5", color: "#059669", dot: "#10b981" };
      default: return { bg: "#f1f5f9", color: "#64748b", dot: "#94a3b8" };
    }
  };

  const getPriorityBadge = (priority) => {
    const p = { Critical: "#dc2626", High: "#ea580c", Medium: "#ca8a04", Low: "#16a34a" };
    return <span style={{ background: `${p[priority]}15`, color: p[priority], padding: "2px 8px", borderRadius: "16px", fontSize: "10px", fontWeight: "600" }}>{priority}</span>;
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { font: { size: 10 } } } }, scales: { y: { beginAtZero: true, grid: { color: '#e2e8f0' } } } };
  const doughnutOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 10 } } } }, cutout: '60%' };
  const pieOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 9 } } } } };
  const radarOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { font: { size: 10 } } } }, scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } } };
  const barOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#e2e8f0' } }, x: { grid: { display: false } } } };
  const polarOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 9 } } } } };

  const recentTickets = assignedTickets.slice(0, 8);

  const topPerformers = [
    { name: "Lisa Wong", resolved: 12, rating: 4.9, avatar: "LW", color: "#8b5cf6", tickets: 12 },
    { name: "Sarah Chen", resolved: 10, rating: 4.8, avatar: "SC", color: "#3b82f6", tickets: 10 },
    { name: "Mike Johnson", resolved: 9, rating: 4.7, avatar: "MJ", color: "#10b981", tickets: 9 },
    { name: "John Davis", resolved: 8, rating: 4.6, avatar: "JD", color: "#f59e0b", tickets: 8 },
  ];

  return (
    <div style={{ padding: "16px 24px", background: "#f0f4fa", minHeight: "100vh", overflowY: "auto", width: "100%" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => navigate("/tickethandler")} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 20px", background: "linear-gradient(135deg, #0B3D91, #1a52b8)", border: "none", borderRadius: "32px", color: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}><ArrowLeft size={16} /><span>Back</span></button>
            <div style={{ width: "1px", height: "30px", background: "#e2e8f0" }} />
            <div><div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "44px", height: "44px", background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}><LayoutDashboard size={24} color="#fff" /></div>
              <div><h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0a2540", margin: 0 }}>{greeting}, {handlerName}!</h1><p style={{ color: "#64748b", marginTop: "4px", fontSize: "12px" }}>{formatDate()} • {stats.total} assigned tickets</p></div>
            </div></div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "4px", background: "#fff", padding: "3px", borderRadius: "32px", border: "1px solid #e2e8f0" }}>
              {["day", "week", "month", "year"].map(period => (<button key={period} onClick={() => setSelectedPeriod(period)} style={{ padding: "4px 14px", borderRadius: "24px", border: "none", background: selectedPeriod === period ? "linear-gradient(135deg, #0B3D91, #1a52b8)" : "transparent", color: selectedPeriod === period ? "#fff" : "#64748b", cursor: "pointer", fontSize: "11px", fontWeight: "500" }}>{period.charAt(0).toUpperCase() + period.slice(1)}</button>))}
            </div>
            <div style={{ width: "36px", height: "36px", background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px solid #e2e8f0" }}><Bell size={18} color="#64748b" /></div>
          </div>
        </div>

        <div style={{ background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "16px", padding: "16px 24px", marginTop: "12px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: "-20px", top: "-20px", opacity: 0.1 }}><Activity size={100} /></div>
          <div><h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "6px" }}>🎫 Welcome to Your Handler Dashboard</h2><p style={{ fontSize: "12px" }}>{stats.myResolved} resolved by you • {stats.myTickets} assigned tickets • {stats.slaCompliance}% SLA</p></div>
        </div>
      </div>

      {/* 8 Statistics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "10px", marginBottom: "20px" }}>
        {[
          { icon: <Ticket size={16} />, label: "Total", value: stats.total, change: "+0%", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
          { icon: <Activity size={16} />, label: "Open", value: stats.open, change: "+0%", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
          { icon: <ClockIcon size={16} />, label: "Progress", value: stats.inProgress, change: "0%", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
          { icon: <CheckCircle size={16} />, label: "Done", value: stats.resolved, change: "+0%", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
          { icon: <Target size={16} />, label: "My Tickets", value: stats.myTickets, change: "+0", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
          { icon: <CheckCircle size={16} />, label: "My Resolved", value: stats.myResolved, change: "+0", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
          { icon: <Zap size={16} />, label: "Critical", value: stats.urgent, change: "0%", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
          { icon: <TrendingUp size={16} />, label: "Growth", value: stats.monthlyGrowth, change: "+0%", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
        ].map((stat, idx) => (
          <div key={idx} style={{ background: "#fff", borderRadius: "12px", padding: "10px", border: "1px solid #e9eef3", transition: "all 0.3s ease" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.06)"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ width: "28px", height: "28px", background: stat.bg, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>{stat.icon}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "2px", background: stat.change.includes("+") ? "#d1fae5" : "#fee2e2", padding: "1px 4px", borderRadius: "16px" }}>
                {stat.change.includes("+") ? <ArrowUp size={8} color="#10b981" /> : <ArrowDown size={8} color="#ef4444" />}
                <span style={{ fontSize: "8px", fontWeight: "600", color: stat.change.includes("+") ? "#059669" : "#dc2626" }}>{stat.change}</span>
              </div>
            </div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: "#0a2540", marginTop: "6px" }}>{stat.value}</div>
            <div style={{ fontSize: "9px", color: "#64748b" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Row 1: 3 Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>📈 Weekly Trends</h3><div style={{ height: "200px" }}><Line data={weeklyData} options={chartOptions} /></div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>🎯 Priority</h3><div style={{ height: "200px" }}><Doughnut data={priorityData} options={doughnutOptions} /></div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>📊 Status</h3><div style={{ height: "200px" }}><Pie data={statusData} options={pieOptions} /></div></div>
      </div>

      {/* Row 2: 2 Large Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>📅 Monthly Performance</h3><div style={{ height: "220px" }}><Line data={monthlyData} options={chartOptions} /></div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>🔧 Project Types</h3><div style={{ height: "220px" }}><Bar data={categoryData} options={barOptions} /></div></div>
      </div>

      {/* Row 3: 2 Charts + Polar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>⚡ Department</h3><div style={{ height: "220px" }}><Radar data={departmentRadarData} options={radarOptions} /></div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>🎯 SLA Compliance</h3><div style={{ height: "220px" }}><Bar data={slaData} options={barOptions} /></div><div style={{ marginTop: "8px", padding: "6px", background: "#f0fdf4", borderRadius: "8px", textAlign: "center", fontSize: "11px" }}>SLA: {stats.slaCompliance}%</div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>🌀 Priority Impact</h3><div style={{ height: "220px" }}><PolarArea data={polarData} options={polarOptions} /></div></div>
      </div>

      {/* Row 4: Resolution Trends + Satisfaction */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>⏱️ Resolution Time</h3><div style={{ height: "200px" }}><Line data={resolutionTrendData} options={chartOptions} /></div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>😊 Satisfaction</h3><div style={{ height: "200px" }}><Line data={satisfactionTrendData} options={chartOptions} /></div></div>
      </div>

      {/* Key Metrics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "20px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", textAlign: "center" }}><div style={{ fontSize: "28px", fontWeight: "800", color: "#3b82f6" }}>{stats.avgResponseTime}</div><div style={{ fontSize: "11px" }}>Avg Response</div><div style={{ fontSize: "9px", color: "#10b981" }}>↓ 0.3h</div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", textAlign: "center" }}><div style={{ fontSize: "28px", fontWeight: "800", color: "#10b981" }}>{stats.avgResolutionTime}</div><div style={{ fontSize: "11px" }}>Avg Resolution</div><div style={{ fontSize: "9px", color: "#10b981" }}>↓ 0.5d</div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", textAlign: "center" }}><div style={{ fontSize: "28px", fontWeight: "800", color: "#ef4444" }}>{stats.reopened}</div><div style={{ fontSize: "11px" }}>Reopened</div><div style={{ fontSize: "9px", color: "#ef4444" }}>↑ 0</div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", textAlign: "center" }}><div style={{ fontSize: "28px", fontWeight: "800", color: "#f59e0b" }}>{stats.escalated}</div><div style={{ fontSize: "11px" }}>Escalated</div><div style={{ fontSize: "9px", color: "#10b981" }}>↓ 0</div></div>
      </div>

      {/* Recent Tickets Table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e9eef3", overflow: "hidden", marginBottom: "20px" }}>
        <div style={{ padding: "12px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><h3 style={{ fontSize: "14px", margin: 0 }}>🕒 Recent Tickets</h3><p style={{ fontSize: "11px", margin: "2px 0 0", color: "#64748b" }}>Latest 8 of {stats.total} tickets</p></div>
          <button onClick={() => navigate("/tickethandler/tickets")} style={{ padding: "6px 16px", background: "#f1f5f9", border: "none", borderRadius: "24px", cursor: "pointer", fontSize: "11px" }}>View All <ChevronRight size={12} /></button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead><tr style={{ background: "#f8fafc" }}><th style={{ padding: "10px 12px", fontSize: "11px" }}>ID</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Project</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Title</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Status</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Priority</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Assigned By</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Due Date</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Action</th></tr></thead>
            <tbody>{recentTickets.map((t, i) => { const sc = getStatusColor(t.status); const isOverdue = new Date(t.dueDate) < new Date() && t.status !== "Done"; return (<tr key={t.id} style={{ borderBottom: "1px solid #f1f5f9" }}><td style={{ padding: "10px 12px", fontFamily: "monospace", color: "#3b82f6" }}>{t.id}</td><td style={{ padding: "10px 12px" }}><span style={{ background: t.project === "User & Access Management" ? "#dbeafe" : t.project === "Financial & Payments" ? "#d1fae5" : t.project === "Hardware & Equipment" ? "#f3e8ff" : t.project === "Software & Licensing" ? "#fed7aa" : "#fee2e2", padding: "2px 8px", borderRadius: "16px", fontSize: "10px" }}>{t.projectIcon} {t.project.split(' ')[0]}</span></td><td style={{ padding: "10px 12px", fontWeight: "500" }}>{t.title.substring(0, 35)}...</td><td style={{ padding: "10px 12px" }}><div style={{ display: "flex", alignItems: "center", gap: "4px" }}><div style={{ width: "6px", height: "6px", background: sc.dot, borderRadius: "50%" }} /><span style={{ background: sc.bg, color: sc.color, padding: "2px 8px", borderRadius: "16px", fontSize: "10px" }}>{sc.label}</span></div></td><td style={{ padding: "10px 12px" }}>{getPriorityBadge(t.priority)}</td><td style={{ padding: "10px 12px" }}><div style={{ display: "flex", alignItems: "center", gap: "4px" }}><div style={{ width: "24px", height: "24px", background: "linear-gradient(135deg, #e0e7ff, #c7d2fe)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>{t.assignedBy?.charAt(0)}</div>{t.assignedBy?.split(' ')[0]}</div></td><td style={{ padding: "10px 12px", color: isOverdue ? "#ef4444" : "#64748b", fontWeight: isOverdue ? "500" : "normal" }}><Calendar size={10} /> {t.dueDate}</td><td style={{ padding: "10px 12px" }}><button onClick={() => navigate("/tickethandler/tickets")} style={{ padding: "4px 10px", background: "#eef2ff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "10px", color: "#0B3D91" }}>View</button></td></tr>)})}</tbody>
          </table>
        </div>
      </div>

      {/* Top Performers & Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "16px", border: "1px solid #e9eef3" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}><div style={{ width: "36px", height: "36px", background: "#fef3c7", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🏆</div><div><h3 style={{ fontSize: "14px", margin: 0 }}>Top Performers</h3><p style={{ fontSize: "10px", color: "#64748b", margin: "2px 0 0" }}>Most resolved tickets</p></div></div>
          <div>{topPerformers.map((p, i) => (<div key={p.name} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px", borderRadius: "10px" }}><div style={{ width: "36px", height: "36px", background: `linear-gradient(135deg, ${p.color}30, ${p.color}15)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: p.color }}>{p.avatar}</div><div style={{ flex: 1 }}><div style={{ fontWeight: "600", fontSize: "12px" }}>{p.name}</div><div style={{ fontSize: "10px", color: "#64748b" }}>{p.resolved} resolved • ⭐ {p.rating}</div></div><div style={{ fontSize: "18px", fontWeight: "700", color: p.color }}>{p.tickets}</div></div>))}</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "16px", padding: "20px", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}><Zap size={22} /><h3 style={{ fontSize: "16px", fontWeight: "700", margin: 0 }}>Quick Actions</h3></div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
            <button onClick={() => navigate("/tickethandler/tickets")} style={{ padding: "8px 18px", background: "rgba(255,255,255,0.2)", borderRadius: "32px", cursor: "pointer", color: "#fff", fontSize: "12px", border: "none" }}>+ New Ticket</button>
            <button onClick={() => navigate("/tickethandler/tickets")} style={{ padding: "8px 18px", background: "rgba(255,255,255,0.2)", borderRadius: "32px", cursor: "pointer", color: "#fff", fontSize: "12px", border: "none" }}>View All</button>
            <button onClick={() => navigate("/tickethandler/projects")} style={{ padding: "8px 18px", background: "rgba(255,255,255,0.2)", borderRadius: "32px", cursor: "pointer", color: "#fff", fontSize: "12px", border: "none" }}>Projects</button>
          </div>
          <div style={{ padding: "12px", background: "rgba(255,255,255,0.12)", borderRadius: "12px" }}><ThumbsUp size={14} /> <span style={{ fontWeight: "600", fontSize: "12px" }}>Pro Tip</span><p style={{ fontSize: "10px", marginTop: "4px" }}>Update ticket status regularly to maintain SLA compliance.</p></div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-15px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRow { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}
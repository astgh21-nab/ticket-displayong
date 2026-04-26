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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    
    // Get handler name from localStorage
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    if (userName) {
      setHandlerName(userName);
    } else if (userEmail) {
      setHandlerName(userEmail.split('@')[0]);
    }
    
    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Enhanced Statistics
  const stats = {
    total: 248,
    open: 86,
    inProgress: 42,
    inReview: 18,
    resolved: 124,
    closed: 102,
    urgent: 12,
    high: 28,
    medium: 45,
    low: 61,
    avgResponseTime: "2.4h",
    avgResolutionTime: "18.5h",
    satisfaction: "94%",
    slaCompliance: "97",
    reopened: 8,
    escalated: 5,
    monthlyGrowth: "+18%",
    weeklyActive: 156,
    myTickets: 12,
    myResolved: 8,
  };

  // Weekly Data with 3 lines
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Created',
        data: [18, 24, 22, 28, 32, 15, 10],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Resolved',
        data: [12, 18, 20, 22, 28, 18, 12],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'In Progress',
        data: [6, 6, 2, 6, 4, -3, -2],
        borderColor: '#f59e0b',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
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
      borderWidth: 3,
    }],
  };

  // Status Distribution Pie
  const statusData = {
    labels: ['Open', 'In Progress', 'In Review', 'Resolved', 'Closed'],
    datasets: [{
      data: [stats.open, stats.inProgress, stats.inReview, stats.resolved, stats.closed],
      backgroundColor: ['#ef4444', '#f59e0b', '#8b5cf6', '#10b981', '#3b82f6'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  // Category Distribution - 8 categories
  const categoryData = {
    labels: ['Technical', 'Hardware', 'Access', 'Software', 'Network', 'Billing', 'Security', 'Features'],
    datasets: [{
      data: [52, 38, 45, 29, 24, 18, 15, 27],
      backgroundColor: [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
        '#8b5cf6', '#ec489a', '#06b6d4', '#f97316'
      ],
      borderRadius: 8,
    }],
  };

  // Monthly Data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Created',
        data: [45, 52, 48, 62, 58, 72, 85, 78, 92, 88, 95, 102],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
      {
        label: 'Resolved',
        data: [38, 44, 42, 55, 52, 65, 78, 72, 85, 82, 88, 96],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  // Department Performance Radar
  const departmentRadarData = {
    labels: ['IT', 'DevOps', 'Hardware', 'Network', 'Security', 'Billing', 'HR'],
    datasets: [{
      label: 'Performance %',
      data: [92, 88, 85, 78, 82, 95, 90],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3b82f6',
      borderWidth: 2,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#fff',
      pointRadius: 5,
    }],
  };

  // SLA Compliance Bar
  const slaData = {
    labels: ['Technical', 'Hardware', 'Access', 'Software', 'Network', 'Billing', 'Security'],
    datasets: [{
      label: 'SLA %',
      data: [96, 92, 98, 94, 88, 99, 91],
      backgroundColor: '#10b981',
      borderRadius: 8,
    }],
  };

  // Polar Area Chart - Priority Impact
  const polarData = {
    labels: ['Critical', 'High', 'Medium', 'Low', 'Info'],
    datasets: [{
      data: [12, 28, 45, 61, 32],
      backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#8b5cf6'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  // Resolution Time Trend
  const resolutionTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Avg Resolution (hours)',
        data: [22, 19, 17, 14],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
      },
      {
        label: 'Avg Response (hours)',
        data: [3.2, 2.8, 2.5, 2.2],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
      },
    ],
  };

  // Customer Satisfaction Trend
  const satisfactionTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Satisfaction %',
      data: [88, 90, 91, 93, 94, 96],
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 6,
      pointBackgroundColor: '#8b5cf6',
    }],
  };

  const recentTickets = [
    { id: "TKT-001", title: "New hire onboarding access", status: "Open", priority: "High", assignee: "Sarah", date: "2025-03-20", department: "IT", responseTime: "1.2h" },
    { id: "TKT-002", title: "Production server down", status: "In Progress", priority: "Critical", assignee: "Mike", date: "2025-03-22", department: "DevOps", responseTime: "0.5h" },
    { id: "TKT-003", title: "Monitor replacement", status: "Resolved", priority: "Medium", assignee: "Lisa", date: "2025-03-25", department: "Hardware", responseTime: "3.2h" },
    { id: "TKT-004", title: "Database optimization", status: "Open", priority: "High", assignee: "Alex", date: "2025-03-26", department: "Database", responseTime: "2.1h" },
    { id: "TKT-005", title: "UI redesign feedback", status: "In Progress", priority: "Low", assignee: "Emma", date: "2025-03-27", department: "Design", responseTime: "4.5h" },
    { id: "TKT-006", title: "VPN connectivity", status: "Resolved", priority: "High", assignee: "John", date: "2025-03-28", department: "Network", responseTime: "1.8h" },
    { id: "TKT-007", title: "License renewal", status: "In Review", priority: "Medium", assignee: "Lisa", date: "2025-03-29", department: "IT", responseTime: "2.3h" },
    { id: "TKT-008", title: "Password reset", status: "Resolved", priority: "Low", assignee: "Mike", date: "2025-03-30", department: "IT", responseTime: "0.3h" },
  ];

  const topPerformers = [
    { name: "Sarah Johnson", resolved: 42, rating: 4.9, avatar: "SJ", color: "#3b82f6" },
    { name: "Mike Chen", resolved: 38, rating: 4.8, avatar: "MC", color: "#10b981" },
    { name: "Lisa Wong", resolved: 35, rating: 4.7, avatar: "LW", color: "#8b5cf6" },
    { name: "Alex Kumar", resolved: 31, rating: 4.6, avatar: "AK", color: "#f59e0b" },
    { name: "Emma Davis", resolved: 28, rating: 4.5, avatar: "ED", color: "#ec489a" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Open": return { bg: "#dbeafe", color: "#2563eb", dot: "#3b82f6" };
      case "In Progress": return { bg: "#fed7aa", color: "#ea580c", dot: "#f97316" };
      case "In Review": return { bg: "#f3e8ff", color: "#9333ea", dot: "#a855f7" };
      case "Resolved": return { bg: "#d1fae5", color: "#059669", dot: "#10b981" };
      default: return { bg: "#f1f5f9", color: "#64748b", dot: "#94a3b8" };
    }
  };

  const getPriorityBadge = (priority) => {
    const p = { Critical: "#dc2626", High: "#ea580c", Medium: "#ca8a04", Low: "#16a34a" };
    return <span style={{ background: `${p[priority]}15`, color: p[priority], padding: "2px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>{priority}</span>;
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { font: { size: 11 } } } }, scales: { y: { beginAtZero: true, grid: { color: '#e2e8f0' } } } };
  const doughnutOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }, cutout: '60%' };
  const pieOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 10 } } } } };
  const radarOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } } };
  const barOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#e2e8f0' } }, x: { grid: { display: false } } } };
  const polarOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 10 } } } } };

  return (
    <div style={{ padding: "24px 40px", background: "#f0f4fa", minHeight: "100vh", overflowY: "auto", width: "100%" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button onClick={() => navigate("/tickethandler")} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 28px", background: "linear-gradient(135deg, #0B3D91, #1a52b8)", border: "none", borderRadius: "40px", color: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}><ArrowLeft size={18} /><span>Back to Main</span></button>
            <div style={{ width: "2px", height: "35px", background: "#e2e8f0" }} />
            <div><div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}><LayoutDashboard size={30} color="#fff" /></div>
              <div><h1 style={{ fontSize: "30px", fontWeight: "700", color: "#0a2540", margin: 0 }}>{greeting}, {handlerName}!</h1><p style={{ color: "#64748b", marginTop: "6px", fontSize: "14px" }}>{formatDate()} • Ticket Handler Dashboard</p></div>
            </div></div>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "6px", background: "#fff", padding: "4px", borderRadius: "40px", border: "1px solid #e2e8f0" }}>
              {["day", "week", "month", "year"].map(period => (<button key={period} onClick={() => setSelectedPeriod(period)} style={{ padding: "6px 18px", borderRadius: "30px", border: "none", background: selectedPeriod === period ? "linear-gradient(135deg, #0B3D91, #1a52b8)" : "transparent", color: selectedPeriod === period ? "#fff" : "#64748b", cursor: "pointer", fontSize: "13px", fontWeight: "500" }}>{period.charAt(0).toUpperCase() + period.slice(1)}</button>))}
            </div>
            <div style={{ width: "44px", height: "44px", background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px solid #e2e8f0" }}><Bell size={20} color="#64748b" /></div>
          </div>
        </div>

        <div style={{ background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "20px", padding: "24px 32px", marginTop: "20px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: "-20px", top: "-20px", opacity: 0.1 }}><Activity size={140} /></div>
          <div><h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>🎫 Welcome to Your Handler Dashboard</h2><p>{stats.myResolved} resolved by you this month • {stats.myTickets} assigned tickets • {stats.slaCompliance}% SLA</p></div>
        </div>
      </div>

      {/* 8 Statistics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {[
          { icon: <Ticket size={20} />, label: "Total", value: stats.total, change: "+8%", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
          { icon: <Activity size={20} />, label: "Open", value: stats.open, change: "+3%", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
          { icon: <ClockIcon size={20} />, label: "In Progress", value: stats.inProgress, change: "-2%", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
          { icon: <CheckCircle size={20} />, label: "Resolved", value: stats.resolved, change: "+12%", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
          { icon: <Target size={20} />, label: "My Tickets", value: stats.myTickets, change: "+2", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
          { icon: <CheckCircle size={20} />, label: "My Resolved", value: stats.myResolved, change: "+3", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
          { icon: <Zap size={20} />, label: "Critical", value: stats.urgent, change: "-1%", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
          { icon: <TrendingUp size={20} />, label: "Growth", value: stats.monthlyGrowth, change: "+18%", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
        ].map((stat, idx) => (
          <div key={idx} style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3", transition: "all 0.3s ease" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ width: "36px", height: "36px", background: stat.bg, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>{stat.icon}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "3px", background: stat.change.includes("+") ? "#d1fae5" : "#fee2e2", padding: "2px 6px", borderRadius: "20px" }}>
                {stat.change.includes("+") ? <ArrowUp size={10} color="#10b981" /> : <ArrowDown size={10} color="#ef4444" />}
                <span style={{ fontSize: "9px", fontWeight: "600", color: stat.change.includes("+") ? "#059669" : "#dc2626" }}>{stat.change}</span>
              </div>
            </div>
            <div style={{ fontSize: "26px", fontWeight: "800", color: "#0a2540", marginTop: "10px" }}>{stat.value}</div>
            <div style={{ fontSize: "10px", color: "#64748b" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Row 1: 3 Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "32px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e9eef3" }}><h3>📈 Weekly Trends</h3><div style={{ height: "280px" }}><Line data={weeklyData} options={chartOptions} /></div></div>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e9eef3" }}><h3>🎯 Priority Distribution</h3><div style={{ height: "280px" }}><Doughnut data={priorityData} options={doughnutOptions} /></div></div>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e9eef3" }}><h3>📊 Status Distribution</h3><div style={{ height: "280px" }}><Pie data={statusData} options={pieOptions} /></div></div>
      </div>

      {/* Row 2: 2 Large Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e9eef3" }}><h3>📅 Monthly Performance (2025)</h3><div style={{ height: "320px" }}><Line data={monthlyData} options={chartOptions} /></div></div>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e9eef3" }}><h3>🔧 Problem Types</h3><div style={{ height: "320px" }}><Bar data={categoryData} options={barOptions} /></div></div>
      </div>

      {/* Row 3: 2 Charts + Polar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "32px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e9eef3" }}><h3>⚡ Department Performance</h3><div style={{ height: "300px" }}><Radar data={departmentRadarData} options={radarOptions} /></div></div>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e9eef3" }}><h3>🎯 SLA Compliance</h3><div style={{ height: "300px" }}><Bar data={slaData} options={barOptions} /></div><div style={{ marginTop: "12px", padding: "10px", background: "#f0fdf4", borderRadius: "10px", textAlign: "center" }}>Overall SLA: {stats.slaCompliance}% ↑2%</div></div>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e9eef3" }}><h3>🌀 Priority Impact</h3><div style={{ height: "300px" }}><PolarArea data={polarData} options={polarOptions} /></div></div>
      </div>

      {/* Row 4: Resolution Trends + Satisfaction */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e9eef3" }}><h3>⏱️ Resolution Time Trend</h3><div style={{ height: "280px" }}><Line data={resolutionTrendData} options={chartOptions} /></div></div>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e9eef3" }}><h3>😊 Customer Satisfaction</h3><div style={{ height: "280px" }}><Line data={satisfactionTrendData} options={chartOptions} /></div></div>
      </div>

      {/* Key Metrics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", textAlign: "center" }}><div style={{ fontSize: "36px", fontWeight: "800", color: "#3b82f6" }}>{stats.avgResponseTime}</div><div>Avg Response</div><div style={{ fontSize: "11px", color: "#10b981" }}>↓ 0.3h</div></div>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", textAlign: "center" }}><div style={{ fontSize: "36px", fontWeight: "800", color: "#10b981" }}>{stats.avgResolutionTime}</div><div>Avg Resolution</div><div style={{ fontSize: "11px", color: "#10b981" }}>↓ 1.2h</div></div>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", textAlign: "center" }}><div style={{ fontSize: "36px", fontWeight: "800", color: "#ef4444" }}>{stats.reopened}</div><div>Reopened</div><div style={{ fontSize: "11px", color: "#ef4444" }}>↑ 2</div></div>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", textAlign: "center" }}><div style={{ fontSize: "36px", fontWeight: "800", color: "#f59e0b" }}>{stats.escalated}</div><div>Escalated</div><div style={{ fontSize: "11px", color: "#10b981" }}>↓ 1</div></div>
      </div>

      {/* Recent Tickets - Full Width */}
      <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e9eef3", overflow: "hidden", marginBottom: "32px" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><h3>🕒 Recent Tickets (Last 8)</h3><p>Latest activity in your queue</p></div>
          <button onClick={() => navigate("/tickethandler/tickets")} style={{ padding: "8px 20px", background: "#f1f5f9", border: "none", borderRadius: "30px", cursor: "pointer" }}>View All <ChevronRight size={16} /></button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#f8fafc" }}><th style={{ padding: "14px" }}>ID</th><th>Title</th><th>Status</th><th>Priority</th><th>Assignee</th><th>Department</th><th>Response</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>{recentTickets.map((t, i) => { const sc = getStatusColor(t.status); return (<tr key={t.id} style={{ borderBottom: "1px solid #f1f5f9" }}><td style={{ padding: "14px", fontFamily: "monospace", color: "#3b82f6" }}>{t.id}</td><td>{t.title}</td><td><div style={{ display: "flex", alignItems: "center", gap: "6px" }}><div style={{ width: "8px", height: "8px", background: sc.dot, borderRadius: "50%" }} /><span style={{ background: sc.bg, color: sc.color, padding: "2px 10px", borderRadius: "20px", fontSize: "11px" }}>{t.status}</span></div></td><td>{getPriorityBadge(t.priority)}</td><td><div style={{ display: "flex", alignItems: "center", gap: "6px" }}><div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg, #e0e7ff, #c7d2fe)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>{t.assignee.slice(0,2)}</div>{t.assignee}</div></td><td style={{ color: "#64748b" }}>{t.department}</td><td style={{ fontWeight: "500", color: "#10b981" }}>{t.responseTime}</td><td style={{ color: "#64748b" }}>{t.date}</td><td><button onClick={() => navigate("/tickethandler/tickets")} style={{ padding: "6px 14px", background: "#eef2ff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "12px", color: "#0B3D91" }}>View</button></td></tr>) })}</tbody>
          </table>
        </div>
      </div>

      {/* Top Performers & Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "24px", border: "1px solid #e9eef3" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}><div style={{ width: "44px", height: "44px", background: "#fef3c7", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>🏆</div><div><h3>Top Performers</h3><p>Most resolved tickets this month</p></div></div>
          <div>{topPerformers.map((p, i) => (<div key={p.name} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "8px", borderRadius: "12px" }}><div style={{ width: "48px", height: "48px", background: `linear-gradient(135deg, ${p.color}30, ${p.color}15)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", color: p.color }}>{p.avatar}</div><div style={{ flex: 1 }}><div style={{ fontWeight: "600" }}>{p.name}</div><div style={{ fontSize: "11px", color: "#64748b" }}>{p.resolved} resolved • ⭐ {p.rating}</div></div><div style={{ fontSize: "22px", fontWeight: "700", color: p.color }}>{p.resolved}</div></div>))}</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "20px", padding: "28px", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}><Zap size={28} /><h3 style={{ fontSize: "20px", fontWeight: "700" }}>Quick Actions</h3></div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
            <button onClick={() => navigate("/tickethandler")} style={{ padding: "12px 22px", background: "rgba(255,255,255,0.2)", borderRadius: "40px", cursor: "pointer", color: "#fff" }}>+ New Ticket</button>
            <button onClick={() => navigate("/tickethandler/tickets")} style={{ padding: "12px 22px", background: "rgba(255,255,255,0.2)", borderRadius: "40px", cursor: "pointer", color: "#fff" }}>View All</button>
            <button onClick={() => navigate("/tickethandler/projects")} style={{ padding: "12px 22px", background: "rgba(255,255,255,0.2)", borderRadius: "40px", cursor: "pointer", color: "#fff" }}>Projects</button>
          </div>
          <div style={{ padding: "18px", background: "rgba(255,255,255,0.12)", borderRadius: "18px" }}><ThumbsUp size={18} /> <span style={{ fontWeight: "600" }}>Pro Tip</span><p style={{ fontSize: "12px", marginTop: "8px" }}>Use ticket templates to save time on common requests.</p></div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRow { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}
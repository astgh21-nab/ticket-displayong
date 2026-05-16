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

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Tickets from TicketManager component
  const ticketsData = [
    { id: "TKT-001", type: "User Access", title: "New hire onboarding access", status: "Open", priority: "High", date: "2025-03-20", assignee: "Sarah Chen", department: "IT", responseTime: "1.2h" },
    { id: "TKT-002", type: "Incident", title: "Production server down", status: "In Progress", priority: "Critical", date: "2025-03-22", assignee: "Mike Johnson", department: "DevOps", responseTime: "0.5h" },
    { id: "TKT-003", type: "Hardware", title: "Monitor replacement for John", status: "Done", priority: "Medium", date: "2025-03-25", assignee: "Lisa Wong", department: "Hardware", responseTime: "3.2h" },
    { id: "TKT-004", type: "Expense", title: "Team dinner reimbursement", status: "Open", priority: "Medium", date: "2025-03-27", assignee: "John Davis", department: "Billing", responseTime: "2.1h" },
    { id: "TKT-005", type: "User Access", title: "Access for AD EXTERNAL groups", status: "Open", priority: "High", date: "2025-03-20", assignee: "Sarah Chen", department: "IT", responseTime: "1.8h" },
    { id: "TKT-006", type: "Incident", title: "Internet connection problem", status: "In Progress", priority: "High", date: "2025-03-22", assignee: "Mike Johnson", department: "Network", responseTime: "0.8h" },
    { id: "TKT-007", type: "Hardware", title: "New monitor request", status: "Done", priority: "Low", date: "2025-03-25", assignee: "Lisa Wong", department: "Hardware", responseTime: "4.5h" },
    { id: "TKT-008", type: "Expense", title: "Team dinner reimbursement", status: "Open", priority: "Medium", date: "2025-03-27", assignee: "John Davis", department: "Billing", responseTime: "2.3h" },
    { id: "TKT-009", type: "Hardware", title: "Please give me a new notebook", status: "Done", priority: "High", date: "2025-03-25", assignee: "Lisa Wong", department: "Hardware", responseTime: "3.5h" },
    { id: "TKT-010", type: "Expense", title: "Team dinner reimbursement", status: "Open", priority: "Low", date: "2025-03-27", assignee: "John Davis", department: "Billing", responseTime: "1.5h" },
  ];

  // Calculate statistics based on actual tickets
  const stats = {
    total: ticketsData.length,
    open: ticketsData.filter(t => t.status === "Open").length,
    inProgress: ticketsData.filter(t => t.status === "In Progress").length,
    inReview: ticketsData.filter(t => t.status === "In Review").length,
    resolved: ticketsData.filter(t => t.status === "Done").length,
    closed: ticketsData.filter(t => t.status === "Closed").length,
    urgent: ticketsData.filter(t => t.priority === "Critical").length,
    high: ticketsData.filter(t => t.priority === "High").length,
    medium: ticketsData.filter(t => t.priority === "Medium").length,
    low: ticketsData.filter(t => t.priority === "Low").length,
    avgResponseTime: "2.1h",
    avgResolutionTime: "18.5h",
    satisfaction: "94%",
    slaCompliance: "97",
    reopened: 2,
    escalated: 1,
    monthlyGrowth: "+18%",
    weeklyActive: 156,
  };

  // Calculate type distribution
  const typeStats = {
    userAccess: ticketsData.filter(t => t.type === "User Access").length,
    incident: ticketsData.filter(t => t.type === "Incident").length,
    hardware: ticketsData.filter(t => t.type === "Hardware").length,
    expense: ticketsData.filter(t => t.type === "Expense").length,
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Weekly Data - based on ticket creation pattern
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Created',
        data: [2, 3, 2, 1, 2, 0, 0],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Resolved',
        data: [0, 0, 1, 2, 0, 0, 0],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'In Progress',
        data: [0, 1, 1, 0, 0, 0, 0],
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
    labels: ['Open', 'In Progress', 'Done'],
    datasets: [{
      data: [stats.open, stats.inProgress, stats.resolved],
      backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  // Category Distribution by Type
  const categoryData = {
    labels: ['User Access', 'Incident', 'Hardware', 'Expense'],
    datasets: [{
      data: [typeStats.userAccess, typeStats.incident, typeStats.hardware, typeStats.expense],
      backgroundColor: ['#3b82f6', '#ef4444', '#8b5cf6', '#10b981'],
      borderRadius: 6,
    }],
  };

  // Monthly Data (simulated based on ticket dates)
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Created',
        data: [0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: 'Resolved',
        data: [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    labels: ['IT', 'DevOps', 'Hardware', 'Network', 'Billing'],
    datasets: [{
      label: 'Performance %',
      data: [95, 88, 92, 85, 90],
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
    labels: ['IT', 'DevOps', 'Hardware', 'Network', 'Billing'],
    datasets: [{
      label: 'SLA %',
      data: [96, 92, 94, 88, 98],
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
        label: 'Avg Resolution (hours)',
        data: [24, 20, 16, 14],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
      {
        label: 'Avg Response (hours)',
        data: [2.5, 2.2, 2.0, 1.8],
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
      data: [88, 90, 92, 93, 94, 96],
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 5,
      pointBackgroundColor: '#8b5cf6',
    }],
  };

  const recentTickets = ticketsData;

  const topPerformers = [
    { name: "Sarah Chen", resolved: 2, rating: 4.9, avatar: "SC", color: "#3b82f6", tickets: 2 },
    { name: "Mike Johnson", resolved: 2, rating: 4.8, avatar: "MJ", color: "#10b981", tickets: 2 },
    { name: "Lisa Wong", resolved: 3, rating: 4.9, avatar: "LW", color: "#8b5cf6", tickets: 3 },
    { name: "John Davis", resolved: 4, rating: 4.7, avatar: "JD", color: "#f59e0b", tickets: 4 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Open": return { bg: "#dbeafe", color: "#2563eb", dot: "#3b82f6" };
      case "In Progress": return { bg: "#fed7aa", color: "#ea580c", dot: "#f97316" };
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

  return (
    <div style={{ padding: "16px 24px", background: "#f0f4fa", minHeight: "100vh", overflowY: "auto", width: "100%" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => navigate("/ticketmanager/2")} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 20px", background: "linear-gradient(135deg, #0B3D91, #1a52b8)", border: "none", borderRadius: "32px", color: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}><ArrowLeft size={16} /><span>Back</span></button>
            <div style={{ width: "1px", height: "30px", background: "#e2e8f0" }} />
            <div><div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "44px", height: "44px", background: "linear-gradient(135deg, #0B3D91, #1a52b8)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}><LayoutDashboard size={24} color="#fff" /></div>
              <div><h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0a2540", margin: 0 }}>{greeting}, Astghik!</h1><p style={{ color: "#64748b", marginTop: "4px", fontSize: "12px" }}>{formatDate()} • {stats.total} tickets</p></div>
            </div></div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "4px", background: "#fff", padding: "3px", borderRadius: "32px", border: "1px solid #e2e8f0" }}>
              {["day", "week", "month", "year"].map(period => (<button key={period} onClick={() => setSelectedPeriod(period)} style={{ padding: "4px 14px", borderRadius: "24px", border: "none", background: selectedPeriod === period ? "linear-gradient(135deg, #0B3D91, #1a52b8)" : "transparent", color: selectedPeriod === period ? "#fff" : "#64748b", cursor: "pointer", fontSize: "11px", fontWeight: "500" }}>{period.charAt(0).toUpperCase() + period.slice(1)}</button>))}
            </div>
            <div style={{ width: "36px", height: "36px", background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px solid #e2e8f0" }}><Bell size={18} color="#64748b" /></div>
          </div>
        </div>

        <div style={{ background: "linear-gradient(135deg, #0B3D91, #1a52b8)", borderRadius: "16px", padding: "16px 24px", marginTop: "12px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: "-20px", top: "-20px", opacity: 0.1 }}><Activity size={100} /></div>
          <div><h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "6px" }}>🚀 Welcome to Your Support Dashboard</h2><p style={{ fontSize: "12px" }}>{stats.resolved} resolved this month • {stats.slaCompliance}% SLA • {stats.monthlyGrowth} growth</p></div>
        </div>
      </div>

      {/* 8 Statistics Cards - Compact */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "10px", marginBottom: "20px" }}>
        {[
          { icon: <Ticket size={16} />, label: "Total", value: stats.total, change: "+0%", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
          { icon: <Activity size={16} />, label: "Open", value: stats.open, change: "+0%", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
          { icon: <ClockIcon size={16} />, label: "Progress", value: stats.inProgress, change: "0%", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
          { icon: <CheckCircle size={16} />, label: "Resolved", value: stats.resolved, change: "+0%", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
          { icon: <Target size={16} />, label: "SLA", value: stats.slaCompliance + "%", change: "+0%", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
          { icon: <Heart size={16} />, label: "Satis.", value: stats.satisfaction, change: "+0%", color: "#ec489a", bg: "rgba(236,72,153,0.1)" },
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
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>🔧 Ticket Types</h3><div style={{ height: "220px" }}><Bar data={categoryData} options={barOptions} /></div></div>
      </div>

      {/* Row 3: 2 Charts + Polar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>⚡ Department</h3><div style={{ height: "220px" }}><Radar data={departmentRadarData} options={radarOptions} /></div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", border: "1px solid #e9eef3" }}><h3 style={{ fontSize: "13px", marginBottom: "10px" }}>🎯 SLA</h3><div style={{ height: "220px" }}><Bar data={slaData} options={barOptions} /></div><div style={{ marginTop: "8px", padding: "6px", background: "#f0fdf4", borderRadius: "8px", textAlign: "center", fontSize: "11px" }}>SLA: {stats.slaCompliance}%</div></div>
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
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", textAlign: "center" }}><div style={{ fontSize: "28px", fontWeight: "800", color: "#10b981" }}>{stats.avgResolutionTime}</div><div style={{ fontSize: "11px" }}>Avg Resolution</div><div style={{ fontSize: "9px", color: "#10b981" }}>↓ 1.2h</div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", textAlign: "center" }}><div style={{ fontSize: "28px", fontWeight: "800", color: "#ef4444" }}>{stats.reopened}</div><div style={{ fontSize: "11px" }}>Reopened</div><div style={{ fontSize: "9px", color: "#ef4444" }}>↑ 0</div></div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "14px", textAlign: "center" }}><div style={{ fontSize: "28px", fontWeight: "800", color: "#f59e0b" }}>{stats.escalated}</div><div style={{ fontSize: "11px" }}>Escalated</div><div style={{ fontSize: "9px", color: "#10b981" }}>↓ 0</div></div>
      </div>

      {/* Recent Tickets Table - Compact */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e9eef3", overflow: "hidden", marginBottom: "20px" }}>
        <div style={{ padding: "12px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><h3 style={{ fontSize: "14px", margin: 0 }}>🕒 Recent Tickets</h3><p style={{ fontSize: "11px", margin: "2px 0 0", color: "#64748b" }}>{recentTickets.length} tickets</p></div>
          <button onClick={() => navigate("/tickets")} style={{ padding: "6px 16px", background: "#f1f5f9", border: "none", borderRadius: "24px", cursor: "pointer", fontSize: "11px" }}>View All <ChevronRight size={12} /></button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead><tr style={{ background: "#f8fafc" }}><th style={{ padding: "10px 12px", fontSize: "11px" }}>ID</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Type</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Title</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Status</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Priority</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Assignee</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Date</th><th style={{ padding: "10px 12px", fontSize: "11px" }}>Action</th></tr></thead>
            <tbody>{recentTickets.map((t, i) => { const sc = getStatusColor(t.status); return (<tr key={t.id} style={{ borderBottom: "1px solid #f1f5f9" }}><td style={{ padding: "10px 12px", fontFamily: "monospace", color: "#3b82f6" }}>{t.id}</td><td style={{ padding: "10px 12px" }}><span style={{ background: t.type === "User Access" ? "#dbeafe" : t.type === "Incident" ? "#fee2e2" : t.type === "Hardware" ? "#f3e8ff" : "#d1fae5", padding: "2px 8px", borderRadius: "16px", fontSize: "10px" }}>{t.type}</span></td><td style={{ padding: "10px 12px", fontWeight: "500" }}>{t.title.substring(0, 30)}...</td><td style={{ padding: "10px 12px" }}><div style={{ display: "flex", alignItems: "center", gap: "4px" }}><div style={{ width: "6px", height: "6px", background: sc.dot, borderRadius: "50%" }} /><span style={{ background: sc.bg, color: sc.color, padding: "2px 8px", borderRadius: "16px", fontSize: "10px" }}>{t.status}</span></div></td><td style={{ padding: "10px 12px" }}>{getPriorityBadge(t.priority)}</td><td style={{ padding: "10px 12px" }}><div style={{ display: "flex", alignItems: "center", gap: "4px" }}><div style={{ width: "24px", height: "24px", background: "linear-gradient(135deg, #e0e7ff, #c7d2fe)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>{t.assignee.slice(0,2)}</div>{t.assignee.split(' ')[0]}</div></td><td style={{ padding: "10px 12px", color: "#64748b" }}>{t.date}</td><td style={{ padding: "10px 12px" }}><button onClick={() => navigate(`/ticket/${t.id}`)} style={{ padding: "4px 10px", background: "#eef2ff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "10px", color: "#0B3D91" }}>View</button></td></tr>)})}</tbody>
          </table>
        </div>
      </div>

      {/* Top Performers & Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "16px", border: "1px solid #e9eef3" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}><div style={{ width: "36px", height: "36px", background: "#fef3c7", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🏆</div><div><h3 style={{ fontSize: "14px", margin: 0 }}>Top Performers</h3><p style={{ fontSize: "10px", color: "#64748b", margin: "2px 0 0" }}>Most resolved this month</p></div></div>
          <div>{topPerformers.map((p, i) => (<div key={p.name} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px", borderRadius: "10px" }}><div style={{ width: "36px", height: "36px", background: `linear-gradient(135deg, ${p.color}30, ${p.color}15)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: p.color }}>{p.avatar}</div><div style={{ flex: 1 }}><div style={{ fontWeight: "600", fontSize: "12px" }}>{p.name}</div><div style={{ fontSize: "10px", color: "#64748b" }}>{p.resolved} resolved • ⭐ {p.rating}</div></div><div style={{ fontSize: "18px", fontWeight: "700", color: p.color }}>{p.tickets}</div></div>))}</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, #0B3D91, #1a52b8)", borderRadius: "16px", padding: "20px", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}><Zap size={22} /><h3 style={{ fontSize: "16px", fontWeight: "700", margin: 0 }}>Quick Actions</h3></div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
            <button onClick={() => navigate("/create-ticket")} style={{ padding: "8px 18px", background: "rgba(255,255,255,0.2)", borderRadius: "32px", cursor: "pointer", color: "#fff", fontSize: "12px", border: "none" }}>+ New Ticket</button>
            <button onClick={() => navigate("/tickets")} style={{ padding: "8px 18px", background: "rgba(255,255,255,0.2)", borderRadius: "32px", cursor: "pointer", color: "#fff", fontSize: "12px", border: "none" }}>View All</button>
            <button onClick={() => navigate("/reports")} style={{ padding: "8px 18px", background: "rgba(255,255,255,0.2)", borderRadius: "32px", cursor: "pointer", color: "#fff", fontSize: "12px", border: "none" }}>Reports</button>
          </div>
          <div style={{ padding: "12px", background: "rgba(255,255,255,0.12)", borderRadius: "12px" }}><ThumbsUp size={14} /> <span style={{ fontWeight: "600", fontSize: "12px" }}>Pro Tip</span><p style={{ fontSize: "10px", marginTop: "4px" }}>Use ticket templates to save time on common requests.</p></div>
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
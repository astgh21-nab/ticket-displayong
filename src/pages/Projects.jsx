import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, Filter, Calendar, Users, Clock, CheckCircle, AlertCircle, 
  TrendingUp, ChevronRight, Plus, X, Ticket, User, 
  ArrowLeft, Sparkles, Briefcase, LayoutGrid,
  Zap, Shield, Database, Code, Smartphone, Eye
} from "lucide-react";

export default function Projects() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [spaceFilter, setSpaceFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [animation, setAnimation] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // All tickets from TicketManager
  const allTicketsList = [
    { id: "TKT-001", type: "User Access", summary: "New hire onboarding access", status: "Open", date: "2025-03-20", user: "Astghik Naboyan", priority: "High", description: "Need to setup access for new developer" },
    { id: "TKT-002", type: "Incident", summary: "Production server down", status: "In Progress", date: "2025-03-22", user: "Mike Chen", priority: "Critical", description: "Production server is experiencing downtime" },
    { id: "TKT-003", type: "Hardware", summary: "Monitor replacement for John", status: "Done", date: "2025-03-25", user: "John Doe", priority: "Medium", description: "Monitor replacement request" },
    { id: "TKT-004", type: "Expense", summary: "Team dinner reimbursement", status: "Open", date: "2025-03-27", user: "Sarah Lee", priority: "Medium", description: "Team dinner expense reimbursement" },
    { id: "TKT-005", type: "User Access", summary: "Access for AD EXTERNAL groups", status: "Open", date: "2025-03-20", user: "Astghik Naboyan", priority: "High", description: "External AD group access request" },
    { id: "TKT-006", type: "Incident", summary: "Internet connection problem", status: "In Progress", date: "2025-03-22", user: "Mike Chen", priority: "High", description: "Internet connectivity issues" },
    { id: "TKT-007", type: "Hardware", summary: "New monitor request", status: "Done", date: "2025-03-25", user: "Astghik Naboyan", priority: "Low", description: "Request for new monitor" },
    { id: "TKT-008", type: "Expense", summary: "Team dinner reimbursement", status: "Open", date: "2025-03-27", user: "John Doe", priority: "Medium", description: "Dinner expense claim" },
    { id: "TKT-009", type: "Hardware", summary: "Please give me a new notebook", status: "Done", date: "2025-03-25", user: "Sarah Lee", priority: "High", description: "New laptop request" },
    { id: "TKT-010", type: "Expense", summary: "Team dinner reimbursement", status: "Open", date: "2025-03-27", user: "Mike Chen", priority: "Low", description: "Team dinner expense" },
  ];

  // Helper function to get user avatar
  const getUserAvatar = (userName) => {
    const nameParts = userName.split(' ');
    if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return userName.slice(0, 2).toUpperCase();
  };

  // Spaces data with tickets from the list above
  const [spaces, setSpaces] = useState([
    { 
      id: 1,
      name: "User & Access Management",
      icon: "👥",
      description: "User access requests, role changes, and account management",
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
      bg: "rgba(59, 130, 246, 0.08)",
      stats: { projects: 2, tickets: 0, completed: 0 },
      projects: [
        { 
          id: 101,
          icon: "👤", 
          name: "User Access Requests", 
          progress: 50, 
          status: "In Progress",
          priority: "High",
          deadline: "2025-04-20",
          team: ["Sarah", "Mike"],
          tickets: allTicketsList.filter(t => t.type === "User Access").map(t => ({
            id: t.id,
            title: t.summary,
            status: t.status,
            priority: t.priority,
            date: t.date,
            user: t.user,
            userAvatar: getUserAvatar(t.user),
            description: t.description
          }))
        },
        { 
          id: 102,
          icon: "🔄", 
          name: "Role Management", 
          progress: 30, 
          status: "Planning",
          priority: "Medium",
          deadline: "2025-05-10",
          team: ["Alex", "Emma"],
          tickets: []
        },
      ]
    },
    { 
      id: 2,
      name: "Financial & Payments",
      icon: "💰",
      description: "Expense reimbursements, payment inquiries, and financial requests",
      color: "#10b981",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
      bg: "rgba(16, 185, 129, 0.08)",
      stats: { projects: 2, tickets: 0, completed: 0 },
      projects: [
        { 
          id: 201,
          icon: "💳", 
          name: "Expense Management", 
          progress: 45, 
          status: "In Progress",
          priority: "High",
          deadline: "2025-04-25",
          team: ["Lisa", "John"],
          tickets: allTicketsList.filter(t => t.type === "Expense").map(t => ({
            id: t.id,
            title: t.summary,
            status: t.status,
            priority: t.priority,
            date: t.date,
            user: t.user,
            userAvatar: getUserAvatar(t.user),
            description: t.description
          }))
        },
        { 
          id: 202,
          icon: "💰", 
          name: "Payment Inquiries", 
          progress: 20, 
          status: "Planning",
          priority: "Medium",
          deadline: "2025-05-15",
          team: ["Emma", "Mike"],
          tickets: []
        },
      ]
    },
    { 
      id: 3,
      name: "Hardware & Equipment",
      icon: "💻",
      description: "Laptop, monitor, devices, and office equipment requests",
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      bg: "rgba(139, 92, 246, 0.08)",
      stats: { projects: 2, tickets: 0, completed: 0 },
      projects: [
        { 
          id: 301,
          icon: "💻", 
          name: "Hardware Requests", 
          progress: 70, 
          status: "In Progress",
          priority: "High",
          deadline: "2025-04-18",
          team: ["Mike", "Lisa"],
          tickets: allTicketsList.filter(t => t.type === "Hardware").map(t => ({
            id: t.id,
            title: t.summary,
            status: t.status,
            priority: t.priority,
            date: t.date,
            user: t.user,
            userAvatar: getUserAvatar(t.user),
            description: t.description
          }))
        },
        { 
          id: 302,
          icon: "🏢", 
          name: "Facilities & Office", 
          progress: 35, 
          status: "Planning",
          priority: "Low",
          deadline: "2025-05-30",
          team: ["Alex", "Emma"],
          tickets: []
        },
      ]
    },
    { 
      id: 4,
      name: "Software & Licensing",
      icon: "📦",
      description: "Software license requests and compliance management",
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
      bg: "rgba(245, 158, 11, 0.08)",
      stats: { projects: 2, tickets: 0, completed: 0 },
      projects: [
        { 
          id: 401,
          icon: "📦", 
          name: "License Management", 
          progress: 25, 
          status: "Planning",
          priority: "High",
          deadline: "2025-04-22",
          team: ["John", "Lisa"],
          tickets: []
        },
        { 
          id: 402,
          icon: "📋", 
          name: "Compliance", 
          progress: 15, 
          status: "Planning",
          priority: "Medium",
          deadline: "2025-06-01",
          team: ["Emma", "Mike"],
          tickets: []
        },
      ]
    },
    { 
      id: 5,
      name: "Support & Incidents",
      icon: "⚡",
      description: "Client complaints, technical incidents, and support tickets",
      color: "#ef4444",
      gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
      bg: "rgba(239, 68, 68, 0.08)",
      stats: { projects: 2, tickets: 0, completed: 0 },
      projects: [
        { 
          id: 501,
          icon: "📣", 
          name: "Client Complaints", 
          progress: 40, 
          status: "In Progress",
          priority: "Critical",
          deadline: "2025-04-12",
          team: ["Mike", "Sarah"],
          tickets: []
        },
        { 
          id: 502,
          icon: "⚡", 
          name: "Technical Incidents", 
          progress: 55, 
          status: "In Progress",
          priority: "Critical",
          deadline: "2025-04-15",
          team: ["Alex", "John"],
          tickets: allTicketsList.filter(t => t.type === "Incident").map(t => ({
            id: t.id,
            title: t.summary,
            status: t.status,
            priority: t.priority,
            date: t.date,
            user: t.user,
            userAvatar: getUserAvatar(t.user),
            description: t.description
          }))
        },
      ]
    },
  ]);

  const [allTickets, setAllTickets] = useState([]);

  // Update space stats based on tickets
  useEffect(() => {
    const updatedSpaces = spaces.map(space => {
      let totalTickets = 0;
      let completedTickets = 0;
      
      space.projects.forEach(project => {
        totalTickets += project.tickets.length;
        completedTickets += project.tickets.filter(t => t.status === "Done" || t.status === "Resolved").length;
      });
      
      return {
        ...space,
        stats: {
          projects: space.projects.length,
          tickets: totalTickets,
          completed: completedTickets
        }
      };
    });
    
    setSpaces(updatedSpaces);
  }, []);

  useEffect(() => {
    setAnimation("fade-in");
    const timer = setTimeout(() => setAnimation(""), 300);
    return () => clearTimeout(timer);
  }, [spaces]);

  useEffect(() => {
    const tickets = [];
    spaces.forEach(space => {
      space.projects.forEach(project => {
        project.tickets.forEach(ticket => {
          tickets.push({
            ...ticket,
            spaceName: space.name,
            spaceColor: space.color,
            projectName: project.name,
            projectIcon: project.icon,
            projectId: project.id
          });
        });
      });
    });
    setAllTickets(tickets);
  }, [spaces]);

  const filteredSpaces = spaces.filter(space => {
    if (spaceFilter !== "All" && space.name !== spaceFilter) return false;
    const matchSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        space.projects.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSearch;
  });

  const stats = {
    totalSpaces: spaces.length,
    totalProjects: spaces.reduce((sum, space) => sum + space.projects.length, 0),
    totalTickets: allTickets.length,
    openTickets: allTickets.filter(t => t.status === "Open").length,
    inProgressTickets: allTickets.filter(t => t.status === "In Progress").length,
    resolvedTickets: allTickets.filter(t => t.status === "Done" || t.status === "Resolved").length,
    criticalTickets: allTickets.filter(t => t.priority === "Critical").length,
    completionRate: allTickets.length > 0 ? Math.round((allTickets.filter(t => t.status === "Done" || t.status === "Resolved").length / allTickets.length) * 100) : 0,
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return "#ef4444";
    if (progress < 70) return "#f59e0b";
    return "#10b981";
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "In Progress": return { bg: "#eff6ff", color: "#2563eb", dot: "#3b82f6", icon: "⚡", label: "In Progress" };
      case "Review": return { bg: "#fef3c7", color: "#d97706", dot: "#f59e0b", icon: "👀", label: "Review" };
      case "Planning": return { bg: "#f3e8ff", color: "#9333ea", dot: "#a855f7", icon: "📋", label: "Planning" };
      default: return { bg: "#d1fae5", color: "#059669", dot: "#10b981", icon: "✅", label: "Completed" };
    }
  };

  const getTicketStatusColor = (status) => {
    switch(status) {
      case "Open": return { bg: "#dbeafe", color: "#2563eb", dot: "#3b82f6" };
      case "In Progress": return { bg: "#fed7aa", color: "#ea580c", dot: "#f97316" };
      case "Done":
      case "Resolved": return { bg: "#d1fae5", color: "#059669", dot: "#10b981" };
      default: return { bg: "#f1f5f9", color: "#64748b", dot: "#94a3b8" };
    }
  };

  const getPriorityBadge = (priority) => {
    const priorities = {
      Critical: { bg: "#fef2f2", color: "#dc2626", icon: "🔴" },
      High: { bg: "#fff7ed", color: "#ea580c", icon: "🟠" },
      Medium: { bg: "#fefce8", color: "#ca8a04", icon: "🟡" },
      Low: { bg: "#f0fdf4", color: "#16a34a", icon: "🟢" }
    };
    const p = priorities[priority] || priorities.Medium;
    return (
      <span style={{ background: p.bg, color: p.color, padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px" }}>
        <span>{p.icon}</span> {priority}
      </span>
    );
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { text: "Overdue", color: "#ef4444", icon: "⚠️" };
    if (diffDays === 0) return { text: "Due Today", color: "#f59e0b", icon: "📅" };
    if (diffDays <= 3) return { text: `${diffDays} days left`, color: "#f59e0b", icon: "⏰" };
    return { text: `${diffDays} days left`, color: "#10b981", icon: "✅" };
  };

  const handleProjectClick = (space, project) => {
    setSelectedProject({ ...project, spaceName: space.name, spaceIcon: space.icon, spaceColor: space.color });
    setShowTicketModal(true);
  };

  const spaceOptions = ["All", ...spaces.map(s => s.name)];

  return (
    <div style={{
      background: "linear-gradient(135deg, #f5f7fc 0%, #eef2f8 100%)",
      minHeight: "100vh",
      padding: "28px 36px",
      position: "relative",
      overflowX: "hidden"
    }}>
      
      <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(59,130,246,0.08), transparent)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-150px", left: "-150px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(139,92,246,0.06), transparent)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ marginBottom: "32px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => navigate("/ticketmanager/2")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                background: "linear-gradient(135deg, #0B3D91, #1a52b8)",
                border: "none",
                borderRadius: "40px",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(11,61,145,0.25)"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(11,61,145,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(11,61,145,0.25)"; }}
            >
              <ArrowLeft size={18} />
              <span>Back to Dashboard</span>
            </button>
            
            <div style={{ width: "4px", height: "30px", background: "linear-gradient(180deg, #0B3D91, #1a52b8)", borderRadius: "2px" }} />
            
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "52px",
                  height: "52px",
                  background: "linear-gradient(135deg, #0B3D91, #1a52b8)",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px rgba(11,61,145,0.2)"
                }}>
                  <Briefcase size={28} color="#fff" />
                </div>
                <div>
                  <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0a2540", margin: 0 }}>Project Portfolio</h1>
                  <p style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>Manage all spaces, projects, and tickets</p>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "16px", alignItems: "center", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", padding: "8px 20px", borderRadius: "40px", border: "1px solid rgba(255,255,255,0.5)" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#0a2540" }}>{stats.totalProjects}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Projects</div>
            </div>
            <div style={{ width: "1px", height: "30px", background: "#e2e8f0" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#0a2540" }}>{stats.totalTickets}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Tickets</div>
            </div>
            <div style={{ width: "1px", height: "30px", background: "#e2e8f0" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#10b981" }}>{stats.completionRate}%</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px", position: "relative", zIndex: 1 }}>
        {[
          { icon: <LayoutGrid size={20} />, label: "Active Spaces", value: stats.totalSpaces, color: "#3b82f6", bg: "#eff6ff" },
          { icon: <Briefcase size={20} />, label: "Total Projects", value: stats.totalProjects, color: "#8b5cf6", bg: "#f3e8ff" },
          { icon: <Ticket size={20} />, label: "Open Tickets", value: stats.openTickets, color: "#ef4444", bg: "#fef2f2" },
          { icon: <CheckCircle size={20} />, label: "Resolved", value: stats.resolvedTickets, color: "#10b981", bg: "#ecfdf5" },
          { icon: <Zap size={20} />, label: "Critical", value: stats.criticalTickets, color: "#f59e0b", bg: "#fffbeb" },
        ].map((stat, idx) => (
          <div key={idx} style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "18px 20px",
            border: "1px solid rgba(255,255,255,0.5)",
            transition: "all 0.3s ease",
            animation: `slideUp 0.5s ease-out ${idx * 0.08}s both`
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,255,255,0.9)"; }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ width: "48px", height: "48px", background: stat.bg, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>{stat.icon}</div>
            </div>
            <div style={{ marginTop: "14px" }}>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "#0a2540" }}>{stat.value}</div>
              <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "16px 24px",
        marginBottom: "32px",
        border: "1px solid rgba(255,255,255,0.5)",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", background: "#f8fafc", padding: "12px 18px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <Search size={18} style={{ color: "#94a3b8" }} />
            <input
              placeholder="Search spaces or projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "14px", color: "#1e293b" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>✖</button>
            )}
          </div>

          <select 
            value={spaceFilter} 
            onChange={e => setSpaceFilter(e.target.value)}
            style={{ padding: "12px 18px", borderRadius: "14px", border: "1px solid #e2e8f0", background: "#f8fafc", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}
          >
            {spaceOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>

          <button onClick={() => setShowFilters(!showFilters)} style={{ padding: "12px 20px", borderRadius: "14px", border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "500" }}>
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className={animation} style={{ position: "relative", zIndex: 1 }}>
        {filteredSpaces.map((space, spaceIdx) => (
          <div key={space.id} style={{ marginBottom: "48px", animation: `slideUp 0.5s ease-out ${spaceIdx * 0.1}s both` }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "24px",
              padding: "16px 24px",
              background: `linear-gradient(135deg, ${space.bg}, transparent)`,
              borderRadius: "20px",
              borderLeft: `4px solid ${space.color}`
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  background: `linear-gradient(135deg, ${space.color}20, ${space.color}10)`,
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px"
                }}>{space.icon}</div>
                <div>
                  <h2 style={{ fontSize: "22px", fontWeight: "700", color: space.color, margin: 0 }}>{space.name}</h2>
                  <p style={{ fontSize: "13px", color: "#64748b", marginTop: "6px" }}>{space.description}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ background: space.bg, padding: "8px 16px", borderRadius: "30px", textAlign: "center" }}>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: space.color }}>{space.stats.projects}</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Projects</div>
                </div>
                <div style={{ background: space.bg, padding: "8px 16px", borderRadius: "30px", textAlign: "center" }}>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: space.color }}>{space.stats.tickets}</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Tickets</div>
                </div>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
              gap: "24px"
            }}>
              {space.projects.map((project, idx) => {
                const progressColor = getProgressColor(project.progress);
                const statusStyle = getStatusColor(project.status);
                const ticketCount = project.tickets.length;
                const openTickets = project.tickets.filter(t => t.status === "Open").length;
                const daysLeft = getDaysRemaining(project.deadline);
                const isHovered = hoveredCard === project.id;
                
                return (
                  <div 
                    key={project.id}
                    style={{
                      background: "#fff",
                      borderRadius: "24px",
                      overflow: "hidden",
                      border: `1px solid ${space.color}20`,
                      boxShadow: isHovered ? `0 20px 35px ${space.color}15` : "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                      cursor: "pointer",
                      transform: isHovered ? "translateY(-8px)" : "translateY(0)"
                    }}
                    onMouseEnter={() => setHoveredCard(project.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleProjectClick(space, project)}
                  >
                    <div style={{
                      padding: "20px 24px",
                      background: `linear-gradient(135deg, ${space.bg}, #fff)`,
                      borderBottom: `1px solid ${space.color}15`
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <div style={{
                            width: "56px",
                            height: "56px",
                            background: `linear-gradient(135deg, ${space.color}20, ${space.color}10)`,
                            borderRadius: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "28px"
                          }}>{project.icon}</div>
                          <div>
                            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0a2540", margin: 0 }}>{project.name}</h3>
                            <div style={{ display: "flex", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
                              <span style={{ background: statusStyle.bg, color: statusStyle.color, padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>{statusStyle.icon} {statusStyle.label}</span>
                              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: daysLeft.color }}>
                                <span>{daysLeft.icon}</span> {daysLeft.text}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "20px", fontWeight: "700", color: progressColor }}>{project.progress}%</div>
                          <div style={{ fontSize: "11px", color: "#64748b" }}>Complete</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: "20px 24px" }}>
                      <div style={{ marginBottom: "20px" }}>
                        <div style={{ width: "100%", height: "8px", background: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                          <div style={{ width: `${project.progress}%`, height: "100%", background: space.gradient, borderRadius: "4px", transition: "width 0.6s ease" }} />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
                        <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "14px", textAlign: "center" }}>
                          <Ticket size={14} color="#3b82f6" style={{ marginBottom: "4px" }} />
                          <div style={{ fontSize: "16px", fontWeight: "700", color: "#0a2540" }}>{ticketCount}</div>
                          <div style={{ fontSize: "10px", color: "#64748b" }}>Tickets</div>
                        </div>
                        <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "14px", textAlign: "center" }}>
                          <AlertCircle size={14} color="#ef4444" style={{ marginBottom: "4px" }} />
                          <div style={{ fontSize: "16px", fontWeight: "700", color: "#ef4444" }}>{openTickets}</div>
                          <div style={{ fontSize: "10px", color: "#64748b" }}>Open</div>
                        </div>
                        <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "14px", textAlign: "center" }}>
                          <Users size={14} color="#8b5cf6" style={{ marginBottom: "4px" }} />
                          <div style={{ fontSize: "16px", fontWeight: "700", color: "#0a2540" }}>{project.team.length}</div>
                          <div style={{ fontSize: "10px", color: "#64748b" }}>Members</div>
                        </div>
                      </div>

                      {project.tickets.length > 0 && (
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                            <div style={{ width: "4px", height: "16px", background: space.color, borderRadius: "2px" }} />
                            <span style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>Recent Tickets</span>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {project.tickets.slice(0, 2).map(ticket => {
                              const ticketStatus = getTicketStatusColor(ticket.status);
                              return (
                                <div key={ticket.id} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", padding: "8px", background: "#f8fafc", borderRadius: "12px" }}>
                                  <div style={{ width: "8px", height: "8px", background: ticketStatus.dot, borderRadius: "50%" }} />
                                  <span style={{ fontWeight: "500", color: "#1e293b", flex: 1 }}>{ticket.title}</span>
                                  <span style={{ fontSize: "10px", color: "#64748b" }}>{ticket.date}</span>
                                </div>
                              );
                            })}
                            {project.tickets.length > 2 && (
                              <div style={{ fontSize: "11px", color: space.color, textAlign: "center", marginTop: "4px" }}>
                                +{project.tickets.length - 2} more tickets
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{
                      padding: "14px 24px",
                      borderTop: `1px solid ${space.color}15`,
                      background: "#fafcff",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "-6px" }}>
                          {project.team.slice(0, 3).map((member, i) => (
                            <div key={i} style={{
                              width: "30px",
                              height: "30px",
                              background: `linear-gradient(135deg, ${space.color}30, ${space.color}15)`,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "11px",
                              fontWeight: "600",
                              color: space.color,
                              marginLeft: i > 0 ? "-8px" : "0",
                              border: "2px solid #fff"
                            }}>{member.slice(0,2)}</div>
                          ))}
                        </div>
                      </div>
                      <button style={{
                        padding: "8px 20px",
                        background: space.bg,
                        border: "none",
                        borderRadius: "30px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: space.color,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = space.color; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = space.bg; e.currentTarget.style.color = space.color; }}>
                        View Tickets <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Modal */}
      {showTicketModal && selectedProject && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          backdropFilter: "blur(8px)"
        }} onClick={() => setShowTicketModal(false)}>
          <div style={{
            background: "#fff",
            borderRadius: "28px",
            padding: "0",
            maxWidth: "900px",
            width: "90%",
            maxHeight: "85vh",
            overflow: "auto",
            boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
          }} onClick={e => e.stopPropagation()}>
            
            <div style={{
              padding: "24px 28px",
              background: `linear-gradient(135deg, ${selectedProject.spaceColor}15, #fff)`,
              borderBottom: `2px solid ${selectedProject.spaceColor}30`,
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              zIndex: 10
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    background: `linear-gradient(135deg, ${selectedProject.spaceColor}20, ${selectedProject.spaceColor}10)`,
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px"
                  }}>{selectedProject.icon}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", padding: "4px 12px", background: `${selectedProject.spaceColor}15`, color: selectedProject.spaceColor, borderRadius: "20px", fontWeight: "600" }}>{selectedProject.spaceName}</span>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>•</span>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{selectedProject.tickets?.length || 0} tickets</span>
                    </div>
                    <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#0a2540", margin: 0 }}>{selectedProject.name}</h2>
                    <p style={{ fontSize: "13px", color: "#64748b", marginTop: "6px" }}>View all tickets associated with this project</p>
                  </div>
                </div>
                <button onClick={() => setShowTicketModal(false)} style={{
                  width: "40px",
                  height: "40px",
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <X size={20} />
                </button>
              </div>
            </div>

            <div style={{ padding: "24px 28px" }}>
              {selectedProject.tickets && selectedProject.tickets.length > 0 ? (
                <>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
                    <div style={{ background: "#eff6ff", padding: "10px 20px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <Ticket size={18} color="#3b82f6" />
                      <div><strong>{selectedProject.tickets.length}</strong> <span style={{ fontSize: "13px", color: "#64748b" }}>Total Tickets</span></div>
                    </div>
                    <div style={{ background: "#fef2f2", padding: "10px 20px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <AlertCircle size={18} color="#ef4444" />
                      <div><strong>{selectedProject.tickets.filter(t => t.status === "Open").length}</strong> <span style={{ fontSize: "13px", color: "#64748b" }}>Open</span></div>
                    </div>
                    <div style={{ background: "#d1fae5", padding: "10px 20px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <CheckCircle size={18} color="#10b981" />
                      <div><strong>{selectedProject.tickets.filter(t => t.status === "Done" || t.status === "Resolved").length}</strong> <span style={{ fontSize: "13px", color: "#64748b" }}>Resolved</span></div>
                    </div>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                          <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>ID</th>
                          <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>Title</th>
                          <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>Status</th>
                          <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>Priority</th>
                          <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>Created By</th>
                          <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.tickets.map((ticket, idx) => {
                          const statusStyle = getTicketStatusColor(ticket.status);
                          return (
                            <tr key={ticket.id} style={{ borderBottom: "1px solid #f1f5f9" }} onMouseEnter={e => e.currentTarget.style.background = "#fafcff"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                              <td style={{ padding: "14px 16px", fontSize: "13px", fontFamily: "monospace", color: "#3b82f6", fontWeight: "600" }}>{ticket.id}</td>
                              <td style={{ padding: "14px 16px", fontSize: "13px", color: "#1e293b", fontWeight: "500" }}>{ticket.title}</td>
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <div style={{ width: "8px", height: "8px", background: statusStyle.dot, borderRadius: "50%" }} />
                                  <span style={{ background: statusStyle.bg, color: statusStyle.color, padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>{ticket.status}</span>
                                </div>
                              </td>
                              <td style={{ padding: "14px 16px" }}>{getPriorityBadge(ticket.priority)}</td>
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <div style={{
                                    width: "32px",
                                    height: "32px",
                                    background: `linear-gradient(135deg, ${selectedProject.spaceColor}30, ${selectedProject.spaceColor}15)`,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    color: selectedProject.spaceColor
                                  }}>{ticket.userAvatar}</div>
                                  <span style={{ fontSize: "12px", color: "#475569" }}>{ticket.user}</span>
                                </div>
                              </td>
                              <td style={{ padding: "14px 16px", fontSize: "12px", color: "#64748b" }}>{ticket.date}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "80px", color: "#94a3b8" }}>
                  <Ticket size={64} style={{ marginBottom: "20px", opacity: 0.4 }} />
                  <p style={{ fontSize: "16px", fontWeight: "500" }}>No tickets found</p>
                </div>
              )}

              <div style={{ display: "flex", gap: "16px", marginTop: "28px", paddingTop: "24px", borderTop: "1px solid #e2e8f0" }}>
                <button onClick={() => setShowTicketModal(false)} style={{
                  flex: 1,
                  padding: "14px",
                  background: "linear-gradient(135deg, #0B3D91, #1a52b8)",
                  color: "#fff",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600"
                }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
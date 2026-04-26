import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, ArrowLeft, CheckCircle, Clock, AlertCircle, User, 
  Calendar, Tag, Filter, Search, ChevronDown, Trash2, Edit, 
  Loader, TrendingUp, PieChart, Activity, Zap, Target,
  X, Eye, MoreVertical, Download, RefreshCw
} from "lucide-react";

const STATUS_COLORS = {
  "Open": { bg: "linear-gradient(135deg, #dbeafe, #eff6ff)", color: "#2563eb", dot: "#3b82f6", label: "Open", icon: "📋" },
  "In Progress": { bg: "linear-gradient(135deg, #fed7aa, #fffbeb)", color: "#ea580c", dot: "#f97316", label: "In Progress", icon: "⚡" },
  "Done": { bg: "linear-gradient(135deg, #d1fae5, #ecfdf5)", color: "#059669", dot: "#10b981", label: "Done", icon: "✅" },
  "Review": { bg: "linear-gradient(135deg, #f3e8ff, #faf5ff)", color: "#9333ea", dot: "#a855f7", label: "Review", icon: "👀" },
  "Blocked": { bg: "linear-gradient(135deg, #fee2e2, #fef2f2)", color: "#dc2626", dot: "#ef4444", label: "Blocked", icon: "🔒" },
};

const PRIORITY_COLORS = {
  "Critical": { bg: "linear-gradient(135deg, #fef2f2, #fff7ed)", color: "#dc2626", icon: "🔴" },
  "High": { bg: "linear-gradient(135deg, #fff7ed, #fefce8)", color: "#ea580c", icon: "🟠" },
  "Medium": { bg: "linear-gradient(135deg, #fefce8, #fef9c3)", color: "#ca8a04", icon: "🟡" },
  "Low": { bg: "linear-gradient(135deg, #f0fdf4, #dcfce7)", color: "#16a34a", icon: "🟢" },
};

export default function AssignedTickets() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [handlerName, setHandlerName] = useState("");
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table"); // table or grid
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    if (userName) {
      setHandlerName(userName);
    } else if (userEmail) {
      setHandlerName(userEmail.split('@')[0]);
    }
    loadTicketsFromStorage();
  }, []);

  const loadTicketsFromStorage = () => {
    setIsLoading(true);
    setTimeout(() => {
      const savedTickets = localStorage.getItem("assignedTickets");
      if (savedTickets) {
        setAssignedTickets(JSON.parse(savedTickets));
      } else {
        const defaultTickets = getDefaultTickets();
        setAssignedTickets(defaultTickets);
        localStorage.setItem("assignedTickets", JSON.stringify(defaultTickets));
      }
      setIsLoading(false);
    }, 500);
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

  const handleStatusUpdate = (ticketId, newStatus) => {
    const updatedTickets = assignedTickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    );
    setAssignedTickets(updatedTickets);
    localStorage.setItem("assignedTickets", JSON.stringify(updatedTickets));
    showToast(`Ticket ${ticketId} status updated to ${newStatus}`, "success");
  };

  const handleDeleteTicket = (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updatedTickets = assignedTickets.filter(ticket => ticket.id !== ticketId);
      setAssignedTickets(updatedTickets);
      localStorage.setItem("assignedTickets", JSON.stringify(updatedTickets));
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(null);
      }
      showToast(`Ticket ${ticketId} deleted successfully`, "success");
    }
  };

  const showToast = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `toast-notification ${type}`;
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        ${type === "success" ? "✅" : "❌"}
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const sortTickets = (tickets) => {
    return [...tickets].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (sortBy === "dueDate") {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  };

  const projects = ["All", ...new Set(assignedTickets.map(t => t.project))];

  const filteredTickets = sortTickets(assignedTickets.filter(ticket => {
    const matchSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ticket.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || ticket.status === statusFilter;
    const matchPriority = priorityFilter === "All" || ticket.priority === priorityFilter;
    const matchProject = projectFilter === "All" || ticket.project === projectFilter;
    return matchSearch && matchStatus && matchPriority && matchProject;
  }));

  const stats = {
    total: assignedTickets.length,
    open: assignedTickets.filter(t => t.status === "Open").length,
    inProgress: assignedTickets.filter(t => t.status === "In Progress").length,
    done: assignedTickets.filter(t => t.status === "Done").length,
    review: assignedTickets.filter(t => t.status === "Review").length,
    blocked: assignedTickets.filter(t => t.status === "Blocked").length,
    critical: assignedTickets.filter(t => t.priority === "Critical").length,
    high: assignedTickets.filter(t => t.priority === "High").length,
    completionRate: Math.round((assignedTickets.filter(t => t.status === "Done").length / assignedTickets.length) * 100),
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your tickets...</p>
      </div>
    );
  }

  return (
    <div className="assigned-tickets-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>

      {/* Header Section */}
      <div className="page-header glass-effect">
        <div className="header-left">
          <button className="back-button" onClick={() => navigate("/tickethandler")}>
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </button>
          <div className="header-title">
            <div className="title-icon">
              <span>📋</span>
            </div>
            <div>
              <h1>My Assigned Tickets</h1>
              <p>Tickets assigned to {handlerName || "Ticket Handler"} • Last updated today</p>
            </div>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Tickets</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-value" style={{ color: "#f59e0b" }}>{stats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-value" style={{ color: "#10b981" }}>{stats.done}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value" style={{ color: "#3b82f6" }}>{stats.completionRate}%</div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar glass-effect">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tickets by title, ID, or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={16} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <div className="filter-group">
          <Tag size={16} />
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="All">All Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="filter-group">
          <User size={16} />
          <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
            {projects.map(project => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
        </div>
        <div className="view-toggle">
          <button className={`view-btn ${viewMode === "table" ? "active" : ""}`} onClick={() => setViewMode("table")}>
            📋 Table
          </button>
          <button className={`view-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>
            🔲 Grid
          </button>
        </div>
        {(statusFilter !== "All" || priorityFilter !== "All" || projectFilter !== "All" || searchQuery) && (
          <button className="clear-filters" onClick={() => {
            setStatusFilter("All");
            setPriorityFilter("All");
            setProjectFilter("All");
            setSearchQuery("");
          }}>
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Sort Bar */}
      <div className="sort-bar glass-effect">
        <div className="sort-label">
          <TrendingUp size={14} /> Sort by:
        </div>
        <div className="sort-options">
          <button className={`sort-btn ${sortBy === "dueDate" ? "active" : ""}`} onClick={() => { setSortBy("dueDate"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>
            Due Date {sortBy === "dueDate" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button className={`sort-btn ${sortBy === "priority" ? "active" : ""}`} onClick={() => { setSortBy("priority"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>
            Priority {sortBy === "priority" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button className={`sort-btn ${sortBy === "status" ? "active" : ""}`} onClick={() => { setSortBy("status"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>
            Status {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
        <button className="refresh-btn" onClick={loadTicketsFromStorage}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="tickets-table-container glass-effect">
          <table className="tickets-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned By</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(ticket => {
                const statusStyle = STATUS_COLORS[ticket.status];
                const priorityStyle = PRIORITY_COLORS[ticket.priority];
                const isOverdue = new Date(ticket.dueDate) < new Date() && ticket.status !== "Done";
                
                return (
                  <tr key={ticket.id} className="clickable-row" onClick={() => setSelectedTicket(ticket)}>
                    <td className="ticket-id-cell">{ticket.id}</td>
                    <td>
                      <div className="project-badge" style={{ background: statusStyle?.bg, color: statusStyle?.color }}>
                        <span>{ticket.projectIcon}</span>
                        <span>{ticket.project}</span>
                      </div>
                    </td>
                    <td className="title-cell">{ticket.title}</td>
                    <td>
                      <span className="priority-badge" style={{ background: priorityStyle.bg, color: priorityStyle.color }}>
                        <span>{priorityStyle.icon}</span> {ticket.priority}
                      </span>
                    </td>
                    <td>
                      <span className="status-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                        <span className="status-dot" style={{ background: statusStyle.dot }} />
                        {statusStyle.label}
                      </span>
                    </td>
                    <td>
                      <div className="assigned-by">
                        <div className="avatar-small" style={{ background: `linear-gradient(135deg, ${statusStyle?.color}40, ${statusStyle?.color}20)` }}>
                          {ticket.assignedBy?.charAt(0) || "A"}
                        </div>
                        {ticket.assignedBy}
                      </div>
                    </td>
                    <td className={`due-date ${isOverdue ? "overdue" : ""}`}>
                      <Calendar size={12} />
                      {ticket.dueDate}
                      {isOverdue && <span className="overdue-badge">Overdue</span>}
                    </td>
                    <td className="actions-cell">
                      <select
                        className="status-update"
                        value={ticket.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(ticket.id, e.target.value);
                        }}
                        style={{ borderColor: statusStyle.color }}
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Review</option>
                        <option>Done</option>
                        <option>Blocked</option>
                      </select>
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTicket(ticket.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredTickets.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No tickets found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="tickets-grid">
          {filteredTickets.map(ticket => {
            const statusStyle = STATUS_COLORS[ticket.status];
            const priorityStyle = PRIORITY_COLORS[ticket.priority];
            const isOverdue = new Date(ticket.dueDate) < new Date() && ticket.status !== "Done";
            
            return (
              <div key={ticket.id} className="grid-card" onClick={() => setSelectedTicket(ticket)}>
                <div className="grid-card-header" style={{ borderLeftColor: statusStyle.color }}>
                  <div className="grid-card-id">{ticket.id}</div>
                  <div className="grid-card-badges">
                    <span className="priority-badge-sm" style={{ background: priorityStyle.bg, color: priorityStyle.color }}>
                      {priorityStyle.icon} {ticket.priority}
                    </span>
                  </div>
                </div>
                <div className="grid-card-title">{ticket.title}</div>
                <div className="grid-card-project">
                  <span>{ticket.projectIcon}</span>
                  <span>{ticket.project}</span>
                </div>
                <div className="grid-card-due">
                  <Calendar size={12} />
                  <span className={isOverdue ? "overdue" : ""}>Due: {ticket.dueDate}</span>
                  {isOverdue && <span className="overdue-badge-sm">Overdue</span>}
                </div>
                <div className="grid-card-footer">
                  <div className="grid-card-assigned">
                    <div className="avatar-xs">{ticket.assignedBy?.charAt(0) || "A"}</div>
                    <span>{ticket.assignedBy}</span>
                  </div>
                  <div className="grid-card-status" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                    {statusStyle.icon} {statusStyle.label}
                  </div>
                </div>
              </div>
            );
          })}
          {filteredTickets.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No tickets found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ borderBottomColor: STATUS_COLORS[selectedTicket.status]?.color }}>
              <div className="modal-header-left">
                <span className="modal-id">{selectedTicket.id}</span>
                <h2>{selectedTicket.title}</h2>
              </div>
              <button className="modal-close" onClick={() => setSelectedTicket(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Project</label>
                  <div className="project-badge-lg">
                    <span>{selectedTicket.projectIcon}</span>
                    <span>{selectedTicket.project}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <label>Priority</label>
                  <span className="priority-badge-lg" style={{ background: PRIORITY_COLORS[selectedTicket.priority]?.bg, color: PRIORITY_COLORS[selectedTicket.priority]?.color }}>
                    {PRIORITY_COLORS[selectedTicket.priority]?.icon} {selectedTicket.priority}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Status</label>
                  <span className="status-badge-lg" style={{ background: STATUS_COLORS[selectedTicket.status]?.bg, color: STATUS_COLORS[selectedTicket.status]?.color }}>
                    <span className="status-dot" style={{ background: STATUS_COLORS[selectedTicket.status]?.dot }} />
                    {STATUS_COLORS[selectedTicket.status]?.label}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Assigned By</label>
                  <div className="assigned-by-lg">
                    <div className="avatar">{selectedTicket.assignedBy?.charAt(0) || "A"}</div>
                    {selectedTicket.assignedBy}
                  </div>
                </div>
                <div className="detail-item">
                  <label>Created Date</label>
                  <div><Calendar size={14} /> {selectedTicket.createdAt || selectedTicket.assignedDate}</div>
                </div>
                <div className="detail-item">
                  <label>Due Date</label>
                  <div className={new Date(selectedTicket.dueDate) < new Date() && selectedTicket.status !== "Done" ? "overdue-text" : ""}>
                    <Calendar size={14} /> {selectedTicket.dueDate}
                  </div>
                </div>
              </div>
              <div className="detail-item full-width">
                <label>Description</label>
                <p className="description-text">{selectedTicket.description}</p>
              </div>
            </div>
            <div className="modal-footer">
              <select
                className="status-update-modal"
                value={selectedTicket.status}
                onChange={(e) => {
                  handleStatusUpdate(selectedTicket.id, e.target.value);
                  setSelectedTicket(null);
                }}
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Done</option>
                <option>Blocked</option>
              </select>
              <button className="delete-modal-btn" onClick={() => {
                handleDeleteTicket(selectedTicket.id);
                setSelectedTicket(null);
              }}>
                <Trash2 size={16} /> Delete
              </button>
              <button className="close-modal-btn" onClick={() => setSelectedTicket(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .assigned-tickets-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px 32px;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated Background */
        .animated-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 0;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 20s infinite ease-in-out;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: rgba(59, 130, 246, 0.3);
          top: -200px;
          right: -100px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: rgba(139, 92, 246, 0.3);
          bottom: -150px;
          left: -100px;
          animation-delay: 5s;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          background: rgba(16, 185, 129, 0.2);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }

        /* Glass Effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Loading */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Header */
        .page-header {
          position: relative;
          z-index: 1;
          padding: 28px 32px;
          margin-bottom: 24px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: linear-gradient(135deg, #0B3D91, #1a52b8);
          border: none;
          border-radius: 40px;
          color: #fff;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(11, 61, 145, 0.4);
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .title-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #0B3D91, #1a52b8);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          box-shadow: 0 8px 20px rgba(11, 61, 145, 0.3);
        }

        .header-title h1 {
          font-size: 28px;
          font-weight: 800;
          color: #0a2540;
          margin: 0 0 6px 0;
        }

        .header-title p {
          color: #64748b;
          font-size: 14px;
          margin: 0;
        }

        .header-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .stat-card {
          text-align: center;
          padding: 16px;
          background: linear-gradient(135deg, #f8fafc, #fff);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          font-size: 28px;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 800;
          color: #0a2540;
        }

        .stat-label {
          font-size: 12px;
          color: #64748b;
          margin-top: 6px;
          font-weight: 500;
        }

        /* Filters */
        .filters-bar {
          position: relative;
          z-index: 1;
          padding: 16px 24px;
          margin-bottom: 20px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          align-items: center;
        }

        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 40px;
          transition: all 0.3s ease;
        }

        .search-box:focus-within {
          border-color: #0B3D91;
          box-shadow: 0 0 0 3px rgba(11, 61, 145, 0.1);
        }

        .search-box input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 40px;
        }

        .filter-group select {
          border: none;
          outline: none;
          background: transparent;
          font-size: 13px;
          cursor: pointer;
        }

        .view-toggle {
          display: flex;
          gap: 4px;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 40px;
        }

        .view-btn {
          padding: 6px 16px;
          border: none;
          background: transparent;
          border-radius: 30px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .view-btn.active {
          background: linear-gradient(135deg, #0B3D91, #1a52b8);
          color: #fff;
        }

        .clear-filters {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: #ef4444;
          color: #fff;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .clear-filters:hover {
          background: #dc2626;
          transform: scale(1.02);
        }

        /* Sort Bar */
        .sort-bar {
          position: relative;
          z-index: 1;
          padding: 12px 24px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .sort-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }

        .sort-options {
          display: flex;
          gap: 8px;
        }

        .sort-btn {
          padding: 6px 14px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .sort-btn.active {
          background: #0B3D91;
          color: #fff;
          border-color: #0B3D91;
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          cursor: pointer;
          font-size: 12px;
          margin-left: auto;
          transition: all 0.2s;
        }

        .refresh-btn:hover {
          background: #e2e8f0;
        }

        /* Table */
        .tickets-table-container {
          position: relative;
          z-index: 1;
          overflow: auto;
          border-radius: 20px;
        }

        .tickets-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }

        .tickets-table th {
          padding: 16px 20px;
          text-align: left;
          background: #f8fafc;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e2e8f0;
        }

        .tickets-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 14px;
        }

        .clickable-row {
          cursor: pointer;
          transition: all 0.2s;
        }

        .clickable-row:hover {
          background: linear-gradient(90deg, #f8fafc, #fff);
          transform: scale(1.01);
        }

        .ticket-id-cell {
          font-family: monospace;
          font-weight: 700;
          color: #0B3D91;
        }

        .title-cell {
          font-weight: 500;
          color: #1e293b;
        }

        .project-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .priority-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .assigned-by {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .avatar-small {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
        }

        .due-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #64748b;
        }

        .due-date.overdue {
          color: #ef4444;
          font-weight: 500;
        }

        .overdue-badge {
          background: #fee2e2;
          color: #dc2626;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          margin-left: 6px;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .status-update {
          padding: 6px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 12px;
          background: #fff;
          cursor: pointer;
        }

        .delete-btn {
          padding: 6px 10px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          cursor: pointer;
          color: #dc2626;
          transition: all 0.2s;
        }

        .delete-btn:hover {
          background: #dc2626;
          color: #fff;
        }

        /* Grid View */
        .tickets-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .grid-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .grid-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .grid-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 2px solid;
        }

        .grid-card-id {
          font-family: monospace;
          font-weight: 700;
          color: #0B3D91;
          font-size: 13px;
        }

        .grid-card-badges {
          display: flex;
          gap: 6px;
        }

        .priority-badge-sm {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
        }

        .grid-card-title {
          font-size: 15px;
          font-weight: 600;
          color: #0a2540;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .grid-card-project {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 10px;
        }

        .grid-card-due {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #64748b;
          margin-bottom: 12px;
        }

        .grid-card-due .overdue {
          color: #ef4444;
          font-weight: 500;
        }

        .overdue-badge-sm {
          background: #fee2e2;
          color: #dc2626;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 9px;
          font-weight: 600;
          margin-left: 6px;
        }

        .grid-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 10px;
          border-top: 1px solid #e2e8f0;
        }

        .grid-card-assigned {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #64748b;
        }

        .avatar-xs {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #0B3D91, #1a52b8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 10px;
        }

        .grid-card-status {
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 60px;
          color: #64748b;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state h3 {
          font-size: 18px;
          margin-bottom: 8px;
          color: #0a2540;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(8px);
        }

        .modal-content {
          background: #fff;
          border-radius: 24px;
          max-width: 600px;
          width: 90%;
          max-height: 85vh;
          overflow: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          padding: 24px 28px;
          border-bottom: 2px solid;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          position: sticky;
          top: 0;
          background: #fff;
        }

        .modal-id {
          font-family: monospace;
          font-size: 12px;
          color: #0B3D91;
          background: #eef2ff;
          padding: 4px 10px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 12px;
        }

        .modal-header h2 {
          font-size: 20px;
          margin: 0;
          color: #0a2540;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s;
        }

        .modal-close:hover {
          color: #0a2540;
          transform: rotate(90deg);
        }

        .modal-body {
          padding: 24px 28px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-item label {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .full-width {
          grid-column: span 2;
        }

        .description-text {
          color: #334155;
          line-height: 1.6;
          font-size: 14px;
          background: #f8fafc;
          padding: 16px;
          border-radius: 12px;
          margin: 0;
        }

        .project-badge-lg {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: #f1f5f9;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }

        .priority-badge-lg, .status-badge-lg {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          width: fit-content;
        }

        .assigned-by-lg {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #0B3D91, #1a52b8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 16px;
        }

        .overdue-text {
          color: #dc2626;
          font-weight: 500;
        }

        .modal-footer {
          padding: 20px 28px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 12px;
        }

        .status-update-modal {
          flex: 1;
          padding: 10px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          cursor: pointer;
        }

        .delete-modal-btn {
          padding: 10px 20px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          cursor: pointer;
          color: #dc2626;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .delete-modal-btn:hover {
          background: #dc2626;
          color: #fff;
        }

        .close-modal-btn {
          padding: 10px 24px;
          background: #f1f5f9;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .close-modal-btn:hover {
          background: #e2e8f0;
        }

        /* Toast Notification */
        .toast-notification {
          position: fixed;
          bottom: 30px;
          right: 30px;
          padding: 12px 24px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 1100;
          animation: slideInRight 0.3s ease;
          border-left: 4px solid;
        }

        .toast-notification.success {
          border-left-color: #10b981;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .assigned-tickets-page {
            padding: 16px;
          }
          .header-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .header-left {
            flex-direction: column;
            align-items: flex-start;
          }
          .filters-bar {
            flex-direction: column;
          }
          .search-box {
            width: 100%;
          }
          .filter-group {
            width: 100%;
            justify-content: space-between;
          }
          .sort-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .refresh-btn {
            margin-left: 0;
          }
          .tickets-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
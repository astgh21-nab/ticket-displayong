import { useState, useEffect } from "react";
import { Search, X, Plus, Filter, LayoutGrid, Table, User, Calendar, AlertCircle, CheckCircle, Clock, Tag, Edit, Trash2, MoreVertical, Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUSES = [
  { id: "Backlog", label: "Backlog", color: "#64748b", bg: "rgba(100, 116, 139, 0.15)", icon: "📋", gradient: "linear-gradient(135deg, #64748b, #475569)" },
  { id: "To Do", label: "To Do", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", icon: "✏️", gradient: "linear-gradient(135deg, #f59e0b, #d97706)" },
  { id: "In Progress", label: "In Progress", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)", icon: "⚡", gradient: "linear-gradient(135deg, #3b82f6, #2563eb)" },
  { id: "Done", label: "Done", color: "#10b981", bg: "rgba(16, 185, 129, 0.15)", icon: "✅", gradient: "linear-gradient(135deg, #10b981, #059669)" }
];

const PRIORITIES = { 
  Critical: { color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)", icon: "🔴", gradient: "linear-gradient(135deg, #ef4444, #dc2626)" },
  High: { color: "#f97316", bg: "rgba(249, 115, 22, 0.15)", icon: "🟠", gradient: "linear-gradient(135deg, #f97316, #ea580c)" },
  Medium: { color: "#eab308", bg: "rgba(234, 179, 8, 0.15)", icon: "🟡", gradient: "linear-gradient(135deg, #eab308, #ca8a04)" },
  Low: { color: "#22c55e", bg: "rgba(34, 197, 94, 0.15)", icon: "🟢", gradient: "linear-gradient(135deg, #22c55e, #16a34a)" }
};

export default function HandlerTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([
    { id: "TKT-001", title: "New hire onboarding access", status: "In Progress", priority: "High", assignee: "Sarah", assigneeAvatar: "SA", date: "2025-03-20", description: "Need to setup access for new developer joining next week" },
    { id: "TKT-002", title: "Production server down", status: "In Progress", priority: "Critical", assignee: "Mike", assigneeAvatar: "MK", date: "2025-03-22", description: "API gateway is returning 500 errors" },
    { id: "TKT-003", title: "Monitor replacement for John", status: "Done", priority: "Medium", assignee: "Lisa", assigneeAvatar: "LS", date: "2025-03-25", description: "Replace broken 24-inch monitor" },
    { id: "TKT-004", title: "Database optimization", status: "To Do", priority: "High", assignee: "Alex", assigneeAvatar: "AL", date: "2025-03-26", description: "Slow queries affecting performance" },
    { id: "TKT-005", title: "UI redesign feedback", status: "Backlog", priority: "Low", assignee: "Emma", assigneeAvatar: "EM", date: "2025-03-27", description: "Collect feedback on new design" },
  ]);

  const [viewMode, setViewMode] = useState("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [animation, setAnimation] = useState("");
  const [handlerName, setHandlerName] = useState("Ticket Handler");

  const [newTicket, setNewTicket] = useState({
    title: "",
    assignee: "",
    priority: "Medium",
    status: "Backlog",
    date: new Date().toISOString().split("T")[0],
    description: ""
  });

  useEffect(() => {
    setAnimation("fade-in");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    if (userName) {
      setHandlerName(userName);
    } else if (userEmail) {
      setHandlerName(userEmail.split('@')[0]);
    }
    const timer = setTimeout(() => setAnimation(""), 300);
    return () => clearTimeout(timer);
  }, [tickets]);

  const filteredTickets = tickets.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPriority = priorityFilter === "All" || t.priority === priorityFilter;
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchPriority && matchStatus;
  });

  const stats = {
    total: tickets.length,
    backlog: tickets.filter(t => t.status === "Backlog").length,
    todo: tickets.filter(t => t.status === "To Do").length,
    inProgress: tickets.filter(t => t.status === "In Progress").length,
    done: tickets.filter(t => t.status === "Done").length,
    critical: tickets.filter(t => t.priority === "Critical").length,
    high: tickets.filter(t => t.priority === "High").length,
  };

  const handleDragStart = (e, ticketId) => {
    e.dataTransfer.setData("ticketId", ticketId);
    e.target.style.opacity = "0.5";
  };
  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };
  const handleDragOver = e => e.preventDefault();
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData("ticketId");
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
  };

  const handleCreateTicket = e => {
    e.preventDefault();
    if (!newTicket.title || !newTicket.assignee) return;
    const id = `TKT-${String(tickets.length + 1).padStart(3, "0")}`;
    const assigneeAvatar = newTicket.assignee.slice(0, 2).toUpperCase();
    setTickets(prev => [{ id, ...newTicket, assigneeAvatar, description: newTicket.description || "No description" }, ...prev]);
    setNewTicket({ title: "", assignee: "", priority: "Medium", status: "Backlog", date: new Date().toISOString().split("T")[0], description: "" });
    setShowForm(false);
  };

  const handleDeleteTicket = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      setTickets(prev => prev.filter(t => t.id !== id));
      setSelectedTicket(null);
    }
  };

  const handleUpdateTicket = (id, updates) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const getPriorityBadge = (priority) => {
    const p = PRIORITIES[priority];
    return (
      <span style={{ background: p.bg, color: p.color, padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px", backdropFilter: "blur(4px)" }}>
        <span>{p.icon}</span> {priority}
      </span>
    );
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 0% 0%, #1a1a2e, #16213e, #0f3460, #1a1a2e)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite",
      padding: "24px 32px",
      position: "relative",
      overflowX: "hidden"
    }}>
      
      {/* Animated Background Elements */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent)", borderRadius: "50%", filter: "blur(60px)", animation: "float 20s infinite" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(16,185,129,0.1), transparent)", borderRadius: "50%", filter: "blur(80px)", animation: "float 25s infinite reverse" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(245,158,11,0.08), transparent)", borderRadius: "50%", filter: "blur(100px)", animation: "pulse 10s infinite" }} />

      {/* Header with Stats */}
      <div style={{ marginBottom: "28px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => navigate("/tickethandler")}
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.3)"; e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <ArrowLeft size={24} style={{ color: "#fff" }} />
              </button>
              <div style={{
                width: "50px",
                height: "50px",
                background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(16,185,129,0.2))",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                <Sparkles size={28} style={{ color: "#fff" }} />
              </div>
              <div>
                <h1 style={{ fontSize: "32px", fontWeight: "700", background: "linear-gradient(135deg, #fff, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>TicketFlow - Handler View</h1>
                <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "4px", fontSize: "14px" }}>Manage and process support tickets</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: "12px 28px",
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff",
              borderRadius: "40px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "600",
              boxShadow: "0 4px 20px rgba(16,185,129,0.4)",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(16,185,129,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(16,185,129,0.4)"; }}
          >
            <Plus size={18} /> New Ticket
          </button>
        </div>

        {/* Statistics Cards - Glassmorphism */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          {[
            { icon: <CheckCircle size={22} />, label: "Total Tickets", value: stats.total, color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
            { icon: <Clock size={22} />, label: "In Progress", value: stats.inProgress, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
            { icon: <AlertCircle size={22} />, label: "Critical", value: stats.critical, color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
            { icon: <CheckCircle size={22} />, label: "Completed", value: stats.done, color: "#10b981", bg: "rgba(16,185,129,0.1)" }
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              borderRadius: "20px",
              padding: "18px",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.3s ease",
              animation: `slideUp 0.5s ease-out ${idx * 0.1}s both`
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "48px", height: "48px", background: stat.bg, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>{stat.icon}</div>
                <div><div style={{ fontSize: "28px", fontWeight: "700", color: "#fff" }}>{stat.value}</div><div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{stat.label}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls Bar - Glassmorphism */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        padding: "16px 20px",
        marginBottom: "24px",
        border: "1px solid rgba(255,255,255,0.1)",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.3)", padding: "10px 16px", borderRadius: "40px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Search size={18} style={{ color: "rgba(255,255,255,0.6)" }} />
            <input
              placeholder="Search by title, ID, or assignee..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "14px", color: "#fff" }}
            />
          </div>

          <button onClick={() => setShowFilters(!showFilters)} style={{ padding: "10px 18px", borderRadius: "40px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: "#fff", fontSize: "13px" }}>
            <Filter size={16} /> Filters
          </button>

          <div style={{ display: "flex", gap: "4px", background: "rgba(0,0,0,0.3)", padding: "4px", borderRadius: "40px" }}>
            <button onClick={() => setViewMode("kanban")} style={{ padding: "8px 20px", borderRadius: "30px", border: "none", background: viewMode === "kanban" ? "linear-gradient(135deg, #10b981, #059669)" : "transparent", color: viewMode === "kanban" ? "#fff" : "rgba(255,255,255,0.7)", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s" }}>
              <LayoutGrid size={16} /> Kanban
            </button>
            <button onClick={() => setViewMode("table")} style={{ padding: "8px 20px", borderRadius: "30px", border: "none", background: viewMode === "table" ? "linear-gradient(135deg, #10b981, #059669)" : "transparent", color: viewMode === "table" ? "#fff" : "rgba(255,255,255,0.7)", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s" }}>
              <Table size={16} /> Table
            </button>
          </div>
        </div>

        {showFilters && (
          <div style={{ display: "flex", gap: "16px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", flexWrap: "wrap" }}>
            <div>
              <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px", display: "block" }}>Priority</label>
              <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={{ padding: "8px 12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#fff" }}>
                <option>All</option>
                <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px", display: "block" }}>Status</label>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "8px 12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", color: "#fff" }}>
                <option>All</option>
                {STATUSES.map(s => <option key={s.id}>{s.id}</option>)}
              </select>
            </div>
            {(priorityFilter !== "All" || statusFilter !== "All") && (
              <button onClick={() => { setPriorityFilter("All"); setStatusFilter("All"); }} style={{ padding: "8px 20px", borderRadius: "30px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.3)", cursor: "pointer", color: "#fff", alignSelf: "flex-end" }}>Clear Filters</button>
            )}
          </div>
        )}
      </div>

      {/* Create Ticket Modal - Glassmorphism */}
      {showForm && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(8px)" }} onClick={() => setShowForm(false)}>
          <form onSubmit={handleCreateTicket} style={{
            background: "rgba(20,30,50,0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "28px",
            padding: "36px",
            maxWidth: "540px",
            width: "90%",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.15)"
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "700", background: "linear-gradient(135deg, #fff, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>✨ Create New Ticket</h2>
              <button type="button" onClick={() => setShowForm(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", width: "36px", height: "36px", borderRadius: "12px", cursor: "pointer", color: "#fff" }}><X size={18} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input placeholder="Ticket Title *" value={newTicket.title} onChange={e => setNewTicket(prev => ({ ...prev, title: e.target.value }))} style={{ padding: "14px 18px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", fontSize: "14px", color: "#fff" }} required />
              <input placeholder="Reporter Name *" value={newTicket.assignee} onChange={e => setNewTicket(prev => ({ ...prev, assignee: e.target.value }))} style={{ padding: "14px 18px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", fontSize: "14px", color: "#fff" }} required />
              <textarea placeholder="Description" value={newTicket.description} onChange={e => setNewTicket(prev => ({ ...prev, description: e.target.value }))} rows="3" style={{ padding: "14px 18px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", fontSize: "14px", resize: "none", color: "#fff" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <select value={newTicket.priority} onChange={e => setNewTicket(prev => ({ ...prev, priority: e.target.value }))} style={{ padding: "14px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", color: "#fff" }}>
                  {Object.keys(PRIORITIES).map(p => <option key={p}>{p}</option>)}
                </select>
                <select value={newTicket.status} onChange={e => setNewTicket(prev => ({ ...prev, status: e.target.value }))} style={{ padding: "14px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", color: "#fff" }}>
                  {STATUSES.map(s => <option key={s.id}>{s.id}</option>)}
                </select>
              </div>
              <input type="date" value={newTicket.date} onChange={e => setNewTicket(prev => ({ ...prev, date: e.target.value }))} style={{ padding: "14px 18px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", color: "#fff" }} />
              <button type="submit" style={{ padding: "14px", background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", borderRadius: "14px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "14px", marginTop: "8px" }}>Create Ticket</button>
            </div>
          </form>
        </div>
      )}

      {/* KANBAN VIEW - Glassmorphism */}
      {viewMode === "kanban" && (
        <div className={animation} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", overflowX: "auto", minHeight: "500px", position: "relative", zIndex: 1 }}>
          {STATUSES.map(status => (
            <div
              key={status.id}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, status.id)}
              style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(8px)", borderRadius: "24px", padding: "16px", minHeight: "500px", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "10px 14px", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", borderRadius: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "20px" }}>{status.icon}</span>
                  <h3 style={{ fontSize: "15px", fontWeight: "600", color: status.color, margin: 0 }}>{status.label}</h3>
                  <span style={{ background: status.gradient, color: "#fff", borderRadius: "20px", padding: "2px 10px", fontSize: "11px", fontWeight: "600" }}>{filteredTickets.filter(t => t.status === status.id).length}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {filteredTickets.filter(t => t.status === status.id).map(ticket => (
                  <div
                    key={ticket.id}
                    draggable
                    onDragStart={e => handleDragStart(e, ticket.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => setSelectedTicket(ticket)}
                    style={{ background: "rgba(20,30,50,0.8)", backdropFilter: "blur(8px)", borderRadius: "18px", padding: "16px", cursor: "grab", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: "600", color: "#94a3b8", fontFamily: "monospace" }}>{ticket.id}</span>
                      {getPriorityBadge(ticket.priority)}
                    </div>
                    <h4 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "#fff" }}>{ticket.title}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "30px", height: "30px", background: `linear-gradient(135deg, ${PRIORITIES[ticket.priority]?.color}80, ${PRIORITIES[ticket.priority]?.color}40)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "600", color: "#fff" }}>{ticket.assigneeAvatar}</div>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>{ticket.assignee}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#64748b" }}>
                        <Calendar size={12} /> {ticket.date}
                      </div>
                    </div>
                  </div>
                ))}
                {filteredTickets.filter(t => t.status === status.id).length === 0 && (
                  <div style={{ textAlign: "center", padding: "40px", color: "#64748b", fontSize: "13px", background: "rgba(0,0,0,0.2)", borderRadius: "16px" }}>✨ No tickets</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW - Glassmorphism */}
      {viewMode === "table" && (
        <div className={animation} style={{ background: "rgba(20,30,50,0.7)", backdropFilter: "blur(12px)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", position: "relative", zIndex: 1 }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#94a3b8" }}>ID</th>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#94a3b8" }}>Title</th>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#94a3b8" }}>Status</th>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#94a3b8" }}>Priority</th>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#94a3b8" }}>Assignee</th>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#94a3b8" }}>Date</th>
                  <th style={{ padding: "16px", textAlign: "center", fontSize: "12px", fontWeight: "600", color: "#94a3b8" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map(ticket => (
                  <tr key={ticket.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "16px", fontSize: "13px", fontFamily: "monospace", color: "#60a5fa", fontWeight: "500" }}>{ticket.id}</td>
                    <td style={{ padding: "16px", fontSize: "13px", fontWeight: "500", color: "#fff" }}>{ticket.title}</td>
                    <td style={{ padding: "16px" }}>
                      <select value={ticket.status} onChange={(e) => handleUpdateTicket(ticket.id, { status: e.target.value })} style={{ padding: "6px 12px", borderRadius: "10px", border: `1px solid ${STATUSES.find(s => s.id === ticket.status)?.color}`, background: "rgba(0,0,0,0.3)", fontSize: "12px", fontWeight: "500", cursor: "pointer", color: "#fff" }}>
                        {STATUSES.map(s => <option key={s.id}>{s.id}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: "16px" }}>{getPriorityBadge(ticket.priority)}</td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "30px", height: "30px", background: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "600", color: "#fff" }}>{ticket.assigneeAvatar}</div>
                        <span style={{ fontSize: "13px", color: "#cbd5e1" }}>{ticket.assignee}</span>
                      </div>
                    </td>
                    <td style={{ padding: "16px", fontSize: "12px", color: "#94a3b8" }}>{ticket.date}</td>
                    <td style={{ padding: "16px", textAlign: "center" }}>
                      <button onClick={() => setSelectedTicket(ticket)} style={{ padding: "6px 14px", background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "8px", cursor: "pointer", fontSize: "12px", marginRight: "6px", color: "#34d399" }}>View</button>
                      <button onClick={() => handleDeleteTicket(ticket.id)} style={{ padding: "6px 14px", background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px", cursor: "pointer", fontSize: "12px", color: "#f87171" }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTickets.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
              <p>No tickets found matching your criteria</p>
            </div>
          )}
        </div>
      )}

      {/* Ticket Detail Modal - Glassmorphism */}
      {selectedTicket && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(8px)" }} onClick={() => setSelectedTicket(null)}>
          <div style={{ background: "rgba(20,30,50,0.95)", backdropFilter: "blur(20px)", borderRadius: "28px", padding: "32px", maxWidth: "540px", width: "90%", maxHeight: "80vh", overflow: "auto", border: "1px solid rgba(255,255,255,0.15)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "12px", fontFamily: "monospace", background: "rgba(16,185,129,0.2)", padding: "6px 14px", borderRadius: "20px", color: "#34d399" }}>{selectedTicket.id}</span>
              <button onClick={() => setSelectedTicket(null)} style={{ background: "rgba(255,255,255,0.1)", border: "none", width: "34px", height: "34px", borderRadius: "10px", cursor: "pointer", color: "#fff" }}><X size={18} /></button>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>{selectedTicket.title}</h2>
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
              {getPriorityBadge(selectedTicket.priority)}
              <span style={{ background: STATUSES.find(s => s.id === selectedTicket.status)?.bg, color: STATUSES.find(s => s.id === selectedTicket.status)?.color, padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>{selectedTicket.status}</span>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "8px" }}>Description</p>
              <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: "1.5" }}>{selectedTicket.description || "No description provided"}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px", padding: "16px", background: "rgba(0,0,0,0.3)", borderRadius: "16px" }}>
              <div><p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>Assignee</p><p style={{ fontSize: "14px", fontWeight: "500", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}><div style={{ width: "28px", height: "28px", background: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>{selectedTicket.assigneeAvatar}</div> {selectedTicket.assignee}</p></div>
              <div><p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>Created Date</p><p style={{ fontSize: "14px", fontWeight: "500", color: "#fff" }}>{selectedTicket.date}</p></div>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <select onChange={(e) => handleUpdateTicket(selectedTicket.id, { status: e.target.value })} value={selectedTicket.status} style={{ flex: 1, padding: "12px 16px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.3)", color: "#fff" }}>
                {STATUSES.map(s => <option key={s.id}>{s.id}</option>)}
              </select>
              <button onClick={() => handleDeleteTicket(selectedTicket.id)} style={{ padding: "12px 24px", background: "rgba(239,68,68,0.2)", color: "#f87171", borderRadius: "14px", border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer", fontWeight: "500" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(16,185,129,0.5);
          borderRadius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(16,185,129,0.7);
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.4);
        }
        select option {
          background: #1e293b;
          color: #fff;
        }
      `}</style>
    </div>
  );
}
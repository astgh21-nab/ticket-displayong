import { useState } from "react";
import { Search, X } from "lucide-react";

const STATUSES = ["Backlog", "To Do", "In Progress", "Done"];
const PRIORITIES = { Critical: "#ef4444", High: "#f97316", Medium: "#eab308", Low: "#22c55e" };

export default function Tickets() {
  const [tickets, setTickets] = useState([
    { id: "TKT-001", title: "New hire onboarding access", status: "Backlog", priority: "High", assignee: "Sarah", date: "2025-03-20" },
    { id: "TKT-002", title: "Production server down", status: "In Progress", priority: "Critical", assignee: "Mike", date: "2025-03-22" },
    { id: "TKT-003", title: "Monitor replacement for John", status: "Done", priority: "Medium", assignee: "Lisa", date: "2025-03-25" },
  ]);

  const [viewMode, setViewMode] = useState("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [newTicket, setNewTicket] = useState({
    title: "",
    assignee: "",
    priority: "Medium",
    status: "Backlog",
    date: new Date().toISOString().split("T")[0]
  });

  // Filters
  const filteredTickets = tickets.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPriority = priorityFilter === "All" || t.priority === priorityFilter;
    return matchSearch && matchPriority;
  });

  // Drag & Drop
  const handleDragStart = (e, ticketId) => e.dataTransfer.setData("ticketId", ticketId);
  const handleDragOver = e => e.preventDefault();
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData("ticketId");
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
  };

  // Ticket creation
  const handleCreateTicket = e => {
    e.preventDefault();
    if (!newTicket.title || !newTicket.assignee) return;

    const id = `TKT-${String(tickets.length + 1).padStart(3, "0")}`;
    setTickets(prev => [...prev, { id, ...newTicket }]);
    setNewTicket({ title: "", assignee: "", priority: "Medium", status: "Backlog", date: new Date().toISOString().split("T")[0] });
    setShowForm(false);
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <div className="topbar-title">Tickets</div>
        <p className="topbar-subtitle">Manage, track, and create support requests</p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: "#fff", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <Search size={18} style={{ color: "#64748b" }} />
          <input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ flex: 1, border: "none", outline: "none" }}
          />
        </div>

        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", cursor: "pointer" }}
        >
          <option>All</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <div style={{ display: "flex", gap: "4px" }}>
          <button onClick={() => setViewMode("kanban")}>Kanban</button>
          <button onClick={() => setViewMode("table")}>Table</button>
        </div>

        <button
          onClick={() => setShowForm(true)}
          style={{ padding: "10px 16px", background: "#3b82f6", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer" }}
        >
          + New Ticket
        </button>
      </div>

      {/* Ticket Creation Form */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
          onClick={() => setShowForm(false)}
        >
          <form
            onSubmit={handleCreateTicket}
            style={{ background: "#fff", borderRadius: "12px", padding: "28px", maxWidth: "500px", width: "90%" }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>New Ticket</h2>
              <button type="button" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
              <input
                placeholder="Title"
                value={newTicket.title}
                onChange={e => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
              />
              <input
                placeholder="Assignee"
                value={newTicket.assignee}
                onChange={e => setNewTicket(prev => ({ ...prev, assignee: e.target.value }))}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
              />
              <select
                value={newTicket.priority}
                onChange={e => setNewTicket(prev => ({ ...prev, priority: e.target.value }))}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
              >
                {Object.keys(PRIORITIES).map(p => <option key={p}>{p}</option>)}
              </select>
              <select
                value={newTicket.status}
                onChange={e => setNewTicket(prev => ({ ...prev, status: e.target.value }))}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
              >
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
              <input
                type="date"
                value={newTicket.date}
                onChange={e => setNewTicket(prev => ({ ...prev, date: e.target.value }))}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
              />
              <button
                type="submit"
                style={{ padding: "10px", background: "#3b82f6", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer" }}
              >
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Kanban View */}
      {viewMode === "kanban" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {STATUSES.map(status => (
            <div
              key={status}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, status)}
              style={{ background: "#f8fafc", border: "2px dashed #e2e8f0", borderRadius: "12px", padding: "16px", minHeight: "500px", display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <h3>{status} ({filteredTickets.filter(t => t.status === status).length})</h3>
              {filteredTickets.filter(t => t.status === status).map(ticket => (
                <div
                  key={ticket.id}
                  draggable
                  onDragStart={e => handleDragStart(e, ticket.id)}
                  onClick={() => setSelectedTicket(ticket)}
                  style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", cursor: "grab" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{ticket.id}</span>
                    <span style={{ background: PRIORITIES[ticket.priority], color: "#fff", padding: "2px 6px", borderRadius: "4px" }}>{ticket.priority}</span>
                  </div>
                  <p>{ticket.title}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b" }}>
                    <span>{ticket.assignee}</span>
                    <span>{ticket.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assignee</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} onClick={() => setSelectedTicket(ticket)} style={{ cursor: "pointer" }}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.assignee}</td>
                <td>{ticket.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Ticket Modal */}
      {selectedTicket && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
          onClick={() => setSelectedTicket(null)}
        >
          <div style={{ background: "#fff", borderRadius: "12px", padding: "28px", maxWidth: "500px", width: "90%" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{selectedTicket.id}</span>
              <button onClick={() => setSelectedTicket(null)}><X size={20} /></button>
            </div>
            <h2>{selectedTicket.title}</h2>
            <p>Assignee: {selectedTicket.assignee}</p>
            <p>Status: {selectedTicket.status}</p>
            <p>Priority: {selectedTicket.priority}</p>
            <p>Date: {selectedTicket.date}</p>
          </div>
        </div>
      )}
    </div>
  );
}
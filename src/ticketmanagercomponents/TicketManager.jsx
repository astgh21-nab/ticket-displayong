import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";
import { LogOut } from "lucide-react";
import "./dashboard.css";

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: "⊞" },
  { path: "/tickets", label: "Tickets", icon: "◈" },
  { path: "/projects", label: "Projects", icon: "◉" },
];

const STATUS_COLORS = {
  Open: { bg: "#e8f4fd", color: "#0B3D91", dot: "#0B3D91" },
  "In Progress": { bg: "#fff8e1", color: "#b45309", dot: "#f59e0b" },
  Done: { bg: "#e6f9f0", color: "#065f46", dot: "#10b981" },
};

const TICKET_TYPES = [
  { id: "userAccess", title: "User Access", desc: "New users or access requests", icon: "👤" },
  { id: "roleChange", title: "Role Change", desc: "Change user roles", icon: "🔄" },
  { id: "expense", title: "Expense", desc: "Expense reimbursement requests", icon: "💳" },
  { id: "paymentInquiry", title: "Payment Inquiry", desc: "Questions about payments", icon: "💰" },
  { id: "hardware", title: "Hardware", desc: "Laptop, monitor, devices", icon: "💻" },
  { id: "softwareLicense", title: "Software License", desc: "Software license requests", icon: "📦" },
  { id: "compliance", title: "Compliance", desc: "Internal compliance requests", icon: "📋" },
  { id: "facilities", title: "Facilities", desc: "Office and equipment requests", icon: "🏢" },
  { id: "clientComplaint", title: "Client Complaint", desc: "Customer complaints or issues", icon: "📣" },
  { id: "incident", title: "Incident", desc: "Technical incidents reporting", icon: "⚡" },
];

export default function TicketManager() {
  const navigate = useNavigate();
  const [activeTicket, setActiveTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("create");
  const [submittedTickets, setSubmittedTickets] = useState([
    { id: "TKT-001", type: "User Access", summary: "New hire onboarding access", status: "Open", date: "2025-03-20" },
    { id: "TKT-002", type: "Incident", summary: "Production server down", status: "In Progress", date: "2025-03-22" },
    { id: "TKT-003", type: "Hardware", summary: "Monitor replacement for John", status: "Done", date: "2025-03-25" },
    { id: "TKT-004", type: "Expense", summary: "Team dinner reimbursement", status: "Open", date: "2025-03-27" },
  ]);
  const [statusFilter, setStatusFilter] = useState("All");

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("rememberedUsername");
    sessionStorage.clear();
    
    // Navigate to login page
    navigate("/login");
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const newTicket = {
      id: `TKT-${String(submittedTickets.length + 1).padStart(3, "0")}`,
      type: type.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      summary: data.title || data.fullName || data.request || data.requestType || data.softwareName || data.clientName || "New ticket",
      status: "Open",
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await apiService.createTicket({ type, ...data });
      setSubmittedTickets(prev => [newTicket, ...prev]);
      alert(`Ticket ${newTicket.id} submitted successfully!`);
      setActiveTicket(null);
    } catch (err) {
      setSubmittedTickets(prev => [newTicket, ...prev]);
      setActiveTicket(null);
    }
  };

  const updateStatus = (id, newStatus) => {
    setSubmittedTickets(prev =>
      prev.map(t => t.id === id ? { ...t, status: newStatus } : t)
    );
  };

  const renderForm = (id) => {
    switch (id) {
      case "userAccess":
        return (
          <form className="ticket-form" onSubmit={(e) => handleSubmit(e, "USER_ACCESS")}>
            <label className="form-label">Full Name<input name="fullName" placeholder="Full Name" required /></label>
            <label className="form-label">Department<input name="department" placeholder="Department" required /></label>
            <label className="form-label">Access Level<select name="accessLevel"><option>Read Only</option><option>Editor</option><option>Admin</option></select></label>
            <label className="form-label">Urgency<select name="urgency"><option>Low</option><option>Medium</option><option>High</option></select></label>
            <label className="form-label">Justification<textarea name="justification" placeholder="Justification" required /></label>
            <button type="submit">Submit Ticket</button>
          </form>
        );
      case "roleChange":
        return (
          <form className="ticket-form" onSubmit={(e) => handleSubmit(e, "ROLE_CHANGE")}>
            <label className="form-label">User<input name="user" placeholder="User" required /></label>
            <label className="form-label">Current Role<input name="currentRole" placeholder="Current Role" required /></label>
            <label className="form-label">New Role<input name="newRole" placeholder="New Role" required /></label>
            <label className="form-label">Reason<textarea name="reason" placeholder="Reason" required /></label>
            <button type="submit">Submit Ticket</button>
          </form>
        );
      case "expense":
        return (
          <form className="ticket-form" onSubmit={(e) => handleSubmit(e, "EXPENSE")}>
            <label className="form-label">Employee Name<input name="employee" placeholder="Employee Name" required /></label>
            <label className="form-label">Amount<input name="amount" type="number" placeholder="Amount" required /></label>
            <label className="form-label">Expense Type<select name="expenseType"><option>Travel</option><option>Supplies</option><option>Other</option></select></label>
            <label className="form-label">Description<textarea name="description" placeholder="Description" required /></label>
            <button type="submit">Submit Ticket</button>
          </form>
        );
      case "paymentInquiry":
        return (
          <form className="ticket-form" onSubmit={(e) => handleSubmit(e, "PAYMENT_INQUIRY")}>
            <label className="form-label">Invoice ID<input name="invoiceId" placeholder="Invoice ID" /></label>
            <label className="form-label">Date<input name="date" type="date" /></label>
            <label className="form-label">Question<textarea name="question" placeholder="Your question" required /></label>
            <button type="submit">Submit Ticket</button>
          </form>
        );
      case "hardware":
        return (
          <form className="ticket-form" onSubmit={(e) => handleSubmit(e, "HARDWARE")}>
            <label className="form-label">Device Type<input name="deviceType" placeholder="Device Type (Laptop, Monitor...)" required /></label>
            <label className="form-label">Urgency<select name="urgency"><option>Low</option><option>Medium</option><option>High</option></select></label>
            <label className="form-label">Details<textarea name="details" placeholder="Details" required /></label>
            <button type="submit">Submit Ticket</button>
          </form>
        );
      case "softwareLicense":
        return (
          <form className="ticket-form" onSubmit={(e) => handleSubmit(e, "SOFTWARE_LICENSE")}>
            <label className="form-label">Software Name<input name="softwareName" placeholder="Software Name" required /></label>
            <label className="form-label">License Type<input name="licenseType" placeholder="License Type" /></label>
            <label className="form-label">Reason<textarea name="reason" placeholder="Reason" required /></label>
            <button type="submit">Submit Ticket</button>
          </form>
        );
      case "compliance":
        return (
          <form className="ticket-form" onSubmit={(e) => handleSubmit(e, "COMPLIANCE")}>
            <label className="form-label">Request Type<input name="requestType" placeholder="Request Type" required /></label>
            <label className="form-label">Details<textarea name="details" placeholder="Details" required /></label>
            <button type="submit">Submit Ticket</button>
          </form>
        );
      case "facilities":
        return (
          <form className="ticket-form" onSubmit={(e) => handleSubmit(e, "FACILITIES")}>
            <label className="form-label">Request<input name="request" placeholder="Request (Chair, Desk...)" required /></label>
            <label className="form-label">Details<textarea name="details" placeholder="Details" required /></label>
            <button type="submit">Submit Ticket</button>
          </form>
        );
      case "clientComplaint":
        return (
          <form className="ticket-form" onSubmit={(e) => handleSubmit(e, "CLIENT_COMPLAINT")}>
            <label className="form-label">Client Name<input name="clientName" placeholder="Client Name" required /></label>
            <label className="form-label">Complaint<textarea name="complaint" placeholder="Complaint details" required /></label>
            <button type="submit">Submit Ticket</button>
          </form>
        );
      case "incident":
        return (
          <form className="ticket-form" onSubmit={(e) => handleSubmit(e, "INCIDENT")}>
            <label className="form-label">Incident Title<input name="title" placeholder="Incident Title" required /></label>
            <label className="form-label">Severity<select name="severity"><option>Low</option><option>Medium</option><option>High</option></select></label>
            <label className="form-label">Description<textarea name="description" placeholder="Description" required /></label>
            <button type="submit">Submit Ticket</button>
          </form>
        );
      default:
        return <p>Form not found</p>;
    }
  };

  const filteredTickets = TICKET_TYPES.filter(ticket =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubmitted = submittedTickets.filter(t =>
    statusFilter === "All" ? true : t.status === statusFilter
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">A</span>
          <span className="sidebar-name">ASNADA</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.path}
              className={`sidebar-link ${window.location.pathname === item.path ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-view-toggle">
          <p className="sidebar-section-label">View</p>
          <button
            className={`sidebar-link ${view === "create" ? "active" : ""}`}
            onClick={() => { setView("create"); setActiveTicket(null); }}
          >
            <span className="sidebar-icon">＋</span>
            <span>Create Ticket</span>
          </button>
          <button
            className={`sidebar-link ${view === "list" ? "active" : ""}`}
            onClick={() => { setView("list"); setActiveTicket(null); }}
          >
            <span className="sidebar-icon">≡</span>
            <span>All Tickets</span>
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-avatar">AN</div>
          <div style={{ flex: 1 }}>
            <p className="sidebar-user-name">Astghik Naboyan</p>
            <p className="sidebar-user-role">Admin</p>
          </div>
          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "8px 12px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "10px",
              color: "#ef4444",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500",
              transition: "all 0.2s ease",
              width: "100%",
              marginTop: "8px"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#ef4444";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#ef4444";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
              e.currentTarget.style.color = "#ef4444";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="main-content">
        {view === "create" && !activeTicket && (
          <>
            <div className="topbar">
              <div className="topbar-title">ASNADA</div>
              <p className="topbar-subtitle">Resolve your requests quickly and efficiently</p>
              <div className="search-bar topbar-search">
                <input
                  type="text"
                  placeholder="Search ticket types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="cards">
              {filteredTickets.map(ticket => (
                <div key={ticket.id} className="card" onClick={() => setActiveTicket(ticket.id)}>
                  <div className="card-icon">{ticket.icon}</div>
                  <h3>{ticket.title}</h3>
                  <p>{ticket.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {view === "create" && activeTicket && (
          <div className="form-container">
            <span className="back-btn" onClick={() => setActiveTicket(null)}>← Back</span>
            <h2 className="form-title">
              {TICKET_TYPES.find(t => t.id === activeTicket)?.icon}{" "}
              {TICKET_TYPES.find(t => t.id === activeTicket)?.title}
            </h2>
            {renderForm(activeTicket)}
          </div>
        )}

        {view === "list" && (
          <div className="ticket-list-view">
            <div className="list-header">
              <h2>All Tickets</h2>
              <div className="status-filters">
                {["All", "Open", "In Progress", "Done"].map(s => (
                  <button
                    key={s}
                    className={`filter-btn ${statusFilter === s ? "active" : ""}`}
                    onClick={() => setStatusFilter(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="ticket-table-wrapper">
              <table className="ticket-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Summary</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmitted.map(ticket => {
                    const sc = STATUS_COLORS[ticket.status];
                    return (
                      <tr key={ticket.id}>
                        <td className="ticket-id">{ticket.id}</td>
                        <td>{ticket.type}</td>
                        <td className="ticket-summary">{ticket.summary}</td>
                        <td className="ticket-date">{ticket.date}</td>
                        <td>
                          <span className="status-badge" style={{ background: sc.bg, color: sc.color }}>
                            <span className="status-dot" style={{ background: sc.dot }} />
                            {ticket.status}
                          </span>
                        </td>
                        <td>
                          <select
                            className="status-select"
                            value={ticket.status}
                            onChange={(e) => updateStatus(ticket.id, e.target.value)}
                          >
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Done</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredSubmitted.length === 0 && (
                <p className="empty-state">No tickets found for this status.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
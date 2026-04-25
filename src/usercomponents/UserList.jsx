import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";
import { Users, Plus, Edit, Trash2, Eye, Search, ArrowLeft, LayoutDashboard, UserPlus, Shield, Mail, Calendar, MoreVertical, RefreshCw, Filter, X, ChevronRight, LogOut } from "lucide-react";

function UserList() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [animation, setAnimation] = useState("");
    const navigate = useNavigate();

    const getUsers = async () => {
        setLoading(true);
        try {
            const data = await apiService.getAllUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Clear all stored authentication data
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("token");
        sessionStorage.clear();
        
        // Navigate to login page
        navigate("/login");
    };

    useEffect(() => {
        getUsers();
        setAnimation("fade-in");
    }, []);

    useEffect(() => {
        let result = users;
        if (searchQuery) {
            result = result.filter(user => 
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
        if (roleFilter !== "All") {
            result = result.filter(user => user.userRole === roleFilter);
        }
        setFilteredUsers(result);
    }, [searchQuery, roleFilter, users]);

    const getRoleBadge = (role) => {
        switch(role) {
            case "ADMIN":
                return <span style={{ background: "#fef2f2", color: "#dc2626", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px" }}><Shield size={12} /> ADMIN</span>;
            case "TICKET_MANAGER":
                return <span style={{ background: "#eff6ff", color: "#2563eb", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px" }}>📋 MANAGER</span>;
            case "TICKET_HANDLER":
                return <span style={{ background: "#f0fdf4", color: "#059669", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px" }}>🎫 HANDLER</span>;
            default:
                return <span style={{ background: "#f1f5f9", color: "#64748b", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>{role}</span>;
        }
    };

    const stats = {
        total: users.length,
        admins: users.filter(u => u.userRole === "ADMIN").length,
        managers: users.filter(u => u.userRole === "TICKET_MANAGER").length,
        handlers: users.filter(u => u.userRole === "TICKET_HANDLER").length,
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f0f4fa",
            padding: "28px 40px"
        }}>
            
            {/* Header */}
            <div style={{ marginBottom: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "52px", height: "52px", background: "linear-gradient(135deg, #0B3D91, #1a52b8)", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(11,61,145,0.2)" }}>
                            <Users size={28} color="#fff" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0a2540", margin: 0 }}>User Management</h1>
                            <p style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>Manage system users and their roles</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        {/* Sign Out Button */}
                        <button
                            onClick={handleLogout}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "12px 24px",
                                background: "#fff",
                                border: "1px solid #fee2e2",
                                borderRadius: "12px",
                                color: "#dc2626",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                            }}
                            onMouseEnter={e => { 
                                e.currentTarget.style.background = "#dc2626"; 
                                e.currentTarget.style.color = "#fff"; 
                                e.currentTarget.style.borderColor = "#dc2626";
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 8px 20px rgba(220,38,38,0.3)";
                            }}
                            onMouseLeave={e => { 
                                e.currentTarget.style.background = "#fff"; 
                                e.currentTarget.style.color = "#dc2626"; 
                                e.currentTarget.style.borderColor = "#fee2e2";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                            }}
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                        {/* Add User Button */}
                        <button
                            onClick={() => navigate("/add-user")}
                            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "linear-gradient(135deg, #10b981, #059669)", border: "none", borderRadius: "12px", color: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "14px", transition: "all 0.3s ease", boxShadow: "0 4px 15px rgba(16,185,129,0.3)" }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(16,185,129,0.4)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(16,185,129,0.3)"; }}
                        >
                            <UserPlus size={18} /> Add New User
                        </button>
                    </div>
                </div>

                {/* Welcome Banner */}
                <div style={{ background: "linear-gradient(135deg, #0B3D91, #1a52b8)", borderRadius: "20px", padding: "20px 28px", color: "#fff", position: "relative", overflow: "hidden", marginTop: "16px" }}>
                    <div style={{ position: "absolute", right: "-20px", top: "-20px", opacity: 0.1 }}><Users size={120} /></div>
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "6px" }}>👥 User Administration Panel</h2>
                        <p style={{ opacity: 0.9, fontSize: "13px" }}>Total {stats.total} users • {stats.admins} Admins • {stats.managers} Managers • {stats.handlers} Handlers</p>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "28px" }}>
                {[
                    { icon: <Users size={22} />, label: "Total Users", value: stats.total, color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
                    { icon: <Shield size={22} />, label: "Admins", value: stats.admins, color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
                    { icon: <LayoutDashboard size={22} />, label: "Managers", value: stats.managers, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
                    { icon: <Eye size={22} />, label: "Handlers", value: stats.handlers, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
                ].map((stat, idx) => (
                    <div key={idx} style={{ background: "#fff", borderRadius: "16px", padding: "18px", border: "1px solid #e9eef3", transition: "all 0.3s ease", animation: `slideUp 0.4s ease-out ${idx * 0.1}s both` }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)"; }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ width: "48px", height: "48px", background: stat.bg, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>{stat.icon}</div>
                            <div><div style={{ fontSize: "28px", fontWeight: "800", color: "#0a2540" }}>{stat.value}</div><div style={{ fontSize: "12px", color: "#64748b" }}>{stat.label}</div></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search & Filter Bar */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "16px 20px", marginBottom: "24px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", background: "#f8fafc", padding: "12px 18px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                        <Search size={18} style={{ color: "#94a3b8" }} />
                        <input
                            placeholder="Search by username or email..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "14px" }}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>✖</button>
                        )}
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)} style={{ padding: "12px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "500" }}><Filter size={16} /> Filters</button>
                    <button onClick={getUsers} style={{ padding: "12px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "500" }}><RefreshCw size={16} /> Refresh</button>
                </div>
                {showFilters && (
                    <div style={{ display: "flex", gap: "16px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #e2e8f0", flexWrap: "wrap" }}>
                        <div>
                            <label style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px", display: "block" }}>Role Filter</label>
                            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff" }}>
                                <option>All</option>
                                <option>ADMIN</option>
                                <option>TICKET_MANAGER</option>
                                <option>TICKET_HANDLER</option>
                            </select>
                        </div>
                        {(roleFilter !== "All" || searchQuery) && (
                            <button onClick={() => { setRoleFilter("All"); setSearchQuery(""); }} style={{ padding: "8px 20px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", alignSelf: "flex-end" }}>Clear Filters</button>
                        )}
                    </div>
                )}
            </div>

            {/* Users Table */}
            <div className={animation} style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ padding: "18px 24px", borderBottom: "1px solid #e2e8f0", background: "linear-gradient(135deg, #f8fafc, #fff)" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0a2540" }}>👥 System Users</h3>
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>Manage user accounts and permissions</p>
                </div>
                {loading ? (
                    <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>Loading users...</div>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>ID</th>
                                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>User</th>
                                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>Email</th>
                                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>Role</th>
                                    <th style={{ padding: "14px 20px", textAlign: "center", fontSize: "12px", fontWeight: "600", color: "#64748b" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, idx) => (
                                    <tr key={user.id} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.2s", animation: `fadeInRow 0.3s ease-out ${idx * 0.05}s both` }} onMouseEnter={e => e.currentTarget.style.background = "#fafcff"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                                        <td style={{ padding: "14px 20px", fontSize: "13px", fontFamily: "monospace", color: "#3b82f6", fontWeight: "500" }}>{user.id}</td>
                                        <td style={{ padding: "14px 20px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #e0e7ff, #c7d2fe)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "600", color: "#0B3D91" }}>{user.username?.charAt(0).toUpperCase()}</div>
                                                <div><div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>{user.username}</div><div style={{ fontSize: "11px", color: "#64748b" }}>ID: {user.id}</div></div>
                                            </div>
                                        </td>
                                        <td style={{ padding: "14px 20px", fontSize: "13px", color: "#475569" }}>{user.email || "Not provided"}</td>
                                        <td style={{ padding: "14px 20px" }}>{getRoleBadge(user.userRole)}</td>
                                        <td style={{ padding: "14px 20px", textAlign: "center" }}>
                                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                                <button onClick={() => navigate(`/update-user/${user.id}`)} style={{ padding: "6px 14px", background: "#eef2ff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "12px", color: "#0B3D91", fontWeight: "500", display: "flex", alignItems: "center", gap: "4px", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "#0B3D91"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = "#eef2ff"; e.currentTarget.style.color = "#0B3D91"; }}><Edit size={14} /> Edit</button>
                                                <button onClick={() => navigate(`/delete-user/${user.id}`)} style={{ padding: "6px 14px", background: "#fef2f2", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "12px", color: "#dc2626", fontWeight: "500", display: "flex", alignItems: "center", gap: "4px", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#dc2626"; }}><Trash2 size={14} /> Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && (
                            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
                                <Users size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
                                <p>No users found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInRow { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
}

export default UserList;
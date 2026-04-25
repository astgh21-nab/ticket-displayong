import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserPlus, ArrowLeft, LayoutDashboard } from "lucide-react";

function User() {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f0f4fa",
            padding: "28px 40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{ textAlign: "center" }}>
                <div style={{ background: "#fff", borderRadius: "32px", padding: "48px", border: "1px solid #e2e8f0", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", maxWidth: "500px" }}>
                    <div style={{ width: "80px", height: "80px", background: "linear-gradient(135deg, #0B3D91, #1a52b8)", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 10px 25px rgba(11,61,145,0.3)" }}><Users size={40} color="#fff" /></div>
                    <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0a2540", marginBottom: "12px" }}>User Management</h1>
                    <p style={{ color: "#64748b", marginBottom: "32px" }}>Manage system users, roles, and permissions</p>
                    
                    <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                        <button onClick={() => navigate("/users")} style={{ padding: "14px 32px", background: "linear-gradient(135deg, #0B3D91, #1a52b8)", border: "none", borderRadius: "12px", color: "#fff", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(11,61,145,0.3)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}><Users size={18} /> View Users</button>
                        <button onClick={() => navigate("/add-user")} style={{ padding: "14px 32px", background: "#fff", border: "2px solid #0B3D91", borderRadius: "12px", color: "#0B3D91", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "#0B3D91"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#0B3D91"; }}><UserPlus size={18} /> Add User</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
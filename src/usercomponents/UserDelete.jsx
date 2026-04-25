import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";
import { Trash2, ArrowLeft, AlertTriangle, X, Check } from "lucide-react";

function UserDelete() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const deleteUser = async () => {
        setLoading(true);
        try {
            await apiService.deleteUserById(id);
            navigate("/users");
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f0f4fa",
            padding: "28px 40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{ maxWidth: "480px", width: "100%" }}>
                <button onClick={() => navigate("/users")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: "#0B3D91", fontSize: "14px", fontWeight: "500", marginBottom: "24px" }}><ArrowLeft size={18} /> Back to Users</button>

                <div style={{ background: "#fff", borderRadius: "24px", padding: "36px", textAlign: "center", border: "1px solid #e2e8f0", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
                    <div style={{ width: "70px", height: "70px", background: "#fef2f2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><Trash2 size={32} color="#dc2626" /></div>
                    <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#0a2540", marginBottom: "12px" }}>Delete User</h2>
                    <p style={{ color: "#64748b", marginBottom: "24px" }}>Are you sure you want to delete user <strong>#{id}</strong>? This action cannot be undone.</p>
                    
                    <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                        <button onClick={deleteUser} disabled={loading} style={{ padding: "12px 32px", background: "#dc2626", border: "none", borderRadius: "12px", color: "#fff", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }} onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#b91c1c"; }} onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#dc2626"; }}>{loading ? "Deleting..." : <><Trash2 size={16} /> Yes, Delete</>}</button>
                        <button onClick={() => navigate("/users")} style={{ padding: "12px 32px", background: "#f1f5f9", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px" }} onMouseEnter={e => e.currentTarget.style.background = "#e2e8f0"} onMouseLeave={e => e.currentTarget.style.background = "#f1f5f9"}><X size={16} /> Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDelete;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";
import { Edit, ArrowLeft, Shield, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, Save } from "lucide-react";

function UserUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setUserRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        apiService.getUserById(id).then(user => {
            setUserName(user.username || "");
            setEmail(user.email || "");
            setUserRole(user.userRole || "");
        }).catch(err => console.error(err));
    }, [id]);

    const updateUser = async () => {
        setLoading(true);
        setError("");
        
        const user = { username, email, password: password || undefined, userRole };
        
        try {
            await apiService.updateUser(id, user);
            setSuccess(true);
            setTimeout(() => navigate("/users"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update user");
        } finally {
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
            <div style={{ maxWidth: "520px", width: "100%" }}>
                <div style={{ marginBottom: "24px" }}>
                    <button onClick={() => navigate("/users")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: "#0B3D91", fontSize: "14px", fontWeight: "500", marginBottom: "16px" }}><ArrowLeft size={18} /> Back to Users</button>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "52px", height: "52px", background: "linear-gradient(135deg, #3b82f6, #2563eb)", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(59,130,246,0.2)" }}><Edit size={28} color="#fff" /></div>
                        <div><h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0a2540", margin: 0 }}>Update User</h1><p style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>Edit user ID: {id}</p></div>
                    </div>
                </div>

                <div style={{ background: "#fff", borderRadius: "24px", padding: "32px", border: "1px solid #e2e8f0", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
                    {error && <div style={{ background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "12px", padding: "12px 16px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}><AlertCircle size={18} color="#ef4444" /><span style={{ color: "#dc2626", fontSize: "13px" }}>{error}</span></div>}
                    {success && <div style={{ background: "#ecfdf5", border: "1px solid #d1fae5", borderRadius: "12px", padding: "12px 16px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}><CheckCircle size={18} color="#10b981" /><span style={{ color: "#059669", fontSize: "13px" }}>User updated successfully! Redirecting...</span></div>}

                    <div style={{ marginBottom: "20px" }}><label style={{ display: "block", color: "#475569", fontSize: "13px", fontWeight: "500", marginBottom: "8px" }}><User size={14} style={{ display: "inline", marginRight: "6px" }} /> Username</label><input type="text" value={username} onChange={e => setUserName(e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} /></div>
                    <div style={{ marginBottom: "20px" }}><label style={{ display: "block", color: "#475569", fontSize: "13px", fontWeight: "500", marginBottom: "8px" }}><Mail size={14} style={{ display: "inline", marginRight: "6px" }} /> Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="user@example.com" style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} /></div>
                    <div style={{ marginBottom: "20px" }}><label style={{ display: "block", color: "#475569", fontSize: "13px", fontWeight: "500", marginBottom: "8px" }}><Lock size={14} style={{ display: "inline", marginRight: "6px" }} /> New Password (leave empty to keep current)</label>
                        <div style={{ position: "relative" }}><input type={showPassword ? "text" : "password"} placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: "14px 16px", paddingRight: "45px", borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none" }} onFocus={e => e.target.style.borderColor = "#3b82f6"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                        </div>
                    </div>
                    <div style={{ marginBottom: "28px" }}><label style={{ display: "block", color: "#475569", fontSize: "13px", fontWeight: "500", marginBottom: "8px" }}><Shield size={14} style={{ display: "inline", marginRight: "6px" }} /> User Role</label>
                        <select value={userRole} onChange={e => setUserRole(e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none" }}>
                            <option value="">Select Role</option>
                            <option value="ADMIN">👑 ADMIN</option>
                            <option value="TICKET_MANAGER">📋 TICKET_MANAGER</option>
                            <option value="TICKET_HANDLER">🎫 TICKET_HANDLER</option>
                        </select>
                    </div>

                    <div style={{ display: "flex", gap: "16px" }}>
                        <button onClick={updateUser} disabled={loading} style={{ flex: 1, padding: "14px", background: "linear-gradient(135deg, #3b82f6, #2563eb)", border: "none", borderRadius: "12px", color: "#fff", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }} onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { if (!loading) e.currentTarget.style.transform = "translateY(0)"; }}>{loading ? "Updating..." : <><Save size={18} /> Update User</>}</button>
                        <button onClick={() => navigate("/users")} style={{ padding: "14px 28px", background: "#f1f5f9", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "500" }}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserUpdate;
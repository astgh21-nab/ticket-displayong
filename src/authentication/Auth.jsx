import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";
import { Mail, Lock, Eye, EyeOff, LogIn, User, Shield, Sparkles, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Load remembered username
        const remembered = localStorage.getItem("rememberedUsername");
        if (remembered) {
            setUsername(remembered);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async () => {
        console.log("Login clicked");
        console.log("Username:", username);
        console.log("Password:", password);

        if (!username || !password) {
            setError("Username and password are required");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const data = await apiService.login({ username, password });
            console.log("Login successful, user data:", data.role);
            
            if (rememberMe) {
                localStorage.setItem("rememberedUsername", username);
            } else {
                localStorage.removeItem("rememberedUsername");
            }
            
            // Store user data in localStorage for later use
            localStorage.setItem("userRole", data.role);
            localStorage.setItem("userId", data.id);
            
            if (data.role === "ADMIN") {
                navigate("/users");
            } else if (data.role === "TICKET_MANAGER") {
                navigate(`/ticketmanager/${data.id}`);
            } else if (data.role === "TICKET_HANDLER") {
                // Changed: navigate to /tickethandler without ID
                navigate("/tickethandler");
            } else {
                navigate(`/tickethandler/${data.id}`);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Animated Background Elements */}
            <div style={{ position: "absolute", top: "-200px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(59,130,246,0.3), transparent)", borderRadius: "50%", animation: "float 20s infinite" }} />
            <div style={{ position: "absolute", bottom: "-150px", left: "-100px", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(139,92,246,0.25), transparent)", borderRadius: "50%", animation: "float 25s infinite reverse" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(16,185,129,0.08), transparent)", borderRadius: "50%", animation: "pulse 15s infinite", transform: "translate(-50%, -50%)" }} />
            
            {/* Floating Orbs */}
            <div style={{ position: "absolute", top: "20%", left: "10%", width: "8px", height: "8px", background: "#3b82f6", borderRadius: "50%", animation: "floatOrb 12s infinite", opacity: 0.6 }} />
            <div style={{ position: "absolute", bottom: "30%", right: "15%", width: "12px", height: "12px", background: "#10b981", borderRadius: "50%", animation: "floatOrb 15s infinite 2s", opacity: 0.6 }} />
            <div style={{ position: "absolute", top: "60%", left: "20%", width: "6px", height: "6px", background: "#8b5cf6", borderRadius: "50%", animation: "floatOrb 10s infinite 1s", opacity: 0.5 }} />
            <div style={{ position: "absolute", bottom: "15%", left: "30%", width: "10px", height: "10px", background: "#f59e0b", borderRadius: "50%", animation: "floatOrb 18s infinite 3s", opacity: 0.4 }} />

            {/* Main Card */}
            <div style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                borderRadius: "32px",
                padding: "40px",
                width: "100%",
                maxWidth: "440px",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                animation: "slideUp 0.6s ease-out",
                position: "relative",
                zIndex: 1
            }}>
                
                {/* Logo & Header */}
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div style={{
                        width: "70px",
                        height: "70px",
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                        boxShadow: "0 10px 30px rgba(59,130,246,0.4)"
                    }}>
                        <Sparkles size={36} color="#fff" />
                    </div>
                    <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>ASNADA</h1>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Ticket Management System</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: "rgba(239,68,68,0.15)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        borderRadius: "12px",
                        padding: "12px 16px",
                        marginBottom: "24px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <AlertCircle size={18} color="#ef4444" />
                        <span style={{ color: "#ef4444", fontSize: "13px" }}>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    {/* Username Field */}
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", color: "rgba(255,255,255,0.8)", fontSize: "13px", marginBottom: "8px", fontWeight: "500" }}>
                            <User size={14} style={{ display: "inline", marginRight: "6px" }} /> Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{
                                width: "100%",
                                padding: "14px 16px",
                                background: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "14px",
                                color: "#fff",
                                fontSize: "14px",
                                outline: "none",
                                transition: "all 0.2s"
                            }}
                            onFocus={e => e.target.style.borderColor = "#3b82f6"}
                            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                        />
                    </div>

                    {/* Password Field */}
                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", color: "rgba(255,255,255,0.8)", fontSize: "13px", marginBottom: "8px", fontWeight: "500" }}>
                            <Lock size={14} style={{ display: "inline", marginRight: "6px" }} /> Password
                        </label>
                        <div style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    paddingRight: "45px",
                                    background: "rgba(255,255,255,0.1)",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    borderRadius: "14px",
                                    color: "#fff",
                                    fontSize: "14px",
                                    outline: "none",
                                    transition: "all 0.2s"
                                }}
                                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "14px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "rgba(255,255,255,0.6)"
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={{ width: "16px", height: "16px", cursor: "pointer" }}
                            />
                            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>Remember me</span>
                        </label>
                        <a href="#" style={{ color: "#3b82f6", fontSize: "13px", textDecoration: "none" }}>Forgot Password?</a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={!username || !password || loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            border: "none",
                            borderRadius: "40px",
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: (!username || !password || loading) ? "not-allowed" : "pointer",
                            opacity: (!username || !password || loading) ? 0.6 : 1,
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            marginBottom: "20px"
                        }}
                        onMouseEnter={e => { if (username && password && !loading) e.currentTarget.style.transform = "translateY(-2px)" }}
                        onMouseLeave={e => { if (username && password && !loading) e.currentTarget.style.transform = "translateY(0)" }}
                    >
                        {loading ? (
                            <div style={{ width: "20px", height: "20px", border: "2px solid #fff", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        ) : (
                            <>
                                Login
                                <LogIn size={18} />
                            </>
                        )}
                    </button>
                </form>

                {/* Features Section */}
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>
                            <Shield size={14} /> Secure
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>
                            <CheckCircle size={14} /> 24/7 Support
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>
                            <Sparkles size={14} /> Fast Response
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, -20px) scale(1.1); }
                }
                @keyframes floatOrb {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(30px, -30px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default Auth;

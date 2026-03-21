import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); // ✅ make sure password state exists
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
            console.log("Login successful, user data:",  data.role);
            data.role === "ADMIN" ? navigate("/users") : data.role === "TICKET_MANAGER" ? navigate(`/ticketmanager/${data.id}`) : navigate(`/tickethandler/${data.id}`);
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
        <div style={{ maxWidth: "300px", margin: "50px auto", textAlign: "center" }}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />

            <button
                onClick={handleLogin}
                disabled={!username || !password || loading}
                style={{ width: "100%", padding: "8px" }}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    );
}

export default Auth;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function Auth() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = () => {

        const authData = {
            username: username,
            password: password
        };

        apiService.login(authData).then(() => {
            navigate("/dashboard");
        });

    };

    return (
        <div>

            <h2>Login</h2>

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <br/>

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br/>

            <button onClick={login}>
                Login
            </button>

        </div>
    );
}

export default Auth;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function AdminAdd() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const addAdmin = () => {

        const admin = {
            name: name,
            email: email
        };

        apiService.createAdmin(admin).then(() => {
            navigate("/admins");
        });

    };

    return (
        <div>

            <h2>Add Admin</h2>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br/>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br/>

            <button onClick={addAdmin}>
                Create
            </button>

        </div>
    );
}

export default AdminAdd;
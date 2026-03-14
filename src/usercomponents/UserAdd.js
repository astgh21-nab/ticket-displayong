import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function UserAdd() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const addUser = () => {

        const user = {
            name: name,
            email: email
        };

        apiService.createUser(user).then(() => {
            navigate("/users");
        });

    };

    return (
        <div>

            <h2>Add User</h2>

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

            <button onClick={addUser}>
                Create
            </button>

        </div>
    );
}

export default UserAdd;
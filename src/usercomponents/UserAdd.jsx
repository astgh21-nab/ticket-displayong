import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import apiService from "../apiservice/apiService";

function UserAdd() {

    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setUserRole] = useState("");

    const updateUser = () => {

        const user = {
            username: username,
            password: password,
            userRole: userRole
        };

        apiService.createUser( user).then(() => {
            navigate("/users");
        });

    };

    return (
        <div>

            <h2>Add User</h2>

            <input
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
            />

            <select onChange={(e) => setUserRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="TICKET_MANAGER">TICKET_MANAGER</option>
                <option value="TICKET_HANDLER">TICKET_HANDLER</option>
            </select>

            <br/>

            <button onClick={updateUser}>
                Add
            </button>

        </div>

    );
}

export default UserAdd;
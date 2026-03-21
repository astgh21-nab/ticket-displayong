import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function UserUpdate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setUserRole] = useState("");

    useEffect(() => {

        apiService.getUserById(id).then(user => {
            setUserName(user.username);
        });

    }, [id]);

    const updateUser = () => {

        const user = {
            username: username,
            password: password,
            userRole: userRole
        };

        apiService.updateUser(id, user).then(() => {
            navigate("/users");
        });

    };

    return (
        <div>

            <h2>Update User</h2>

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
                Update
            </button>

        </div>

    );
}

export default UserUpdate;
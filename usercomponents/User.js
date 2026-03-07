import React from "react";
import { useNavigate } from "react-router-dom";

function User() {

    const navigate = useNavigate();

    return (
        <div>

            <h2>User Management</h2>

            <button onClick={() => navigate("/users")}>
                View Users
            </button>

            <button onClick={() => navigate("/add-user")}>
                Add User
            </button>

        </div>
    );
}

export default User;
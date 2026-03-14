import React from "react";
import { useNavigate } from "react-router-dom";

function Admin() {

    const navigate = useNavigate();

    return (
        <div>

            <h2>Admin Management</h2>

            <button onClick={() => navigate("/admins")}>
                View Admins
            </button>

            <button onClick={() => navigate("/add-admin")}>
                Add Admin
            </button>

        </div>
    );
}

export default Admin;
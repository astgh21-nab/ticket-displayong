import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function AdminDelete() {

    const { id } = useParams();
    const navigate = useNavigate();

    const deleteAdmin = () => {

        apiService.deleteAdmin(id).then(() => {
            navigate("/admins");
        });

    };

    return (
        <div>

            <h2>Delete Admin</h2>

            <p>Are you sure you want to delete this admin?</p>

            <button onClick={deleteAdmin}>
                Delete
            </button>

        </div>
    );
}

export default AdminDelete;
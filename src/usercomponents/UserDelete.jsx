import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function UserDelete() {

    const { id } = useParams();
    const navigate = useNavigate();

    const deleteUser = () => {

      apiService.deleteUserById(id).then(() => {
        navigate("/users");
    });

    };

    return (
        <div>

            <h2>Delete User</h2>

            <p>Are you sure you want to delete this user?</p>

            <button onClick={deleteUser}>
                Delete
            </button>

        </div>
    );
}

export default UserDelete;
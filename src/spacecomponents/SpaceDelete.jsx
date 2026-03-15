import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function SpaceDelete() {

    const { id } = useParams();
    const navigate = useNavigate();

    const deleteSpace = () => {

       apiService.deleteSpaceById(id).then(() => {
        navigate("/spaces");
    });

    };

    return (
        <div>

            <h2>Delete Space</h2>

            <p>Are you sure you want to delete this space?</p>

            <button onClick={deleteSpace}>
                Delete
            </button>

        </div>
    );
}

export default SpaceDelete;
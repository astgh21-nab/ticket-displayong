import React from "react";
import { useNavigate } from "react-router-dom";

function Space() {

    const navigate = useNavigate();

    return (
        <div>

            <h2>Space Management</h2>

            <button onClick={() => navigate("/spaces")}>
                View Spaces
            </button>

            <button onClick={() => navigate("/add-space")}>
                Add Space
            </button>

        </div>
    );
}

export default Space;
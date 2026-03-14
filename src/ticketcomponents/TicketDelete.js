import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function ThicketDelete() {

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        apiService.deleteTicketById(id).then(() => {
            navigate("/tickets");
        });

    }, [id, navigate]);

    return (
        <div>
            <h2>Deleting Ticket...</h2>
        </div>
    );
}

export default ThicketDelete;
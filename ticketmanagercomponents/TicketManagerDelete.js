import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function TicketManagerDelete() {

    const { id } = useParams();
    const navigate = useNavigate();

    const deleteTicketManager = () => {

        apiService.deleteTicketManager(id).then(() => {
            navigate("/ticketmanagers");
        });

    };

    return (
        <div>

            <h2>Delete Ticket Manager</h2>

            <p>Are you sure you want to delete this ticket manager?</p>

            <button onClick={deleteTicketManager}>
                Delete
            </button>

        </div>
    );
}

export default TicketManagerDelete;
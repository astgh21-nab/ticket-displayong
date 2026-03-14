import React from "react";
import { useNavigate } from "react-router-dom";

function TicketManager() {

    const navigate = useNavigate();

    return (
        <div>

            <h2>Ticket Manager Management</h2>

            <button onClick={() => navigate("/ticketmanagers")}>
                View Ticket Managers
            </button>

            <button onClick={() => navigate("/add-ticketmanager")}>
                Add Ticket Manager
            </button>

        </div>
    );
}

export default TicketManager;
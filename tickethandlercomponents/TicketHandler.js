import React from "react";
import { useNavigate } from "react-router-dom";

function TicketHandler() {

    const navigate = useNavigate();

    return (
        <div>

            <h2>Ticket Handler Management</h2>

            <button onClick={() => navigate("/tickethandlers")}>
                View Ticket Handlers
            </button>

            <button onClick={() => navigate("/add-tickethandler")}>
                Add Ticket Handler
            </button>

        </div>
    );
}

export default TicketHandler;
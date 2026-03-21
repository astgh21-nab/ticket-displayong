import React from "react";
import { useNavigate } from "react-router-dom";

function TicketManager() {

    const navigate = useNavigate();

    return (
        <div>

            <h2>Ticket Manager Dashboard</h2>

            <button onClick={() => navigate("/tickets")}>
                View All Tickets
            </button>

            <button onClick={() => navigate("/assigned-tickets")}>
                My Assigned Tickets
            </button>

            <button onClick={() => navigate("/update-ticket")}>
                Update Ticket Status
            </button>

            <button onClick={() => navigate("/ticketmanagers")}>
                Manage Ticket Managers
            </button>

        </div>
    );
}

export default TicketManager;
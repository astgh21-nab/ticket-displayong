import React from "react";
import { useNavigate } from "react-router-dom";

function TicketGroup() {

    const navigate = useNavigate();

    return (
        <div>

            <h2>Ticket Group Management</h2>

            <button onClick={() => navigate("/ticketgroups")}>
                View Ticket Groups
            </button>

            <button onClick={() => navigate("/add-ticketgroup")}>
                Add Ticket Group
            </button>

        </div>
    );
}

export default TicketGroup;
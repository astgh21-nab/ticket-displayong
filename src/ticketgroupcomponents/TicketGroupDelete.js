import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function TicketGroupDelete() {

    const { id } = useParams();
    const navigate = useNavigate();

    const deleteTicketGroup = () => {

        apiService.deleteTicketGroup(id).then(() => {
            navigate("/ticketgroups");
        });

    };

    return (
        <div>

            <h2>Delete Ticket Group</h2>

            <p>Are you sure you want to delete this ticket group?</p>

            <button onClick={deleteTicketGroup}>
                Delete
            </button>

        </div>
    );
}

export default TicketGroupDelete;
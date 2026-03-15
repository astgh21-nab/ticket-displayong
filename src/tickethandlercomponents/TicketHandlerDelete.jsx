import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function TicketHandlerDelete() {

    const { id } = useParams();
    const navigate = useNavigate();

    const deleteTicketHandler = () => {

        apiService.deleteTicketHandler(id).then(() => {
            navigate("/tickethandlers");
        });

    };

    return (
        <div>

            <h2>Delete Ticket Handler</h2>

            <p>Are you sure you want to delete this ticket handler?</p>

            <button onClick={deleteTicketHandler}>
                Delete
            </button>

        </div>
    );
}

export default TicketHandlerDelete;
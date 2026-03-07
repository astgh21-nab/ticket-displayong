import React, { useEffect, useState } from "react";
import apiService from "../services/ApiService";

function TicketList() {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        apiService.getAllTickets().then(data => {
            setTickets(data);
        });
    }, []);

    return (
        <div>
            <h2>Tickets</h2>

            {tickets.map(ticket => (
                <div key={ticket.id}>
                    {ticket.title}
                </div>
            ))}

        </div>
    );
}

export default TicketList;
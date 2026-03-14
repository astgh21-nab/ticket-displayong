import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function Ticket() {

    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTickets();
    }, []);

    const getAllTickets = () => {
       apiService.getAllTickets().then((data) => {
        setTickets(data);
        });
    };

    const goToAddTicket = () => {
        navigate("/add-ticket");
    };

    return (
        <div>

            <h2>Tickets</h2>

            <button onClick={goToAddTicket}>
                Add Ticket
            </button>

            <br />
            <br />

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.title}</td>
                            <td>{ticket.description}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}

export default Ticket;
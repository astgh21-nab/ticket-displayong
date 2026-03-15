import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function Ticket() {

    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    // Function declaration (hoisted)
    function getAllTickets() {
        apiService.getAllTickets().then((data) => {
            setTickets(data);
        });
    }

    useEffect(() => {
        getAllTickets(); // Safe to call here
    }, []);

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
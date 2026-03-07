import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function TicketManagerAdd() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const addTicketManager = () => {

        const ticketManager = {
            name: name,
            email: email
        };

        apiService.createTicketManager(ticketManager).then(() => {
            navigate("/ticketmanagers");
        });

    };

    return (
        <div>

            <h2>Add Ticket Manager</h2>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br/>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br/>

            <button onClick={addTicketManager}>
                Create
            </button>

        </div>
    );
}

export default TicketManagerAdd;
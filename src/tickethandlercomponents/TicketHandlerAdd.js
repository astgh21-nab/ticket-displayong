import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function TicketHandlerAdd() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const addTicketHandler = () => {

        const ticketHandler = {
            name: name,
            email: email
        };

        apiService.createTicketHandler(ticketHandler).then(() => {
            navigate("/tickethandlers");
        });

    };

    return (
        <div>

            <h2>Add Ticket Handler</h2>

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

            <button onClick={addTicketHandler}>
                Create
            </button>

        </div>
    );
}

export default TicketHandlerAdd;
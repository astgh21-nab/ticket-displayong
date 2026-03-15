import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function TicketManagerUpdate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {

        apiService.getTicketManagerById(id).then(manager => {
            setName(manager.name);
            setEmail(manager.email);
        });

    }, [id]);

    const updateTicketManager = () => {

        const ticketManager = {
            name: name,
            email: email
        };

        apiService.updateTicketManager(id, ticketManager).then(() => {
            navigate("/ticketmanagers");
        });

    };

    return (
        <div>

            <h2>Update Ticket Manager</h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br/>

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br/>

            <button onClick={updateTicketManager}>
                Update
            </button>

        </div>
    );
}

export default TicketManagerUpdate;
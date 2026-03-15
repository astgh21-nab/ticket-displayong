import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function TicketHandlerUpdate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {

        apiService.getTicketHandlerById(id).then(handler => {
            setName(handler.name);
            setEmail(handler.email);
        });

    }, [id]);

    const updateTicketHandler = () => {

        const ticketHandler = {
            name: name,
            email: email
        };

        apiService.updateTicketHandler(id, ticketHandler).then(() => {
            navigate("/tickethandlers");
        });

    };

    return (
        <div>

            <h2>Update Ticket Handler</h2>

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

            <button onClick={updateTicketHandler}>
                Update
            </button>

        </div>
    );
}

export default TicketHandlerUpdate;
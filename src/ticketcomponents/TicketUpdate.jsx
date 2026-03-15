import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function ThicketUpdate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {

        apiService.getTicketById(id).then(ticket => {
            setTitle(ticket.title);
            setDescription(ticket.description);
        });

    }, [id]);

    const updateTicket = () => {

        const ticket = {
            title: title,
            description: description
        };

        apiService.updateTicket(id, ticket).then(() => {
            navigate("/tickets");
        });

    };

    return (
        <div>

            <h2>Update Ticket</h2>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br/>

            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br/>

            <button onClick={updateTicket}>
                Update
            </button>

        </div>
    );
}

export default ThicketUpdate;
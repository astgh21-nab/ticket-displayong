import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function TicketGroupAdd() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const addTicketGroup = () => {

        const ticketGroup = {
            name: name,
            description: description
        };

        apiService.createTicketGroup(ticketGroup).then(() => {
            navigate("/ticketgroups");
        });

    };

    return (
        <div>

            <h2>Add Ticket Group</h2>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br/>

            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br/>

            <button onClick={addTicketGroup}>
                Create
            </button>

        </div>
    );
}

export default TicketGroupAdd;
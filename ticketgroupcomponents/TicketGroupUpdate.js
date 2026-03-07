import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function TicketGroupUpdate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {

        apiService.getTicketGroupById(id).then(group => {
            setName(group.name);
            setDescription(group.description);
        });

    }, [id]);

    const updateTicketGroup = () => {

        const ticketGroup = {
            name: name,
            description: description
        };

        apiService.updateTicketGroup(id, ticketGroup).then(() => {
            navigate("/ticketgroups");
        });

    };

    return (
        <div>

            <h2>Update Ticket Group</h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br/>

            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br/>

            <button onClick={updateTicketGroup}>
                Update
            </button>

        </div>
    );
}

export default TicketGroupUpdate;
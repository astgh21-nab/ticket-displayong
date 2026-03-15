import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function ThicketAdd() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const addTicket = () => {

        const ticket = {
            title: title,
            description: description
        };

        apiService.createTicket(ticket).then(() => {
            navigate("/tickets");
        });

    };

    return (
        <div>

            <h2>Add Ticket</h2>

            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br/>

            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br/>

            <button onClick={addTicket}>
                Create
            </button>

        </div>
    );
}

export default ThicketAdd;
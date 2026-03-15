import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function SpaceAdd() {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const navigate = useNavigate();

    const addSpace = () => {

        const space = {
            name: name,
            location: location
        };

        apiService.createSpace(space).then(() => {
            navigate("/spaces");
        });

    };

    return (
        <div>

            <h2>Add Space</h2>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br/>

            <input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <br/>

            <button onClick={addSpace}>
                Create
            </button>

        </div>
    );
}

export default SpaceAdd;
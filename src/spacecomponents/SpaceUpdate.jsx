import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function SpaceUpdate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    // Load existing space data
    useEffect(() => {
        apiService.getSpaceById(id).then((space) => {
            setName(space.name);
            setLocation(space.location);
        });
    }, [id]);

    // Update space
    const updateSpace = () => {
        const updatedSpace = {
            name: name,
            location: location
        };

        apiService.updateSpace(id, updatedSpace).then(() => {
            navigate("/spaces"); // Go back to list after update
        }).catch((err) => {
            console.error("Failed to update space:", err);
        });
    };

    return (
        <div>
            <h2>Update Space</h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Space Name"
            />
            <br/>

            <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
            />
            <br/>

            <button onClick={updateSpace}>
                Update
            </button>
        </div>
    );
}

export default SpaceUpdate;
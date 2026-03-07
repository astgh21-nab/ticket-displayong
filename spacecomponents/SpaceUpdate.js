import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function SpaceUpdate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {

        apiService.getSpaceById(id).then(space => {
            setName(space.name);
            setLocation(space.location);
        });

    }, [id]);

    const updateSpace = () => {

        const space = {
            name: name,
            location: location
        };

        apiService.getSpaceById(id).then(space => {
        setName(space.name);
        setLocation(space.location);
        navigate("/spaces");
          });
    };

    return (
        <div>

            <h2>Update Space</h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br/>

            <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <br/>

            <button onClick={updateSpace}>
                Update
            </button>

        </div>
    );
}

export default SpaceUpdate;
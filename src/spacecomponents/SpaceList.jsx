import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function SpaceList() {

    const [spaces, setSpaces] = useState([]);
    const navigate = useNavigate();

    const getSpaces = () => {
        apiService.getAllSpaces().then((data) => {
            setSpaces(data);
        });
    };

    useEffect(() => {
        getSpaces();
    }, []);

    const goToAddSpace = () => {
        navigate("/add-space");
    };

    const goToUpdateSpace = (id) => {
        navigate(`/update-space/${id}`);
    };

    const goToDeleteSpace = (id) => {
        navigate(`/delete-space/${id}`);
    };

    return (
        <div>

            <h2>Space List</h2>

            <button onClick={goToAddSpace}>
                Add Space
            </button>

            <br/>
            <br/>

            <table border="1">

                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>

                {spaces.map((space) => (
                    <tr key={space.id}>
                        <td>{space.id}</td>
                        <td>{space.name}</td>
                        <td>{space.location}</td>
                        <td>
                            <button onClick={() => goToUpdateSpace(space.id)}>
                                Update
                            </button>

                            <button onClick={() => goToDeleteSpace(space.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}

                </tbody>

            </table>

        </div>
    );
}

export default SpaceList;
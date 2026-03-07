import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function UserUpdate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {

        apiService.getUserById(id).then(user => {
            setName(user.name);
            setEmail(user.email);
        });

    }, [id]);

    const updateUser = () => {

        const user = {
            name: name,
            email: email
        };

        apiService.updateUser(id, user).then(() => {
            navigate("/users");
        });

    };

    return (
        <div>

            <h2>Update User</h2>

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

            <button onClick={updateUser}>
                Update
            </button>

        </div>
    );
}

export default UserUpdate;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function AdminUpdate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {

        apiService.getAdminById(id).then(admin => {
            setName(admin.name);
            setEmail(admin.email);
        });

    }, [id]);

    const updateAdmin = () => {

        const admin = {
            name: name,
            email: email
        };

        apiService.updateAdmin(id, admin).then(() => {
            navigate("/admins");
        });

    };

    return (
        <div>

            <h2>Update Admin</h2>

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

            <button onClick={updateAdmin}>
                Update
            </button>

        </div>
    );
}

export default AdminUpdate;
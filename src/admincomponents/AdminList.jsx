import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function AdminList() {

    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    const getAdmins = () => {
        apiService.getAllAdmins().then((response) => {
            setAdmins(response.data);
        });
    };

    useEffect(() => {
        getAdmins();
    }, []);

    const goToAddAdmin = () => {
        navigate("/add-admin");
    };

    const goToUpdateAdmin = (id) => {
        navigate(`/update-admin/${id}`);
    };

    return (
        <div>

            <h2>Admin List</h2>

            <button onClick={goToAddAdmin}>
                Add Admin
            </button>

            <br/>
            <br/>

            <table border="1">

                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>

                {admins.map((admin) => (
                    <tr key={admin.id}>
                        <td>{admin.id}</td>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>
                            <button onClick={() => goToUpdateAdmin(admin.id)}>
                                Update
                            </button>
                        </td>
                    </tr>
                ))}

                </tbody>

            </table>

        </div>
    );
}

export default AdminList;
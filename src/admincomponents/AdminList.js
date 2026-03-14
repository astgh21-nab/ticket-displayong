import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function AdminList() {

    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAdmins();
    }, []);

    const getAdmins = () => {
        apiService.getAllAdmins().then((response) => {
            setAdmins(response.data);
        });
    };

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
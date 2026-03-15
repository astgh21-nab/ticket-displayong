import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function UserList() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getUsers = () => {
        apiService.getAllUsers().then((response) => {
            setUsers(response.data);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const goToAddUser = () => {
        navigate("/add-user");
    };

    const goToUpdateUser = (id) => {
        navigate(`/update-user/${id}`);
    };

    const goToDeleteUser = (id) => {
        navigate(`/delete-user/${id}`);
    };

    return (
        <div>

            <h2>User List</h2>

            <button onClick={goToAddUser}>
                Add User
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

                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>

                            <button onClick={() => goToUpdateUser(user.id)}>
                                Update
                            </button>

                            <button onClick={() => goToDeleteUser(user.id)}>
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

export default UserList;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../apiservice/apiService";

function TicketManagerList() {

    const [ticketManagers, setTicketManagers] = useState([]);
    const navigate = useNavigate();

    // Function declaration is hoisted, safe for useEffect
    function getTicketManagers() {
        apiService.getAllTicketManagers().then((response) => {
            setTicketManagers(response.data);
        });
    }

    useEffect(() => {
        getTicketManagers();
    }, []);

    const goToAddTicketManager = () => {
        navigate("/add-ticketmanager");
    };

    const goToUpdateTicketManager = (id) => {
        navigate(`/update-ticketmanager/${id}`);
    };

    const goToDeleteTicketManager = (id) => {
        navigate(`/delete-ticketmanager/${id}`);
    };

    return (
        <div>

            <h2>Ticket Manager List</h2>

            <button onClick={goToAddTicketManager}>
                Add Ticket Manager
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
                {ticketManagers.map((manager) => (
                    <tr key={manager.id}>
                        <td>{manager.id}</td>
                        <td>{manager.name}</td>
                        <td>{manager.email}</td>
                        <td>
                            <button onClick={() => goToUpdateTicketManager(manager.id)}>
                                Update
                            </button>

                            <button onClick={() => goToDeleteTicketManager(manager.id)}>
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

export default TicketManagerList;
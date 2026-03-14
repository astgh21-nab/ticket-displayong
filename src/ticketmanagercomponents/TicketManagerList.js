import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function TicketManagerList() {

    const [ticketManagers, setTicketManagers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTicketManagers();
    }, []);

    const getTicketManagers = () => {
        apiService.getAllTicketManagers().then((response) => {
            setTicketManagers(response.data);
        });
    };

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
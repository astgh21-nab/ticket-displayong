import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function TicketGroupList() {

    const [ticketGroups, setTicketGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTicketGroups();
    }, []);

    const getTicketGroups = () => {
       apiService.getAllTicketManagers().then((data) => {
        setTicketManagers(data);
    });
    };

    const goToAddTicketGroup = () => {
        navigate("/add-ticketgroup");
    };

    const goToUpdateTicketGroup = (id) => {
        navigate(`/update-ticketgroup/${id}`);
    };

    const goToDeleteTicketGroup = (id) => {
        navigate(`/delete-ticketgroup/${id}`);
    };

    return (
        <div>

            <h2>Ticket Group List</h2>

            <button onClick={goToAddTicketGroup}>
                Add Ticket Group
            </button>

            <br/>
            <br/>

            <table border="1">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {ticketGroups.map((group) => (
                        <tr key={group.id}>
                            <td>{group.id}</td>
                            <td>{group.name}</td>
                            <td>{group.description}</td>
                            <td>

                                <button onClick={() => goToUpdateTicketGroup(group.id)}>
                                    Update
                                </button>

                                <button onClick={() => goToDeleteTicketGroup(group.id)}>
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

export default TicketGroupList;